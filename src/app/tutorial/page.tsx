import { TutorialNavigation } from "@/components/TutorialNavigation";
import { TutorialCard } from "@/components/TutorialCard";

const tutorials = [
  {
    id: "basics",
    title: "Cursor Basics",
    description: "Learn the fundamentals of using Cursor for development",
    icon: "🚀",
    href: "/tutorial/basics",
    lessons: [
      "Getting Started with Cursor",
      "Understanding the Interface",
      "Basic AI Commands",
      "File Management",
      "Code Generation"
    ]
  },
  {
    id: "advanced",
    title: "Advanced Features",
    description: "Master advanced Cursor features and workflows",
    icon: "⚡",
    href: "/tutorial/advanced",
    lessons: [
      "Custom AI Models",
      "Advanced Prompts",
      "Code Refactoring",
      "Debugging with AI",
      "Performance Optimization"
    ]
  },
  {
    id: "features",
    title: "Key Features",
    description: "Deep dive into Cursor's most powerful features",
    icon: "🎯",
    href: "/tutorial/features",
    lessons: [
      "Chat Interface",
      "Code Completions",
      "Codebase Understanding",
      "Multi-file Editing",
      "Terminal Integration"
    ]
  },
  {
    id: "examples",
    title: "Real Examples",
    description: "See Cursor in action with real-world projects",
    icon: "💡",
    href: "/tutorial/examples",
    lessons: [
      "Building a React App",
      "Creating APIs",
      "Database Integration",
      "Testing Strategies",
      "Deployment Workflows"
    ]
  }
];

export default function TutorialPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cursor Tutorial Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master AI-powered development with comprehensive tutorials designed to take you from beginner to expert.
          </p>
        </div>

        <TutorialNavigation />

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {tutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
      </div>
    </div>
  );
}
