import { Redis } from '@upstash/redis';

// Initialize Redis client (with fallback)
let redis: Redis | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  console.log('✅ Redis client initialized');
} else {
  console.log('⚠️ Redis not configured - using fallback caching');
}

export { redis };

// Cache helper functions
export const cache = {
  // Store search result in cache
  async set(key: string, value: any, ttlSeconds: number = 300) {
    if (!redis) {
      console.log('⚠️ Redis not available - skipping cache set');
      return;
    }
    try {
      await redis.setex(key, ttlSeconds, JSON.stringify(value));
      console.log(`✅ Cached: ${key}`);
    } catch (error) {
      console.error('❌ Cache set error:', error);
    }
  },

  // Get search result from cache
  async get(key: string) {
    if (!redis) {
      console.log('⚠️ Redis not available - cache miss');
      return null;
    }
    try {
      const cached = await redis.get(key);
      if (cached) {
        console.log(`🚀 Cache hit: ${key}`);
        return JSON.parse(cached as string);
      }
      console.log(`❌ Cache miss: ${key}`);
      return null;
    } catch (error) {
      console.error('❌ Cache get error:', error);
      return null;
    }
  },

  // Generate cache key for search queries
  generateKey(question: string): string {
    return `search:${question.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}`;
  },

  // Clear cache (useful for testing)
  async clear() {
    try {
      await redis.flushall();
      console.log('🧹 Cache cleared');
    } catch (error) {
      console.error('❌ Cache clear error:', error);
    }
  }
};
