const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors());
app.use(express.json());

// Import email routes
const emailRoutes = require('./routes/email');

// Routes
app.use('/api/email', emailRoutes);

// Serve React app only in production
if (isProduction) {
  app.use(express.static(path.join(__dirname, '../build')));
  
  // Serve React app for any non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Email service ready at http://localhost:${PORT}/api/email`);
  if (!isProduction) {
    console.log(`React dev server should be running on http://localhost:3000`);
  }
});
