import { TutorialNavigation } from "@/components/TutorialNavigation";
import { CodeExample } from "@/components/CodeExample";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Download, Settings, Zap, Brain, Code2, FileText, Sparkles } from "lucide-react";

export default function GettingStartedLesson() {
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
            Getting Started with Cursor
          </h1>
          <p className="text-xl text-gray-600">
            Master the latest Cursor features including Composer, advanced AI chat, codebase context, and Claude 3.5 Sonnet integration for professional development.
          </p>
        </div>

        <TutorialNavigation />

        <div className="space-y-8 mt-8">
          {/* What's New in Cursor 2024 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
            <div className="flex items-center mb-6">
              <Sparkles className="w-8 h-8 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">What's New in Cursor 2024</h2>
            </div>
            
            <p className="text-gray-700 mb-6">
              Cursor has revolutionized AI-assisted development with groundbreaking features that understand your entire codebase context.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Composer</h3>
                </div>
                <p className="text-gray-600 mb-3">
                  Multi-file editing with AI that understands your entire project structure and maintains context across files.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Edit multiple files simultaneously</li>
                  <li>• Understands imports and dependencies</li>
                  <li>• Maintains code consistency across files</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Claude 3.5 Sonnet</h3>
                </div>
                <p className="text-gray-600 mb-3">
                  Advanced AI model with enhanced reasoning capabilities and deep understanding of code patterns.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Superior code generation quality</li>
                  <li>• Better understanding of complex logic</li>
                  <li>• Enhanced debugging capabilities</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Codebase Context</h3>
                </div>
                <p className="text-gray-600 mb-3">
                  AI that understands your entire project structure, dependencies, and can reference specific files and functions.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• @-mentions for files and functions</li>
                  <li>• Automatic dependency detection</li>
                  <li>• Smart code suggestions based on project</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-orange-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
                </div>
                <p className="text-gray-600 mb-3">
                  Optimized for speed with faster AI responses, better memory management, and improved indexing.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• 3x faster AI responses</li>
                  <li>• Better memory management</li>
                  <li>• Improved code indexing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 1: Download */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-4">
                1
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Download Cursor</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Cursor is available for Windows, macOS, and Linux. Download the latest version with all the newest features.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Download className="w-5 h-5 mr-2 text-blue-600" />
                  For macOS:
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Visit <a href="https://cursor.sh" className="text-blue-600 hover:underline font-medium">cursor.sh</a></li>
                  <li>Click "Download for Mac"</li>
                  <li>Open the downloaded .dmg file</li>
                  <li>Drag Cursor to your Applications folder</li>
                  <li>Launch Cursor from Applications or Spotlight</li>
                </ol>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Download className="w-5 h-5 mr-2 text-blue-600" />
                  For Windows:
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Visit <a href="https://cursor.sh" className="text-blue-600 hover:underline font-medium">cursor.sh</a></li>
                  <li>Click "Download for Windows"</li>
                  <li>Run the downloaded .exe installer</li>
                  <li>Follow the installation wizard</li>
                  <li>Launch Cursor from Start menu or desktop shortcut</li>
                </ol>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Download className="w-5 h-5 mr-2 text-blue-600" />
                  For Linux:
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Visit <a href="https://cursor.sh" className="text-blue-600 hover:underline font-medium">cursor.sh</a></li>
                  <li>Click "Download for Linux"</li>
                  <li>Extract the downloaded .AppImage file</li>
                  <li>Make it executable: <code className="bg-gray-200 px-2 py-1 rounded text-sm">chmod +x cursor-*.AppImage</code></li>
                  <li>Run: <code className="bg-gray-200 px-2 py-1 rounded text-sm">./cursor-*.AppImage</code></li>
                </ol>
              </div>
            </div>
          </div>

          {/* Step 2: First Launch */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-4">
                2
              </div>
              <h2 className="text-2xl font-bold text-gray-900">First Launch & Setup</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              When you first open Cursor, you'll see a modern interface with powerful AI features ready to use.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Sign in or create an account</h3>
                  <p className="text-gray-600">You'll need a Cursor account to use AI features. Sign in with GitHub or create a new account for the best experience.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Choose your theme and preferences</h3>
                  <p className="text-gray-600">Select between light and dark themes, and configure your preferred settings. You can change these later.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Open a folder or create a new project</h3>
                  <p className="text-gray-600">Open an existing project folder or create a new one to start exploring Cursor's AI capabilities.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Interface Elements:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>AI Chat:</strong> Press Cmd+L (Mac) or Ctrl+L (Windows/Linux) to open the AI chat</li>
                <li>• <strong>Composer:</strong> Click the Composer button for multi-file editing</li>
                <li>• <strong>Settings:</strong> Access via Cmd+, (Mac) or Ctrl+, (Windows/Linux)</li>
                <li>• <strong>Command Palette:</strong> Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows/Linux)</li>
              </ul>
            </div>
          </div>

          {/* Step 3: Essential Configuration */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-4">
                3
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Essential Configuration</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Configure Cursor for optimal AI-assisted development with the latest features.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-blue-600" />
                  AI Model Settings
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 mb-3">Configure your AI model preferences:</p>
                  <CodeExample
                    language="json"
                    code={`{
  "cursor.ai.model": "claude-3.5-sonnet",
  "cursor.ai.contextWindow": "large",
  "cursor.ai.includeImports": true,
  "cursor.ai.includeComments": true,
  "cursor.ai.maxTokens": 4000
}`}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-600" />
                  Performance Settings
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 mb-3">Optimize Cursor for better performance:</p>
                  <CodeExample
                    language="json"
                    code={`{
  "cursor.ai.streaming": true,
  "cursor.ai.cacheResponses": true,
  "cursor.ai.temperature": 0.7,
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.git/**": true,
    "**/dist/**": true
  }
}`}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Code2 className="w-5 h-5 mr-2 text-blue-600" />
                  Codebase Context Settings
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 mb-3">Enable advanced codebase understanding:</p>
                  <CodeExample
                    language="json"
                    code={`{
  "cursor.ai.enableCodebaseContext": true,
  "cursor.ai.includeDependencies": true,
  "cursor.ai.includeTests": true,
  "cursor.ai.maxFileSize": 10000,
  "cursor.ai.ignorePatterns": [
    "*.log",
    "*.tmp",
    "node_modules/**"
  ]
}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Test AI Features */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-4">
                4
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Test AI Features</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Let's test that Cursor's AI features are working properly with the latest capabilities.
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Test 1: AI Chat (Cmd+L / Ctrl+L)</h3>
                <p className="text-gray-700 mb-3">Open the AI chat and try this prompt:</p>
                <CodeExample
                  language="text"
                  code={`Create a React component that displays a list of users with their names and email addresses. Include proper TypeScript types and make it responsive.`}
                />
                <p className="text-sm text-gray-600 mt-2">
                  The AI should generate a complete, working React component with TypeScript types.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Test 2: Composer (Multi-file editing)</h3>
                <p className="text-gray-700 mb-3">Open Composer and try this prompt:</p>
                <CodeExample
                  language="text"
                  code={`Create a simple todo app with the following files:
- App.tsx (main component)
- TodoItem.tsx (individual todo item)
- types.ts (TypeScript interfaces)
- styles.css (basic styling)

Make sure all files work together and include proper imports.`}
                />
                <p className="text-sm text-gray-600 mt-2">
                  Composer should create multiple files that work together as a cohesive application.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Test 3: Codebase Context (@-mentions)</h3>
                <p className="text-gray-700 mb-3">In AI chat, try referencing files with @-mentions:</p>
                <CodeExample
                  language="text"
                  code={`@package.json What dependencies does this project use? Can you suggest any improvements?`}
                />
                <p className="text-sm text-gray-600 mt-2">
                  The AI should be able to read and understand your package.json file and provide relevant suggestions.
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
            <p className="text-gray-700 mb-6">
              Now that you have Cursor set up with the latest features, explore these tutorials to master AI-assisted development:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/tutorial/basics/lessons/interface"
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Understanding the Interface</h3>
                <p className="text-gray-600 text-sm">Learn about Cursor's interface and navigation</p>
              </Link>
              <Link 
                href="/tutorial/basics/lessons/ai-commands"
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">AI Commands & Features</h3>
                <p className="text-gray-600 text-sm">Master AI chat, Composer, and code generation</p>
              </Link>
            </div>
          </div>
        </div>

        <TutorialNavigation />
      </div>
    </div>
  );
}