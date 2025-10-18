import Anthropic from '@anthropic-ai/sdk';
import { searchSimilarContent, SearchResult } from './vector-db';
import { getSupabaseAdminClient } from './supabase-client';

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

  try {
    // 1. Search for relevant content
    console.log(`🔍 Searching for: "${question}"`);
    const searchResults = await searchSimilarContent(question, {
      matchCount: maxSources,
      matchThreshold: 0.5,
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
    const systemPrompt = `You are an expert Cursor AI assistant. Your role is to help users learn and master Cursor, the AI-powered code editor.

Use the following context from official Cursor documentation and tutorials to answer questions accurately and helpfully.

Context:
${context}

## Response Guidelines:

### Structure & Formatting:
- Start with a clear, engaging title using # heading
- Use ## for main sections, ### for subsections
- Include relevant emojis/icons for visual appeal (🚀, ⚡, 💡, 🎯, etc.)
- Use bullet points for lists and features
- Include code blocks with syntax highlighting when relevant
- Add "Pro Tips" or "Quick Tips" sections with 💡 icon

### Content Quality:
- Be concise but comprehensive (aim for 3-5 well-structured sections)
- Lead with the most important information
- Use active voice and clear, direct language
- Include specific keyboard shortcuts (Cmd+K, Cmd+L, Cmd+I, Tab, etc.)
- Reference Cursor version numbers when relevant (e.g., "New in Cursor 1.7.52")
- Provide actionable steps and practical examples

### Visual Appeal:
- Use **bold** for key terms and important concepts
- Use `code formatting` for commands, shortcuts, and technical terms
- Include relevant emojis to break up text and add personality
- Create clear visual hierarchy with proper heading levels
- Use blockquotes (>) for important tips or warnings

### Tone & Style:
- Be enthusiastic but professional about Cursor's capabilities
- Write in a helpful, mentoring tone
- Be honest about limitations when they exist
- Focus on practical, actionable advice
- Make complex concepts accessible

### Source Integration:
- Naturally weave in information from the provided context
- Don't just list sources - integrate them meaningfully
- Use phrases like "According to the documentation..." or "The official guide shows..."
- Reference specific features or capabilities from the sources

Format your response as clean, elegant markdown that's easy to scan and visually appealing.`;

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
      model: 'claude-3-5-haiku-20241022', // Cheapest model that's still excellent
      max_tokens: 2000,
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

    return {
      answer,
      sources,
      relatedQuestions,
      responseTimeMs,
    };
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

