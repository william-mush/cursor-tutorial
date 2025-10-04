import { NextRequest, NextResponse } from 'next/server';
import { sendEmailSignup } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();
    
    console.log('New email signup:', { email, name, timestamp: new Date() });
    
    // Send email using Resend
    const success = await sendEmailSignup(email, name);
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Email added successfully!' 
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add email' },
      { status: 500 }
    );
  }
}
