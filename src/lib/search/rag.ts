import Anthropic from '@anthropic-ai/sdk';
import { searchSimilarContent, SearchResult } from './vector-db';
import { getSupabaseAdminClient } from './supabase-client';
import { getSearchConfig } from './config';
import { cache } from '../redis';

const anthropic = new Anthropic({
  apiKey: process.env.Claude_My_Secret_Key,
});

export interface RAGResponse {
  answer: string;
  sources: Array<{
    title: string;
    url: string;
    snippet: string;
    relevance: number;
  }>;
  relatedQuestions: string[];
  responseTimeMs: number;
}

/**
 * Main RAG function: Retrieves relevant content and generates AI answer
 */
export async function answerQuestion(
  question: string,
  options: {
    maxSources?: number;
    temperature?: number;
    conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
  } = {}
): Promise<RAGResponse> {
  const startTime = Date.now();
  const config = getSearchConfig();
  const { maxSources = config.maxSources, temperature = 0.3, conversationHistory = [] } = options;

  // Check Redis cache first (if available)
  try {
    const cacheKey = cache.generateKey(question);
    const cached = await cache.get(cacheKey);
    if (cached) {
      console.log('🚀 Redis cache hit - returning cached response');
      return { ...cached, responseTimeMs: Date.now() - startTime };
    }
  } catch (error) {
    console.log('⚠️ Redis cache check failed, continuing with search:', error);
  }

  try {
    // 1. Search for relevant content (parallel with other operations)
    console.log(`🔍 Searching for: "${question}"`);
    const searchPromise = searchSimilarContent(question, {
      matchCount: Math.min(maxSources, config.maxSources),
      matchThreshold: config.matchThreshold,
    });
    
    const searchResults = await searchPromise;
    console.log(`📊 Found ${searchResults.length} search results`);

    if (searchResults.length === 0) {
      console.log('❌ No search results found');
      return {
        answer: "I couldn't find specific information about that in the Cursor documentation. Could you rephrase your question or ask about a different Cursor feature?",
        sources: [],
        relatedQuestions: [
          "What's new in Cursor 1.7?",
          "How do I use Tab completion?",
          "What are the main Cursor keyboard shortcuts?"
        ],
        responseTimeMs: Date.now() - startTime,
      };
    }

    console.log('✅ Found search results, proceeding with RAG...');

    // 2. Build context from search results
    const context = searchResults
      .map((result, i) => `
[Source ${i + 1}: ${result.metadata.title}]
${result.content}
---
`)
      .join('\n');

    // 3. Generate answer with Claude 3.5 Haiku
    const systemPrompt = `You are a Cursor AI expert. Answer questions about Cursor using this context:

${context}

Format as clean markdown:
- # Title with relevant emoji
- ## Main sections with bullet points
- **Bold** key terms, `code` for shortcuts
- Include keyboard shortcuts (Cmd+K, Cmd+L, Cmd+I, Tab)
- Add 💡 Pro Tips for valuable insights
- Be concise but comprehensive
- Use active voice and clear language

Focus on practical, actionable advice.`;

    const messages: Anthropic.MessageParam[] = [
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user',
        content: question,
      },
    ];

    // Add timeout to prevent very slow responses
    const claudeResponse = await Promise.race([
      anthropic.messages.create({
        model: 'claude-3-5-haiku-20241022', // Fast & cheap model
        max_tokens: 1000, // Optimized for speed
        temperature: 0.1, // Lower temperature for faster, more deterministic responses
        system: systemPrompt,
        messages,
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Response timeout')), 8000) // Reduced timeout since Haiku is much faster
      )
    ]) as any;

    const answer = claudeResponse.content[0].type === 'text' 
      ? claudeResponse.content[0].text 
      : '';

    // 4. Format sources with better snippets
    const sources = searchResults.slice(0, 5).map(result => {
      // Create a more intelligent snippet that captures the essence
      const content = result.content;
      const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
      const bestSentence = sentences[0] || content.slice(0, 120);
      const snippet = bestSentence.length > 120 
        ? bestSentence.slice(0, 120) + '...'
        : bestSentence;
      
      // Fix URLs that don't exist - make them point to the main tutorial page
      let url = result.metadata.url;
      if (url && url.includes('/tutorial/') && !url.includes('/search')) {
        // If it's a tutorial URL that doesn't exist, point to the main tutorial
        url = '/tutorial';
      } else if (!url) {
        // If no URL, point to the main tutorial
        url = '/tutorial';
      }
      
      return {
        title: result.metadata.title,
        url: url,
        snippet: snippet.trim(),
        relevance: Math.round(result.similarity * 100) / 100,
      };
    });

    // 5. Generate related questions (simple heuristic for now)
    const relatedQuestions = generateRelatedQuestions(question, searchResults);

    // 6. Log analytics
    const responseTimeMs = Date.now() - startTime;
    await logSearchQuery(question, searchResults.length, responseTimeMs);

    const response: RAGResponse = {
      answer,
      sources,
      relatedQuestions,
      responseTimeMs,
    };

    // Cache the response in Redis (if available)
    if (searchResults.length > 0) {
      try {
        const cacheKey = cache.generateKey(question);
        await cache.set(cacheKey, response, config.cacheTimeoutSeconds);
      } catch (error) {
        console.log('⚠️ Redis cache set failed:', error);
      }
    }

    return response;
  } catch (error) {
    console.error('Error in RAG pipeline:', error);
    throw new Error('Failed to generate answer');
  }
}

