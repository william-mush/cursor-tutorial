import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/search/supabase-client';

export const runtime = 'nodejs';

interface FeedbackRequest {
  queryId?: string;
  query: string;
  wasHelpful: boolean;
  rating?: number; // 1-5
  comment?: string;
}

/**
 * POST /api/search/feedback
 * Log user feedback on search results
 */
export async function POST(request: NextRequest) {
  try {
    const body: FeedbackRequest = await request.json();
    const { queryId, query, wasHelpful, rating, comment } = body;

    // Validate input
    if (typeof wasHelpful !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid feedback. wasHelpful must be a boolean.' },
        { status: 400 }
      );
    }

    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: 'Invalid rating. Must be between 1 and 5.' },
        { status: 400 }
      );
    }

    // If queryId is provided, update existing record
    if (queryId) {
      const supabaseAdmin = getSupabaseAdminClient();
      const { error } = await supabaseAdmin
        .from('search_queries')
        .update({
          was_helpful: wasHelpful,
          user_rating: rating || null,
        })
        .eq('id', queryId);

      if (error) {
        console.error('[Feedback API] Update error:', error);
        throw error;
      }
    } else if (query) {
      // If no queryId, try to find recent matching query
      const supabaseAdmin = getSupabaseAdminClient();
      const { data: recentQueries, error: selectError } = await supabaseAdmin
        .from('search_queries')
        .select('id')
        .eq('query', query)
        .order('created_at', { ascending: false })
        .limit(1);

      if (selectError) {
        console.error('[Feedback API] Select error:', selectError);
        throw selectError;
      }

      if (recentQueries && recentQueries.length > 0) {
        const supabaseAdmin = getSupabaseAdminClient();
        const { error: updateError } = await supabaseAdmin
          .from('search_queries')
          .update({
            was_helpful: wasHelpful,
            user_rating: rating || null,
          })
          .eq('id', recentQueries[0].id);

        if (updateError) {
          console.error('[Feedback API] Update error:', updateError);
          throw updateError;
        }
      }
    }

    // Log feedback for analytics (even if update failed)
    console.log('[Feedback]', {
      query: query?.slice(0, 100),
      wasHelpful,
      rating,
      hasComment: !!comment,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your feedback!',
    });

  } catch (error: any) {
    console.error('[Feedback API] Error:', error);
    
    // Return success anyway - don't let feedback errors break UX
    return NextResponse.json({
      success: true,
      message: 'Feedback received.',
    });
  }
}

