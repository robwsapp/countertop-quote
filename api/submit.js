import mongoose from 'mongoose';
import sgMail from '@sendgrid/mail';

// Define User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  fileUrls: [String],  // To store file URLs
});
const User = mongoose.model('User', userSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Set API Key for SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Destructure data from request body
    const { firstName, lastName, phoneNumber, email, fileUrls } = req.body;

    // Create a new user entry
    const user = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      fileUrls,  // Save file URLs to MongoDB
    });

    // Save the user entry to MongoDB
    await user.save();

    // Define email message
    const msg = {
      to: 'galleries@lakesideinc.com',
      from: 'noreply@lakesideinc.com',
      subject: 'New Quote Request',
      text: `New quote request from ${firstName} ${lastName}. Contact them at ${email} or ${phoneNumber}.`,
      // Optionally, you could include HTML content in the email message
      html: `<p>New quote request from ${firstName} ${lastName}.</p><p>Contact them at ${email} or ${phoneNumber}.</p>`
    };

    // Send email via SendGrid
    await sgMail.send(msg);

    // Respond with success message
    res.status(200).send({ message: 'Quote request submitted successfully' });
  } catch (error) {
    // Log error and send error response
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  } finally {
    // Close MongoDB connection
    await mongoose.connection.close();
  }
}
