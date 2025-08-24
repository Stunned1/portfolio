const nodemailer = require('nodemailer');

// Create transporter based on environment variables
const createTransporter = () => {
  const emailProvider = process.env.EMAIL_PROVIDER || 'gmail';
  
  switch (emailProvider.toLowerCase()) {
    case 'gmail':
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD // Use App Password for Gmail
        }
      });
    
    case 'outlook':
      return nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    
    case 'custom':
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    
    default:
      throw new Error(`Unsupported email provider: ${emailProvider}`);
  }
};

// Send contact form email
const sendContactEmail = async ({ name, email, message }) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_EMAIL, // Your email where you want to receive submissions
    subject: `Portfolio Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Portfolio Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #666; font-size: 14px;">
          This message was sent from your portfolio contact form at ${new Date().toLocaleString()}
        </p>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}

Sent from your portfolio contact form at ${new Date().toLocaleString()}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error.message);
    throw error;
  }
};

module.exports = {
  sendContactEmail
};
