import { NextRequest, NextResponse } from 'next/server';
import { sendEmailSignup } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();
    
    console.log('New email signup:', { email, name, timestamp: new Date() });
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    // Send email using Resend (with fallback)
    const success = await sendEmailSignup(email, name);
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Email added successfully!' 
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to process email signup' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error processing signup' },
      { status: 500 }
    );
  }
}
