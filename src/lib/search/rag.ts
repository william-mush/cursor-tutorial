import Anthropic from '@anthropic-ai/sdk';
import { searchSimilarContent, SearchResult } from './vector-db';
import { getSupabaseAdminClient } from './supabase-client';

// Simple in-memory cache for common queries
const queryCache = new Map<string, { response: RAGResponse; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

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
  const { maxSources = 8, temperature = 0.3, conversationHistory = [] } = options;

  // Check cache first for common queries
  const cacheKey = question.toLowerCase().trim();
  const cached = queryCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
    console.log('🚀 Cache hit - returning cached response');
    return { ...cached.response, responseTimeMs: Date.now() - startTime };
  }

  try {
    // 1. Search for relevant content
    console.log(`🔍 Searching for: "${question}"`);
    const searchResults = await searchSimilarContent(question, {
      matchCount: Math.min(maxSources, 5), // Limit to 5 for faster processing
      matchThreshold: 0.4, // Lower threshold for faster results
    });
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

    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022', // Fast and efficient model
      max_tokens: 1500, // Reduced for faster generation
      temperature,
      system: systemPrompt,
      messages,
    });

    const answer = response.content[0].type === 'text' 
      ? response.content[0].text 
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
      
      return {
        title: result.metadata.title,
        url: result.metadata.url,
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

    // 7. Cache the response for common queries
    if (searchResults.length > 0) {
      queryCache.set(cacheKey, { response, timestamp: Date.now() });
      // Keep cache size reasonable
      if (queryCache.size > 100) {
        const oldestKey = queryCache.keys().next().value;
        queryCache.delete(oldestKey);
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

