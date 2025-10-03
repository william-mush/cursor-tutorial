import { TutorialNavigation } from "@/components/TutorialNavigation";
import { LessonCard } from "@/components/LessonCard";
import Link from "next/link";
import { ArrowRight, MessageSquare, Code2, Brain, FileText, Terminal } from "lucide-react";

const featureLessons = [
  {
    id: "chat-interface",
    title: "Chat Interface Mastery",
    description: "Master the AI chat interface for maximum productivity",
    duration: "20 min",
    difficulty: "Beginner"
  },
  {
    id: "code-completions",
    title: "Code Completions",
    description: "Leverage intelligent code suggestions and auto-completion",
    duration: "15 min",
    difficulty: "Beginner"
  },
  {
    id: "codebase-understanding",
    title: "Codebase Understanding",
    description: "Help Cursor understand your project structure and context",
    duration: "25 min",
    difficulty: "Intermediate"
  },
  {
    id: "multi-file-editing",
    title: "Multi-file Editing",
    description: "Edit multiple files simultaneously with AI assistance",
    duration: "18 min",
    difficulty: "Intermediate"
  },
  {
    id: "terminal-integration",
    title: "Terminal Integration",
    description: "Use the integrated terminal effectively with AI commands",
    duration: "12 min",
    difficulty: "Beginner"
  }
];

export default function FeaturesTutorials() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/tutorial" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Back to Tutorials
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cursor Key Features
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Deep dive into Cursor's most powerful features and learn how to use them effectively.
          </p>
        </div>

        <TutorialNavigation />

        <div className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featureLessons.map((lesson, index) => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                index={index + 1}
                basePath="/tutorial/features/lessons"
              />
            ))}
          </div>
        </div>

        {/* Feature Overview */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Features Overview</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">AI Chat Interface</h3>
              </div>
              <p className="text-gray-600">
                Natural language conversations with AI to get help, generate code, and solve problems.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Code2 className="w-8 h-8 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Code Completions</h3>
              </div>
              <p className="text-gray-600">
                Intelligent code suggestions that understand your context and coding patterns.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Brain className="w-8 h-8 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Codebase Understanding</h3>
              </div>
              <p className="text-gray-600">
                AI that understands your entire project structure and can work across multiple files.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Multi-file Editing</h3>
              </div>
              <p className="text-gray-600">
                Edit multiple files simultaneously with AI assistance and maintain consistency.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Terminal className="w-8 h-8 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Terminal Integration</h3>
              </div>
              <p className="text-gray-600">
                Built-in terminal with AI-powered command suggestions and execution.
              </p>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Getting Started</h3>
          <p className="text-gray-600 mb-4">
            New to Cursor? Start with the basics to understand the core concepts before diving into specific features.
          </p>
          <Link
            href="/tutorial/basics"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start with Basics
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}