/**
 * Generate related questions based on the current query and results
 */
function generateRelatedQuestions(
  question: string,
  results: SearchResult[]
): string[] {
  const questions: string[] = [];
  const questionLower = question.toLowerCase();
  
  // Extract topics and categories from results
  const topics = results.map(r => r.metadata.title);
  const categories = results.map(r => r.metadata.category).filter(Boolean);
  
  // Smart question generation based on content
  if (questionLower.includes('tab') || questionLower.includes('completion')) {
    questions.push("What are the main Cursor keyboard shortcuts?");
    questions.push("How do I use Cmd+K for inline editing?");
  }
  
  if (questionLower.includes('cmd+k') || questionLower.includes('inline')) {
    questions.push("How do I use Tab completion in Cursor?");
    questions.push("What is Cursor's AI Chat feature?");
  }
  
  if (questionLower.includes('chat') || questionLower.includes('cmd+l')) {
    questions.push("How do I use Composer for multi-file editing?");
    questions.push("What are @ symbols in Cursor?");
  }
  
  if (questionLower.includes('composer') || questionLower.includes('multi-file')) {
    questions.push("How do I use @ symbols for context?");
    questions.push("What are Cursor Rules?");
  }
  
  if (questionLower.includes('cursor') && (questionLower.includes('what') || questionLower.includes('is'))) {
    questions.push("How do I get started with Cursor?");
    questions.push("How does Cursor compare to VS Code?");
  }
  
  // Add context-aware follow-ups based on categories
  if (categories.includes('features')) {
    questions.push("What are the main Cursor keyboard shortcuts?");
  }
  
  if (categories.includes('comparisons')) {
    questions.push("How do I get started with Cursor?");
  }
  
  if (categories.includes('basics')) {
    questions.push("What are Cursor's advanced features?");
  }
  
  // Add some evergreen questions
  questions.push("What's new in Cursor 1.7.52?");
  questions.push("How do I customize Cursor for my workflow?");
  
  // Return unique, relevant questions, max 4
  return [...new Set(questions)].slice(0, 4);
}

/**
 * Log search query for analytics
 */
async function logSearchQuery(
  query: string,
  resultsCount: number,
  responseTimeMs: number
): Promise<void> {
  try {
    const supabaseAdmin = getSupabaseAdminClient();
    await supabaseAdmin.from('search_queries').insert({
      query,
      results_count: resultsCount,
      response_time_ms: responseTimeMs,
    });
  } catch (error) {
    // Don't throw - analytics logging shouldn't break the main flow
    console.error('Error logging search query:', error);
  }
}

/**
 * Log user feedback on an answer
 */
export async function logFeedback(
  queryId: string,
  wasHelpful: boolean,
  rating?: number
): Promise<void> {
  try {
    const supabaseAdmin = getSupabaseAdminClient();
    await supabaseAdmin
      .from('search_queries')
      .update({
        was_helpful: wasHelpful,
        user_rating: rating,
      })
      .eq('id', queryId);
  } catch (error) {
    console.error('Error logging feedback:', error);
  }
}

