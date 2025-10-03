import { TutorialNavigation } from "@/components/TutorialNavigation";
import { CodeExample } from "@/components/CodeExample";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

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
            Learn how to install Cursor and set up your development environment for AI-powered coding.
          </p>
        </div>

        <TutorialNavigation />

        <div className="space-y-8 mt-8">
          {/* Step 1: Download */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-4">
                1
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Download Cursor</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Cursor is available for Windows, macOS, and Linux. Let's get it installed on your system.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">For macOS:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Visit <a href="https://cursor.sh" className="text-blue-600 hover:underline">cursor.sh</a></li>
                  <li>Click "Download for Mac"</li>
                  <li>Open the downloaded .dmg file</li>
                  <li>Drag Cursor to your Applications folder</li>
                </ol>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">For Windows:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Visit <a href="https://cursor.sh" className="text-blue-600 hover:underline">cursor.sh</a></li>
                  <li>Click "Download for Windows"</li>
                  <li>Run the downloaded .exe installer</li>
                  <li>Follow the installation wizard</li>
                </ol>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">For Linux:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Visit <a href="https://cursor.sh" className="text-blue-600 hover:underline">cursor.sh</a></li>
                  <li>Download the appropriate package (.deb, .rpm, or .AppImage)</li>
                  <li>Install using your package manager or run the AppImage</li>
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
              <h2 className="text-2xl font-bold text-gray-900">First Launch</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              When you first open Cursor, you'll see a welcome screen. Here's what to do:
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Sign in or create an account</h3>
                  <p className="text-gray-600">You'll need a Cursor account to use AI features. You can sign in with GitHub or create a new account.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Choose your theme</h3>
                  <p className="text-gray-600">Select between light and dark themes. You can change this later in settings.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Open a folder or create a new project</h3>
                  <p className="text-gray-600">You can open an existing project folder or create a new one to get started.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Basic Setup */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-4">
                3
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Basic Setup</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Let's configure Cursor for optimal AI-assisted development:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Install Extensions</h3>
                <p className="text-gray-600 mb-4">Cursor comes with many extensions pre-installed, but you might want to add more:</p>
                <CodeExample
                  language="bash"
                  code={`# Open Command Palette (Cmd+Shift+P on Mac, Ctrl+Shift+P on Windows/Linux)
# Type "Extensions: Install Extensions"

# Recommended extensions:
# - Python
# - JavaScript (ES6) code snippets
# - Prettier - Code formatter
# - ESLint
# - GitLens`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Configure Settings</h3>
                <p className="text-gray-600 mb-4">Open settings to customize your experience:</p>
                <CodeExample
                  language="json"
                  title="settings.json"
                  code={`{
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.wordWrap": "on",
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "cursor.ai.enabled": true,
  "cursor.ai.model": "gpt-4"
}`}
                />
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
              Let's test that Cursor's AI features are working properly:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Open the Chat Panel</h3>
                <p className="text-gray-600 mb-4">Press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Cmd+L</kbd> (Mac) or <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Ctrl+L</kbd> (Windows/Linux) to open the chat panel.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Try a Simple Request</h3>
                <p className="text-gray-600 mb-4">Type this in the chat panel:</p>
                <CodeExample
                  language="text"
                  code={`Create a simple HTML page with a header, main content, and footer`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Test Code Completions</h3>
                <p className="text-gray-600 mb-4">Create a new file and start typing. You should see AI-powered suggestions:</p>
                <CodeExample
                  language="javascript"
                  code={`// Start typing this and see what Cursor suggests:
function calculateSum(a, b) {
  // Cursor should suggest: return a + b;
}`}
                />
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 Congratulations!</h2>
            <p className="text-gray-600 mb-6">
              You've successfully installed and set up Cursor! You're now ready to start using AI-powered development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tutorial/basics/lessons/interface"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next Lesson: Understanding the Interface
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
