"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, ThumbsUp, ThumbsDown, ExternalLink, Copy, Check, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Source {
  title: string;
  url: string;
  snippet: string;
  relevance: number;
}

interface SearchResponse {
  answer: string;
  sources: Source[];
  relatedQuestions: string[];
  responseTimeMs: number;
}

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);

  useEffect(() => {
    if (query) {
      searchQuery(query);
    }
  }, [query]);

  const searchQuery = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/search/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: searchQuery }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Search failed');
      }

      const data = await response.json();
      setResult(data.data);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyAnswer = () => {
    if (result) {
      navigator.clipboard.writeText(result.answer);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    }
  };

  const handleFeedback = async (wasHelpful: boolean) => {
    setFeedback(wasHelpful ? 'helpful' : 'not-helpful');
    
    try {
      await fetch('/api/search/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          wasHelpful,
        }),
      });
    } catch (err) {
      console.error('Feedback error:', err);
    }
  };

  const handleRelatedQuestionClick = (question: string) => {
    window.location.href = `/search?q=${encodeURIComponent(question)}`;
  };

  if (!query) {
    return (
      <div className="text-center py-12">
        <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Enter a question to get started</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-lg text-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Searching Cursor documentation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <div className="text-red-600 text-lg font-semibold mb-2">Search Error</div>
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => searchQuery(query)}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <div className="text-sm text-gray-600 font-medium mb-1">Your Question:</div>
            <div className="text-lg font-semibold text-gray-900">{query}</div>
          </div>
        </div>
      </div>

      {/* Answer */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Cursor AI Assistant</div>
              <div className="text-xs text-gray-500">
                Powered by Claude Haiku • {(result.responseTimeMs / 1000).toFixed(1)}s
              </div>
            </div>
          </div>
          
          <button
            onClick={handleCopyAnswer}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {copiedToClipboard ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-sm">Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="prose prose-blue max-w-none">
          <ReactMarkdown>{result.answer}</ReactMarkdown>
        </div>

        {/* Feedback */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Was this answer helpful?</p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleFeedback(true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  feedback === 'helpful'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">Yes</span>
              </button>
              <button
                onClick={() => handleFeedback(false)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  feedback === 'not-helpful'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span className="text-sm">No</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sources */}
      {result.sources.length > 0 && (
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Sources</h3>
          <div className="space-y-4">
            {result.sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target={source.url.startsWith('http') ? '_blank' : '_self'}
                rel={source.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 group-hover:text-blue-600 flex items-center">
                      {source.title}
                      <ExternalLink className="w-4 h-4 ml-2 text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{source.snippet}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {source.url === '/tutorial' ? 'Learn more in our tutorials' : source.url}
                    </p>
                  </div>
                  <div className="ml-4 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                    {Math.round(source.relevance * 100)}% match
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Related Questions */}
      {result.relatedQuestions.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 border-2 border-purple-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Related Questions</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {result.relatedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleRelatedQuestionClick(question)}
                className="text-left p-4 bg-white hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 hover:border-blue-300 group"
              >
                <div className="text-gray-700 group-hover:text-blue-600 flex items-center">
                  <span className="flex-1">{question}</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 ml-2" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

