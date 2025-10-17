import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/search/supabase-client';

export const runtime = 'nodejs';

/**
 * GET /api/search/health
 * Health check endpoint to verify all services are configured
 */
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      anthropic: false,
      openai: false,
      supabase: false,
    },
    errors: [] as string[],
  };

  // Check Anthropic API key
  if (process.env.Claude_My_Secret_Key) {
    health.services.anthropic = true;
  } else {
    health.errors.push('Claude_My_Secret_Key not configured');
  }

  // Check OpenAI API key
  if (process.env.OPENAI_API_KEY) {
    health.services.openai = true;
  } else {
    health.errors.push('OPENAI_API_KEY not configured');
  }

  // Check Supabase connection
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      // Test database connection
      const { error } = await supabaseAdmin
        .from('cursor_content')
        .select('count')
        .limit(1);
      
      if (!error) {
        health.services.supabase = true;
      } else {
        health.errors.push(`Supabase connection failed: ${error.message}`);
      }
    } catch (error: any) {
      health.errors.push(`Supabase error: ${error.message}`);
    }
  } else {
    health.errors.push('Supabase environment variables not configured');
  }

  // Overall health status
  if (health.errors.length > 0) {
    health.status = 'unhealthy';
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;

  return NextResponse.json(health, { status: statusCode });
}

