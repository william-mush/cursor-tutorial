import Anthropic from '@anthropic-ai/sdk';
import { searchSimilarContent, SearchResult } from './vector-db';
import { supabaseAdmin } from './supabase-client';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
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
    const searchResults = await searchSimilarContent(question, {
      matchCount: maxSources,
      matchThreshold: 0.7,
    });

    if (searchResults.length === 0) {
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

Guidelines:
- Provide clear, actionable answers with specific steps
- Include keyboard shortcuts when relevant (e.g., Cmd+K, Cmd+L, Cmd+I)
- Reference version numbers when discussing features (e.g., "New in Cursor 1.7")
- Use code examples when helpful
- Keep answers concise but complete (2-4 paragraphs ideal)
- If the context doesn't contain the answer, say so honestly
- Always cite sources by mentioning which documentation/tutorial you're referencing
- Be enthusiastic about Cursor's capabilities but honest about limitations

Answer in markdown format with clear headings and formatting.`;

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

    // 4. Format sources
    const sources = searchResults.slice(0, 5).map(result => ({
      title: result.metadata.title,
      url: result.metadata.url,
      snippet: result.content.slice(0, 150) + '...',
      relevance: Math.round(result.similarity * 100) / 100,
    }));

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
  
  // Extract topics from results
  const topics = results.map(r => r.metadata.title);
  
  // Simple heuristics for related questions
  if (question.toLowerCase().includes('how')) {
    questions.push(`What are the benefits of ${topics[0]?.toLowerCase() || 'this feature'}?`);
  }
  
  if (question.toLowerCase().includes('what')) {
    questions.push(`How do I use ${topics[0]?.toLowerCase() || 'this feature'}?`);
  }

  // Add some common follow-ups
  questions.push(
    "What are the main Cursor keyboard shortcuts?",
    "How does Cursor compare to VS Code?",
    "What's new in the latest Cursor version?"
  );

  // Return unique questions, max 4
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

