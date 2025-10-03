import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cursor Tutorial - Master AI-Powered Development with Claude 4 & BugBot",
  description: "Complete Cursor 1.0 tutorial. Learn BugBot, Background Agent, Memories, Claude 4, and latest AI features. Free comprehensive guide for developers.",
  keywords: [
    "Cursor tutorial",
    "Cursor 1.0",
    "BugBot Cursor",
    "Background Agent",
    "Claude 4",
    "Memories Cursor",
    "AI code generation",
    "Composer Cursor",
    "AI-assisted development",
    "Cursor features 2025",
    "AI chat programming",
    "code generation tutorial",
    "AI development tools",
    "Cursor settings",
    "AI programming assistant",
    "Cursor vs VS Code",
    "AI coding tutorial",
    "programming with AI"
  ],
  authors: [{ name: "Cursor Tutorial Team" }],
  creator: "Cursor Tutorial",
  publisher: "Cursor Tutorial",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cursor-tutorial.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Cursor Tutorial - Master AI-Powered Development",
    description: "Complete Cursor AI editor tutorial. Learn Cursor features, Composer, AI chat, code generation, and Claude 3.5 Sonnet integration.",
    url: 'https://cursor-tutorial.vercel.app',
    siteName: 'Cursor Tutorial',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cursor Tutorial - Master AI-Powered Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cursor Tutorial - Master AI-Powered Development",
    description: "Complete Cursor AI editor tutorial. Learn Cursor features, Composer, AI chat, code generation, and Claude 3.5 Sonnet integration.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}