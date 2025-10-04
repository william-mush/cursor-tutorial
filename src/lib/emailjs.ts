import emailjs from '@emailjs/browser';

// EmailJS configuration for email collection
// Sign up at https://www.emailjs.com/ (free tier: 200 emails/month)
// After signing up, replace these with your actual credentials

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
};

// Initialize EmailJS
export function initEmailJS() {
  if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }
}

export async function sendEmailSignup(email: string, name?: string) {
  try {
    console.log('EmailJS Config:', EMAILJS_CONFIG);
    console.log('Sending email to:', email);
    
    // Initialize EmailJS if not already done
    initEmailJS();
    
    // Send email using EmailJS
    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        to_email: 'emailjs@aboutus.org',
        from_email: email,
        from_name: name || 'Anonymous',
        message: `New email signup from Cursor Tutorial website!\n\nEmail: ${email}\nName: ${name || 'Not provided'}\nTimestamp: ${new Date().toLocaleString()}`,
        website: 'Cursor Tutorial',
        timestamp: new Date().toLocaleString(),
      }
    );
    
    console.log('Email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('EmailJS error:', error);
    console.error('Error details:', {
      serviceId: EMAILJS_CONFIG.serviceId,
      templateId: EMAILJS_CONFIG.templateId,
      publicKey: EMAILJS_CONFIG.publicKey,
    });
    return false;
  }
}
