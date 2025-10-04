import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailSignup(email: string, name?: string) {
  try {
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
