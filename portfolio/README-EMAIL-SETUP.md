# Email Setup Guide for Portfolio Contact Form

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Email Configuration

#### Gmail Setup (Recommended)
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings → Security
   - Under "2-Step Verification", click "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Name it "Portfolio Contact Form"
   - Copy the generated 16-character password

3. **Create `.env` file** in the root directory:
```env
EMAIL_PROVIDER=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-16-char-app-password
CONTACT_EMAIL=your-email@gmail.com
PORT=5000
NODE_ENV=development
```

### 3. Development Mode
```bash
# Run both servers simultaneously
npm run dev
```

### 4. Test the Contact Form
1. Open your portfolio in the browser
2. Click the chat popup
3. Fill out the contact form
4. Submit and check your email!

## 🐳 Docker Deployment

### Build and Run
```bash
# Build the Docker image
docker build -t portfolio .

# Run with environment variables
docker run -p 5000:5000 --env-file .env portfolio

# Or use Docker Compose
docker-compose up -d
```

### Production Deployment
```bash
# Build for production
docker build --target production -t portfolio-prod .

# Run production container
docker run -p 5000:5000 --env-file .env portfolio-prod
```

## 🔧 Troubleshooting

### Common Issues

1. **"Invalid login" error with Gmail**
   - Make sure you're using an App Password, not your regular password
   - Ensure 2FA is enabled on your Gmail account

2. **"Connection timeout" error**
   - Check your firewall settings
   - Verify SMTP port (587 for TLS, 465 for SSL)

3. **"Authentication failed" error**
   - Double-check your email and password
   - For Gmail, ensure you're using the App Password

### Testing Email Service
```bash
# Test the email endpoint directly
curl -X POST http://localhost:5000/api/email/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## 📁 File Structure
```
portfolio/
├── server/
│   ├── server.js          # Main Express server
│   ├── routes/
│   │   └── email.js       # Email API routes
│   └── services/
│       └── emailService.js # Email sending logic
├── src/
│   └── components/
│       └── ChatPopup.js   # Updated contact form
├── Dockerfile             # Production Docker image
├── docker-compose.yml     # Docker services
└── .env                   # Environment variables (create this)
```

## 🔒 Security Notes

- **Never commit your `.env` file** to version control
- **Use App Passwords** for Gmail instead of your main password
- **Consider rate limiting** for production use
- **Validate all inputs** on both client and server side

## 🚀 Next Steps

1. **Add rate limiting** to prevent spam
2. **Implement CAPTCHA** for additional security
3. **Add email templates** for different types of messages
4. **Set up monitoring** and logging
5. **Deploy to cloud platform** (Heroku, AWS, etc.)

## 📞 Support

If you encounter issues:
1. Check the console logs in your browser
2. Check the server logs in your terminal
3. Verify your environment variables
4. Test the email service endpoint directly
