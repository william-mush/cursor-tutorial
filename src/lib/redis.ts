import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export { redis };

// Cache helper functions
export const cache = {
  // Store search result in cache
  async set(key: string, value: any, ttlSeconds: number = 300) {
    try {
      await redis.setex(key, ttlSeconds, JSON.stringify(value));
      console.log(`✅ Cached: ${key}`);
    } catch (error) {
      console.error('❌ Cache set error:', error);
    }
  },

  // Get search result from cache
  async get(key: string) {
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
