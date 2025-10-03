export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Cursor Tutorial",
    "description": "Complete Cursor AI editor tutorial. Learn Cursor features, Composer, AI chat, code generation, and Claude 3.5 Sonnet integration.",
    "url": "https://cursor-tutorial.vercel.app",
    "logo": "https://cursor-tutorial.vercel.app/logo.png",
    "sameAs": [
      "https://github.com/william-mush/cursor-tutorial"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cursor Tutorials",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Getting Started with Cursor",
          "description": "Learn how to install, configure, and start using Cursor for AI-assisted development.",
          "url": "https://cursor-tutorial.vercel.app/tutorial/basics/lessons/getting-started",
          "provider": {
            "@type": "Organization",
            "name": "Cursor Tutorial"
          }
        },
        {
          "@type": "Course",
          "name": "Understanding the Cursor Interface",
          "description": "Master Cursor's modern interface with AI-powered features, Composer, and advanced codebase context.",
          "url": "https://cursor-tutorial.vercel.app/tutorial/basics/lessons/interface",
          "provider": {
            "@type": "Organization",
            "name": "Cursor Tutorial"
          }
        },
        {
          "@type": "Course",
          "name": "AI Commands & Features",
          "description": "Master Cursor's AI capabilities including Claude 3.5 Sonnet, Composer, codebase context, and advanced code generation.",
          "url": "https://cursor-tutorial.vercel.app/tutorial/basics/lessons/ai-commands",
          "provider": {
            "@type": "Organization",
            "name": "Cursor Tutorial"
          }
        },
        {
          "@type": "Course",
          "name": "File Management & Navigation",
          "description": "Master efficient file management, advanced search, and AI-powered navigation in Cursor.",
          "url": "https://cursor-tutorial.vercel.app/tutorial/basics/lessons/file-management",
          "provider": {
            "@type": "Organization",
            "name": "Cursor Tutorial"
          }
        },
        {
          "@type": "Course",
          "name": "AI-Powered Code Generation",
          "description": "Master Cursor's code generation capabilities with Claude 3.5 Sonnet, Composer, and advanced AI features.",
          "url": "https://cursor-tutorial.vercel.app/tutorial/basics/lessons/code-generation",
          "provider": {
            "@type": "Organization",
            "name": "Cursor Tutorial"
          }
        },
        {
          "@type": "Course",
          "name": "Essential Cursor Settings",
          "description": "Master the most functional settings for maximum productivity and AI performance.",
          "url": "https://cursor-tutorial.vercel.app/tutorial/advanced/lessons/cursor-settings",
          "provider": {
            "@type": "Organization",
            "name": "Cursor Tutorial"
          }
        }
      ]
    },
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Cursor AI Editor",
      "description": "AI-powered code editor with Claude 3.5 Sonnet integration",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Windows, macOS, Linux",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
