import { TutorialNavigation } from "@/components/TutorialNavigation";
import { CodeExample } from "@/components/CodeExample";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Folder, File, Search, GitBranch } from "lucide-react";

export default function FileManagementLesson() {
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
            File Management
          </h1>
          <p className="text-xl text-gray-600">
            Learn how to efficiently manage files and projects in Cursor for better organization and productivity.
          </p>
        </div>

        <TutorialNavigation />

        <div className="space-y-8 mt-8">
          {/* File Explorer */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Folder className="w-8 h-8 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">File Explorer</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              The file explorer is your central hub for navigating and managing project files. It's located in the left sidebar.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Operations</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Open Files:</strong> Click on any file to open it in the editor</li>
                  <li><strong>Create Files:</strong> Right-click in the explorer and select "New File"</li>
                  <li><strong>Create Folders:</strong> Right-click and select "New Folder"</li>
                  <li><strong>Rename:</strong> Right-click and select "Rename" or press F2</li>
                  <li><strong>Delete:</strong> Right-click and select "Delete" or press Delete key</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">File Explorer Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Search files by name</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Preview files without opening</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GitBranch className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Git status indicators</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">• Drag and drop to move files</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">• Pin frequently used files</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">• Collapse/expand folders</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick File Access */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Search className="w-8 h-8 text-green-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Quick File Access</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Cursor provides several ways to quickly find and open files without using the file explorer.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Open (Cmd+P / Ctrl+P)</h3>
                <p className="text-gray-600 mb-4">The fastest way to open files by name:</p>
                <CodeExample
                  language="bash"
                  code={`# Press Cmd+P (Mac) or Ctrl+P (Windows/Linux)
# Type part of the filename
# Use arrow keys to navigate
# Press Enter to open`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Global Search (Cmd+Shift+F / Ctrl+Shift+F)</h3>
                <p className="text-gray-600 mb-4">Search for text across all files in your project:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Search for specific text or patterns</li>
                  <li>Use regex patterns for advanced searches</li>
                  <li>Filter by file type or folder</li>
                  <li>Replace text across multiple files</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Files</h3>
                <p className="text-gray-600 mb-4">Access recently opened files:</p>
                <CodeExample
                  language="bash"
                  code={`# Press Cmd+R (Mac) or Ctrl+R (Windows/Linux)
# Shows list of recently opened files
# Use arrow keys to navigate
# Press Enter to open`}
                />
              </div>
            </div>
          </div>

          {/* Project Organization */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Organization</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Folder Structure</h3>
                <CodeExample
                  language="text"
                  title="Typical React Project Structure"
                  code={`my-project/
├── src/
│   ├── components/
│   │   ├── common/
│   │   └── specific/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   └── assets/
├── public/
├── tests/
├── docs/
└── config files`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Workspace Settings</h3>
                <p className="text-gray-600 mb-4">Configure Cursor for your specific project needs:</p>
                <CodeExample
                  language="json"
                  title=".vscode/settings.json"
                  code={`{
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/dist": true,
    "**/.next": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.next": true
  },
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/dist/**": true
  }
}`}
                />
              </div>
            </div>
          </div>

          {/* Git Integration */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <GitBranch className="w-8 h-8 text-purple-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Git Integration</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Cursor has built-in Git support for version control. The source control panel shows file changes and allows you to commit, push, and pull changes.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Source Control Panel</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>View modified, added, and deleted files</li>
                  <li>Stage and unstage changes</li>
                  <li>Write commit messages</li>
                  <li>Push and pull changes</li>
                  <li>View file diffs</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">File Status Indicators</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li><span className="text-green-600">A</span> - Added file</li>
                  <li><span className="text-orange-600">M</span> - Modified file</li>
                  <li><span className="text-red-600">D</span> - Deleted file</li>
                  <li><span className="text-blue-600">U</span> - Untracked file</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Perfect! 🎯</h2>
            <p className="text-gray-600 mb-6">
              You've mastered file management in Cursor! Next, let's learn about code generation and AI-powered development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tutorial/basics/lessons/code-generation"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next Lesson: Code Generation
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
