const express = require('express');
const aws = require('aws-sdk'); // Add AWS SDK
require('dotenv').config();
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const PORT = process.env.PORT || 3001;

const app = express();

// Use middlewares
app.use(cors());  // Enables all CORS requests (you might want to configure this)
app.use(bodyParser.json());  // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  zipCode: String,
  fileUrls: [String],
});
const User = mongoose.model('User', userSchema);


// API route for form submission
app.post('/api/submit', async (req, res) => {
    try {
      console.log('Received request:', req.body);
      
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const { firstName, lastName, phoneNumber, email, fileUrls } = req.body;
  
      const user = new User({
        firstName,
        lastName,
        phoneNumber,
        email,
        zipCode,
        fileUrls,
      });
      await user.save();
  
      console.log('User saved:', user);
      
      const msg = {
        to: 'galleries@lakesideinc.com',
        from: 'hello@lakesideinc.com',
        subject: 'New Quote Request',
        text: `New quote request from ${firstName} ${lastName}. Contact them at ${email} or ${phoneNumber}.`,
        html: `<p>New quote request from ${firstName} ${lastName}.</p><p>Contact them at ${email} or ${phoneNumber}.</p>`,
      };
  
      // Check if there are file URLs
      if (fileUrls && fileUrls.length > 0) {
        // Modify msg to include attachments (if they exist)
        msg.attachments = fileUrls.map(url => ({
          filename: url.split("/").pop(),
          path: url,
          disposition: 'attachment',
        }));
      }
      
      // Send the email
      await sgMail.send(msg);
  
      //... rest of your code
    } catch (error) {
      //... error handling
    }
  });

  app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.path);
    next();
  });
  

  app.post('/api/hubspot/create-contact', async (req, res) => {
    try {
        const hubspotResponse = await axios.post('https://api.hubapi.com/crm/v3/objects/contacts', req.body, {
            headers: {
                'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        res.status(200).json(hubspotResponse.data);
    } catch (error) {
        console.error('Error proxying request to HubSpot:', error.response ? error.response.data : error);
        
        if (error.response && error.response.data && error.response.data.category === 'CONFLICT') {
          const existingId = error.response.data.message.match(/Existing ID: (\d+)/)[1];
          console.log("Attempting to update contact with ID:", existingId);
          
          // Update existing contact
          try {
              console.log("Update payload:", JSON.stringify(req.body, null, 2)); // Let's log the payload we're sending to HubSpot
      
              const updateResponse = await axios.patch(`https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`, req.body, {
                  headers: {
                      'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
                      'Content-Type': 'application/json'
                  }
              });
      
              console.log("Update response:", JSON.stringify(updateResponse.data, null, 2)); // Let's log the response from HubSpot after the update
      
              return res.status(200).json(updateResponse.data);
          } catch (updateError) {
              console.error('Error updating contact in HubSpot:', updateError.response ? JSON.stringify(updateError.response.data, null, 2) : updateError);
              return res.status(500).send({
                  error: 'Internal Server Error',
                  message: 'Error updating contact in HubSpot',
                  details: updateError.response ? updateError.response.data : null
              });
          }
      

        }

        res.status(500).send({
            error: 'Internal Server Error',
            message: 'Error proxying request to HubSpot',
            details: error.response ? error.response.data : null
        });
    }
});



// Create an S3 client
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2',
  signatureVersion: 'v4', // Explicitly specify to use v4 signing
});


// Endpoint to get pre-signed URL
app.post('/api/get-upload-url', async (req, res) => {
  try {
    const { contentType, filename } = req.body;

    if (!contentType || !filename) {
      return res.status(400).send({
        error: 'Bad Request',
        message: 'contentType and filename are required',
      });
    }

    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.]+/g, '_'); // Sanitize filename
    const bucket = 'lakeside-quote'; 
    const key = `quote-drawings/${sanitizedFilename}`;

    const params = {
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    };

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    res.status(200).json({ uploadUrl });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    res.status(500).send({
      error: 'Internal Server Error',
      message: 'Error generating pre-signed URL',
    });
  }
});


// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
