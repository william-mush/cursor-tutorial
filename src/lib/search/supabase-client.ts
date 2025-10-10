import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Public client (for client-side operations)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client (for server-side operations with elevated privileges)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Database types
export interface CursorContent {
  id: string;
  content: string;
  embedding: number[];
  metadata: {
    source: 'tutorial' | 'docs' | 'changelog' | 'rules' | 'community';
    title: string;
    url: string;
    category?: string;
    version?: string;
    quality_score: number;
    tags?: string[];
    author?: string;
    date: string;
  };
  created_at: string;
  updated_at: string;
}

export interface SearchQuery {
  id: string;
  query: string;
  results_count: number;
  response_time_ms: number;
  user_rating?: number;
  was_helpful?: boolean;
  created_at: string;
}

