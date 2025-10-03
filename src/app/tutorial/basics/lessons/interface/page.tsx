import { TutorialNavigation } from "@/components/TutorialNavigation";
import { CodeExample } from "@/components/CodeExample";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Monitor, Terminal, MessageSquare, Settings } from "lucide-react";

export default function InterfaceLesson() {
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
            Understanding the Interface
          </h1>
          <p className="text-xl text-gray-600">
            Learn how to navigate Cursor's interface and understand its layout for efficient development.
          </p>
        </div>

        <TutorialNavigation />

        <div className="space-y-8 mt-8">
          {/* Main Interface Overview */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Main Interface Components</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Monitor className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Editor Area</h3>
                    <p className="text-gray-600 text-sm">The main workspace where you write and edit code. Supports multiple tabs and split views.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Chat Panel</h3>
                    <p className="text-gray-600 text-sm">AI-powered chat interface for asking questions and getting code suggestions.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Terminal className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Integrated Terminal</h3>
                    <p className="text-gray-600 text-sm">Built-in terminal for running commands without leaving the editor.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Settings className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Sidebar</h3>
                    <p className="text-gray-600 text-sm">File explorer, search, source control, and extension management.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Layout Overview</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>File Explorer</span>
                    <span className="text-blue-600">Left Sidebar</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Editor Tabs</span>
                    <span className="text-green-600">Top</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Code Editor</span>
                    <span className="text-purple-600">Center</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chat Panel</span>
                    <span className="text-orange-600">Right Sidebar</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Terminal</span>
                    <span className="text-gray-600">Bottom</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential Keyboard Shortcuts</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Features</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Open Chat</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Cmd+L</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">AI Edit Mode</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Cmd+K</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Accept Suggestion</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Tab</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Reject Suggestion</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Esc</kbd>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Navigation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Command Palette</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Cmd+Shift+P</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Toggle Sidebar</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Cmd+B</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Toggle Terminal</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Ctrl+`</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Quick Open</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Cmd+P</kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* File Management */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">File Management</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Opening Projects</h3>
                <p className="text-gray-600 mb-4">There are several ways to open a project in Cursor:</p>
                <CodeExample
                  language="bash"
                  code={`# Method 1: From Welcome Screen
# Click "Open Folder" and select your project directory

# Method 2: From Command Line
cursor /path/to/your/project

# Method 3: Drag and Drop
# Drag a folder onto the Cursor icon in your dock/taskbar`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">File Explorer Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Right-click files for context menu options</li>
                  <li>Drag and drop files to reorder or move them</li>
                  <li>Use the search icon to find files quickly</li>
                  <li>Create new files and folders directly from the explorer</li>
                  <li>Preview files without opening them</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Customization */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customizing Your Workspace</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Themes and Appearance</h3>
                <p className="text-gray-600 mb-4">Customize Cursor's appearance to match your preferences:</p>
                <CodeExample
                  language="json"
                  title="settings.json - Appearance"
                  code={`{
  "workbench.colorTheme": "Dark+ (default dark)",
  "workbench.iconTheme": "vs-seti",
  "editor.fontFamily": "Fira Code, Consolas, monospace",
  "editor.fontSize": 14,
  "editor.fontLigatures": true,
  "workbench.colorCustomizations": {
    "editor.background": "#1e1e1e",
    "sideBar.background": "#252526"
  }
}`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Layout Customization</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Drag panels to rearrange them</li>
                  <li>Resize panels by dragging their borders</li>
                  <li>Split the editor vertically or horizontally</li>
                  <li>Pin frequently used files</li>
                  <li>Use Zen mode for distraction-free coding</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Great Job! 🎉</h2>
            <p className="text-gray-600 mb-6">
              You now understand Cursor's interface! Next, let's learn about the AI commands and features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tutorial/basics/lessons/ai-commands"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next Lesson: Basic AI Commands
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
