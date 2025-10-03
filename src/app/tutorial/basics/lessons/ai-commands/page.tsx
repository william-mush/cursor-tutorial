import { TutorialNavigation } from "@/components/TutorialNavigation";
import { CodeExample } from "@/components/CodeExample";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageSquare, Zap, Code, Lightbulb } from "lucide-react";

export default function AICommandsLesson() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/tutorial/basics" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Basics
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Basic AI Commands
          </h1>
          <p className="text-xl text-gray-600">
            Learn essential AI commands for code generation, editing, and getting help with Cursor.
          </p>
        </div>

        <TutorialNavigation />

        <div className="space-y-8 mt-8">
          {/* Chat Interface */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="w-8 h-8 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Chat Interface</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              The chat interface is your primary way to interact with Cursor's AI. Press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Cmd+L</kbd> (Mac) or <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Ctrl+L</kbd> (Windows/Linux) to open it.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Chat Commands</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Code Generation</h4>
                    <CodeExample
                      language="text"
                      code={`Create a React component that displays a user profile card with name, email, and avatar`}
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Code Explanation</h4>
                    <CodeExample
                      language="text"
                      code={`Explain how this function works: [paste your code here]`}
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Bug Fixing</h4>
                    <CodeExample
                      language="text"
                      code={`I'm getting an error "Cannot read property 'map' of undefined". Can you help me fix this?`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Edit Mode */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Zap className="w-8 h-8 text-green-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">AI Edit Mode</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              AI Edit Mode allows you to make changes to your code using natural language. Press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Cmd+K</kbd> (Mac) or <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Ctrl+K</kbd> (Windows/Linux) to activate it.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Use AI Edit Mode</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Select the code you want to modify</li>
                  <li>Press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Cmd+K</kbd> to enter AI Edit Mode</li>
                  <li>Type your instruction in natural language</li>
                  <li>Press Enter to apply the changes</li>
                  <li>Review the changes and accept or reject them</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example Edit Commands</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Refactoring</h4>
                    <CodeExample
                      language="text"
                      code={`Convert this function to use async/await instead of promises`}
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Adding Features</h4>
                    <CodeExample
                      language="text"
                      code={`Add error handling to this function`}
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Code Optimization</h4>
                    <CodeExample
                      language="text"
                      code={`Optimize this code for better performance`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Completions */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Code className="w-8 h-8 text-purple-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Code Completions</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Cursor provides intelligent code completions as you type. These suggestions are context-aware and understand your entire codebase.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How Completions Work</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Start typing and suggestions will appear automatically</li>
                  <li>Press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Tab</kbd> to accept a suggestion</li>
                  <li>Press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Esc</kbd> to dismiss suggestions</li>
                  <li>Use <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">↑</kbd> and <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">↓</kbd> to navigate between suggestions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example: React Component</h3>
                <CodeExample
                  language="javascript"
                  code={`// Start typing this and see what Cursor suggests:
function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {/* Cursor will suggest common JSX patterns */}
    </div>
  );
}`}
                />
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Lightbulb className="w-8 h-8 text-yellow-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Best Practices</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Writing Effective Prompts</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">✅ Good Prompts</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Be specific about what you want</li>
                      <li>Include context about your project</li>
                      <li>Specify the programming language</li>
                      <li>Mention any constraints or requirements</li>
                      <li>Ask for explanations when needed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">❌ Avoid These</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Vague requests like "fix this"</li>
                      <li>Asking for entire applications at once</li>
                      <li>Not providing enough context</li>
                      <li>Asking for copyrighted content</li>
                      <li>Being too broad in scope</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example: Good vs Bad Prompts</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <h4 className="font-semibold text-red-800 mb-2">❌ Bad Prompt</h4>
                    <p className="text-red-700">"Make this better"</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Good Prompt</h4>
                    <p className="text-green-700">"Refactor this React component to use TypeScript, add proper error handling, and make it responsive for mobile devices"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Practice Exercise */}
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Practice Exercise</h2>
            <p className="text-gray-600 mb-6">
              Try these exercises to practice using Cursor's AI features:
            </p>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Exercise 1: Code Generation</h3>
                <p className="text-gray-600 mb-2">Open the chat panel and ask Cursor to create a simple calculator component in React.</p>
                <CodeExample
                  language="text"
                  code={`Create a React calculator component with basic operations (add, subtract, multiply, divide)`}
                />
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Exercise 2: Code Editing</h3>
                <p className="text-gray-600 mb-2">Create a simple function and use AI Edit Mode to improve it.</p>
                <CodeExample
                  language="javascript"
                  code={`// Create this function, then select it and use Cmd+K to edit
function greet(name) {
  return "Hello " + name;
}

// Try: "Add TypeScript types and make it more friendly"`}
                />
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-green-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Excellent Work! 🚀</h2>
            <p className="text-gray-600 mb-6">
              You've learned the basics of AI commands! Next, let's explore file management and project organization.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tutorial/basics/lessons/file-management"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next Lesson: File Management
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/tutorial/basics"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Basics Overview
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
