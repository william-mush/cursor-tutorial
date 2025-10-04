import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');

export async function sendEmailSignup(email: string, name?: string) {
  try {
    // Check if we have a valid API key
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_api_key_here') {
      console.log('Resend API key not configured, logging signup instead:', { email, name });
      // In development or when API key is not set, just log the signup
      return true;
    }

    console.log('Sending email with Resend to:', email);
    
    const { data, error } = await resend.emails.send({
      from: 'Cursor Tutorial <noreply@cursortutorial.ai>',
      to: ['emailjs@aboutus.org'],
      subject: 'New Cursor Tutorial Signup',
      html: `
        <h2>New email signup from Cursor Tutorial website!</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Name:</strong> ${name || 'Anonymous'}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Website:</strong> Cursor Tutorial</p>
        <p>This person wants to receive Cursor tutorial updates!</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return false;
    }

    console.log('Email sent successfully with Resend:', data);
    return true;
  } catch (error) {
    console.error('Resend error:', error);
    return false;
  }
}
