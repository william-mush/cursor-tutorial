import { NextRequest, NextResponse } from 'next/server';

// For now, this just logs the email - you'll need to integrate with an email service
export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();
    
    // Log the signup (replace with actual email service)
    console.log('New email signup:', { email, name, timestamp: new Date() });
    
    // TODO: Integrate with your preferred email service:
    // - SendGrid
    // - Mailchimp
    // - ConvertKit
    // - EmailJS
    // - Resend
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email added successfully!' 
    });
  } catch (error) {
    console.error('Email signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add email' },
      { status: 500 }
    );
  }
}
