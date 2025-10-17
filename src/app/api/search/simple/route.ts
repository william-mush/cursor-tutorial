import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/search/supabase-client';

export const runtime = 'nodejs';
export const maxDuration = 30;

/**
 * GET /api/search/simple?q=query
 * Simple text-based search without embeddings
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }
    
    console.log('Simple search for:', query);
    
    const supabaseAdmin = getSupabaseAdminClient();
    
    // Simple text search without embeddings
    const { data, error } = await supabaseAdmin
      .from('cursor_content')
      .select('id, content, metadata')
      .textSearch('content', query)
      .limit(5);
    
    if (error) {
      console.error('Simple search error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      query,
      results: data?.length || 0,
      data: data || []
    });
    
  } catch (error: any) {
    console.error('Simple search endpoint error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
