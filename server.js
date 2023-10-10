const express = require('express');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
const multer = require('multer');
const User = require('./userModel');

// Setup Express
const app = express();
const PORT = process.env.PORT || 3001;

// Setup Mongoose (replace <your_mongoDB_URI> with your actual MongoDB URI)
mongoose.connect('<your_mongoDB_URI>', { useNewUrlParser: true, useUnifiedTopology: true });

// Setup SendGrid (replace <your_sendgrid_API_key> with your actual SendGrid API key)
sgMail.setApiKey('<your_sendgrid_API_key>');

// Setup CORS
app.use(cors());

// Setup Multer for file uploads with size limits
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit per file
    }
});

// Middleware to handle multer errors gracefully
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send('File too large. Max allowed size is 5MB.');
  }
  next(err);
});

// Setup Express to handle JSON data
app.use(express.json());

// API Endpoint to handle file uploads and user information
app.post('/submit', upload.array('files'), async (req, res) => {
  try {
    // Save user data and files to MongoDB
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      files: req.files.map(file => file.buffer),
    });
    await user.save();

    // Send email notification using SendGrid
    const msg = {
      to: 'galleries@lakesideinc.com',
      from: 'noreply@lakesideinc.com',
      subject: 'New Quote Request',
      text: `New quote request from ${req.body.firstName} ${req.body.lastName}. Contact them at ${req.body.email} or ${req.body.phoneNumber}.`,
    };
    await sgMail.send(msg);

    res.status(200).send('Quote request submitted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// API Endpoint to handle file uploads
app.post('/api/upload', upload.array('files'), async (req, res) => {
  try {
    // Handle file uploads here
    res.status(200).send('Files uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
