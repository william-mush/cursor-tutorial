import { TutorialNavigation } from "@/components/TutorialNavigation";
import { CodeExample } from "@/components/CodeExample";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Code2, Zap, Lightbulb, CheckCircle } from "lucide-react";

export default function CodeGenerationLesson() {
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
            Code Generation
          </h1>
          <p className="text-xl text-gray-600">
            Master AI-powered code generation using prompts and examples to build applications faster than ever.
          </p>
        </div>

        <TutorialNavigation />

        <div className="space-y-8 mt-8">
          {/* Introduction to Code Generation */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Code2 className="w-8 h-8 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Introduction to Code Generation</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Code generation is one of Cursor's most powerful features. You can generate entire functions, components, and even complete applications using natural language descriptions.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Types of Code Generation</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-yellow-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Function Generation</h4>
                        <p className="text-sm text-gray-600">Create individual functions with specific logic</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Component Generation</h4>
                        <p className="text-sm text-gray-600">Build UI components and React elements</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Code2 className="w-5 h-5 text-purple-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">API Generation</h4>
                        <p className="text-sm text-gray-600">Create REST APIs and database schemas</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Test Generation</h4>
                        <p className="text-sm text-gray-600">Generate unit tests and test cases</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Code Generation */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Code Generation</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Step-by-Step Process</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>Open the chat panel with <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Cmd+L</kbd></li>
                  <li>Describe what you want to create in natural language</li>
                  <li>Be specific about the programming language and framework</li>
                  <li>Include any requirements or constraints</li>
                  <li>Review the generated code and ask for modifications if needed</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example: React Component</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Your Prompt:</h4>
                    <CodeExample
                      language="text"
                      code={`Create a React component called UserProfile that displays a user's name, email, and profile picture. It should be responsive and have a clean design.`}
                    />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Generated Code:</h4>
                    <CodeExample
                      language="jsx"
                      code={`import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex items-center mb-4">
          <img 
            className="w-16 h-16 rounded-full mr-4" 
            src={user.profilePicture || '/default-avatar.png'} 
            alt={user.name}
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Generation Techniques */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Generation Techniques</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Context-Aware Generation</h3>
                <p className="text-gray-600 mb-4">Cursor understands your existing codebase and can generate code that fits your project's patterns and conventions.</p>
                <CodeExample
                  language="text"
                  code={`Generate a new API endpoint that follows the same pattern as the existing user endpoints in this Express.js application`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Iterative Refinement</h3>
                <p className="text-gray-600 mb-4">You can ask for modifications and improvements to generated code:</p>
                <div className="space-y-3">
                  <CodeExample
                    language="text"
                    code={`Now add TypeScript types to this component`}
                  />
                  <CodeExample
                    language="text"
                    code={`Make it more accessible by adding ARIA labels`}
                  />
                  <CodeExample
                    language="text"
                    code={`Add error handling for when the user data is missing`}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Multi-File Generation</h3>
                <p className="text-gray-600 mb-4">Generate multiple related files at once:</p>
                <CodeExample
                  language="text"
                  code={`Create a complete authentication system with:
- Login component
- Register component  
- Auth context
- Protected route wrapper
- API endpoints for login/register`}
                />
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices for Code Generation</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Writing Effective Prompts</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-3">✅ Do This</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                      <li>Be specific about requirements</li>
                      <li>Mention the programming language</li>
                      <li>Include design preferences</li>
                      <li>Specify error handling needs</li>
                      <li>Ask for explanations</li>
                      <li>Request tests if needed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-3">❌ Avoid This</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                      <li>Vague descriptions</li>
                      <li>Asking for too much at once</li>
                      <li>Not specifying the framework</li>
                      <li>Ignoring existing code patterns</li>
                      <li>Not reviewing generated code</li>
                      <li>Copying without understanding</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example: Good vs Bad Prompts</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <h4 className="font-semibold text-red-800 mb-2">❌ Bad Prompt</h4>
                    <p className="text-red-700">"Make a form"</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Good Prompt</h4>
                    <p className="text-green-700">"Create a React contact form with fields for name, email, and message. Include validation, error handling, and a submit button. Use Tailwind CSS for styling and make it responsive."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Practice Exercises */}
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Practice Exercises</h2>
            <p className="text-gray-600 mb-6">
              Try these exercises to practice code generation:
            </p>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Exercise 1: Simple Calculator</h3>
                <p className="text-gray-600 mb-2">Generate a calculator component with basic operations.</p>
                <CodeExample
                  language="text"
                  code={`Create a React calculator component with buttons for numbers 0-9 and operations +, -, *, /. Include a display screen and make it functional.`}
                />
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Exercise 2: Todo List</h3>
                <p className="text-gray-600 mb-2">Generate a complete todo list application.</p>
                <CodeExample
                  language="text"
                  code={`Create a todo list app with the ability to add, edit, delete, and mark todos as complete. Include local storage persistence and filtering options.`}
                />
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Exercise 3: API Integration</h3>
                <p className="text-gray-600 mb-2">Generate code that fetches data from an API.</p>
                <CodeExample
                  language="text"
                  code={`Create a component that fetches user data from JSONPlaceholder API and displays it in a card layout with loading states and error handling.`}
                />
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-green-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Congratulations! 🎉</h2>
            <p className="text-gray-600 mb-6">
              You've mastered code generation with Cursor! You now have the skills to build applications faster than ever using AI assistance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tutorial/advanced"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next: Advanced Features
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
