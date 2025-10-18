import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 10;

// Pre-defined fast responses for common queries
const fastResponses = new Map([
  ['what is cursor', {
    answer: `# What is Cursor? 🚀

## Overview
Cursor is an AI-powered code editor built on VS Code that revolutionizes development with Claude 4.5 Sonnet integration.

## Key Features
- **Tab completion** - 30-50% faster coding
- **Cmd+K** - Inline code editing with natural language
- **Cmd+L** - AI Chat for debugging and questions
- **Composer (Cmd+I)** - Multi-file editing and feature building
- **@ Symbols** - Context-aware AI assistance

## Why Cursor?
- Works offline with full project context
- Understands your entire codebase
- More powerful than GitHub Copilot
- Built on proven VS Code foundation

💡 **Pro Tip**: Think of Cursor as having a senior developer pair programming with you 24/7!`,
    sources: [
      {
        title: "What is Cursor?",
        url: "https://cursortutorial.ai/tutorial/basics/lessons/getting-started",
        snippet: "Cursor is an AI-powered code editor built on VS Code that revolutionizes how developers write code...",
        relevance: 0.95
      }
    ],
    relatedQuestions: [
      "How do I get started with Cursor?",
      "How does Cursor compare to VS Code?",
      "What are the main Cursor keyboard shortcuts?"
    ]
  }],
  ['how do i use tab completion', {
    answer: `# Tab Completion in Cursor ⚡

## What is Tab Completion?
AI-powered code suggestions that predict 1-15 lines as you type.

## How to Use
1. **Start typing** a function name or code pattern
2. **Press Tab** to accept the entire suggestion
3. **Use Cmd+→** to accept word-by-word
4. **Use Alt+[ or Alt+]** to cycle through alternatives

## Pro Tips 💡
- Works across all programming languages
- Learns from your coding context
- Perfect for repetitive code patterns
- Like having an expert developer anticipating your next line!`,
    sources: [
      {
        title: "Tab Completion - AI Pair Programmer",
        url: "https://cursortutorial.ai/tutorial/features/lessons/tab-completion",
        snippet: "Tab completion in Cursor is a game-changing feature that predicts 1-15 lines of code as you type...",
        relevance: 0.95
      }
    ],
    relatedQuestions: [
      "What are the main Cursor keyboard shortcuts?",
      "How do I use Cmd+K for inline editing?",
      "What is Cursor's AI Chat feature?"
    ]
  }],
  ['cursor windows', {
    answer: `# Cursor Interface: Windows and Panels 🖥️

## Main Windows
1. **📝 Editor Window** - Main coding area with AI features
2. **💬 AI Chat (Cmd+L)** - Conversational interface for questions
3. **🖥️ Terminal Window** - Command line with AI integration
4. **🧩 Composer (Cmd+I)** - Multi-file editing interface
5. **📁 Sidebar** - File navigation and project structure

## Quick Access
- **Cmd+L** - Open AI Chat
- **Cmd+I** - Open Composer
- **Cmd+Shift+L** - Chat with selected code
- **Cmd+K** - Inline edit selected code

💡 **Pro Tip**: All windows work together seamlessly with AI assistance!`,
    sources: [
      {
        title: "Cursor Interface Overview - Windows and Panels",
        url: "https://cursortutorial.ai/tutorial/basics/lessons/interface",
        snippet: "Cursor's interface consists of several key windows and panels that work together...",
        relevance: 0.95
      }
    ],
    relatedQuestions: [
      "How do I use the AI Chat window?",
      "What is the Composer window?",
      "How do I customize Cursor's layout?"
    ]
  }]
]);

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();
    
    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const startTime = Date.now();
    const normalizedQuestion = question.toLowerCase().trim();
    
    // Check for fast responses
    for (const [key, response] of fastResponses) {
      if (normalizedQuestion.includes(key)) {
        return NextResponse.json({
          success: true,
          data: {
            ...response,
            responseTimeMs: Date.now() - startTime
          }
        });
      }
    }

    // If no fast response found, return null to fall back to main search
    return NextResponse.json({
      success: false,
      message: 'No fast response available, use main search'
    });

  } catch (error: any) {
    console.error('Fast search error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
