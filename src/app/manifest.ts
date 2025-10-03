import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cursor Tutorial - Master AI-Powered Development',
    short_name: 'Cursor Tutorial',
    description: 'Complete Cursor 1.7.33 tutorial with Claude 4.5 Sonnet, Browser Control, Hooks, and latest AI features.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
