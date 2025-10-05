// Simple Resend test script
// Run with: node test-resend.js

const RESEND_API_KEY = process.env.RESEND_API_KEY || 'paste_your_api_key_here';

async function testResend() {
  console.log('Testing Resend API...');
  console.log('API Key:', RESEND_API_KEY.substring(0, 10) + '...');
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Cursor Tutorial <onboarding@resend.dev>',
        to: ['emailjs@aboutus.org'],
        subject: 'Test Email from Cursor Tutorial',
        html: '<h1>Test Email</h1><p>If you receive this, Resend is working!</p>',
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ SUCCESS! Email sent:', data);
      console.log('Check emailjs@aboutus.org for the test email');
    } else {
      console.log('❌ ERROR:', data);
      console.log('Status:', response.status);
    }
  } catch (error) {
    console.log('❌ FAILED:', error.message);
  }
}

testResend();

