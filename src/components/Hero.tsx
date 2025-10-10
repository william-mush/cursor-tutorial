import { ArrowRight, Code2, Zap, Brain } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "./search/SearchBar";

export function Hero() {

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  AI-Powered Development
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Master{" "}
                  <span className="gradient-text">
                    Cursor 1.7
                  </span>{" "}
                  Development
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Complete Cursor 0.45.14 tutorial with Browser Control, Hooks, Team Rules, Sandboxed Terminals, and latest AI features. 
                  Learn next-generation AI-assisted development with comprehensive guides and real-world examples.
                </p>
              </div>

              {/* AI Search Bar */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-blue-200">
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-blue-600" />
                    Ask AI About Cursor
                  </h2>
                  <p className="text-sm text-gray-600">Voice-enabled • Instant answers</p>
                </div>
                <SearchBar 
                  placeholder="How do I use Tab completion?"
                  showSuggestions={false}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/tutorial/basics"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Tutorials</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">100+</div>
                  <div className="text-sm text-gray-600">Examples</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">10k+</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="text-sm text-gray-500 ml-4">cursor-tutorial.tsx</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                    <div className="text-blue-600">// Generated with Cursor AI</div>
                    <div className="text-gray-800 mt-2">
                      <span className="text-purple-600">const</span>{" "}
                      <span className="text-green-600">TutorialApp</span>{" "}
                      <span className="text-gray-600">= () =&gt; {"{"}</span>
                    </div>
                    <div className="text-gray-800 ml-4">
                      <span className="text-purple-600">return</span>{" "}
                      <span className="text-gray-600">&lt;</span>
                      <span className="text-red-600">div</span>
                      <span className="text-gray-600">&gt;</span>
                    </div>
                    <div className="text-gray-800 ml-8">
                      <span className="text-gray-600">&lt;</span>
                      <span className="text-red-600">h1</span>
                      <span className="text-gray-600">&gt;</span>
                      <span className="text-yellow-600">Hello Cursor!</span>
                      <span className="text-gray-600">&lt;/</span>
                      <span className="text-red-600">h1</span>
                      <span className="text-gray-600">&gt;</span>
                    </div>
                    <div className="text-gray-800 ml-4">
                      <span className="text-gray-600">&lt;/</span>
                      <span className="text-red-600">div</span>
                      <span className="text-gray-600">&gt;</span>
                    </div>
                    <div className="text-gray-800">
                      <span className="text-gray-600">{"}"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                <Code2 className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
