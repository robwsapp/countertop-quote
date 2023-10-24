// /api/get-upload-url.js

import { S3 } from 'aws-sdk';

// Instantiate an S3 client
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1', // or your preferred region
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method Not Allowed', message: 'Only POST requests allowed' });
  }

  try {
    const { contentType, filename } = req.body;

    // Ensure contentType and filename are defined
    if (!contentType || !filename) {
      return res.status(400).send({ error: 'Bad Request', message: 'contentType and filename are required' });
    }

    // Define the S3 bucket and key (file name)
    const bucket = 'YOUR_S3_BUCKET_NAME';
    const key = `uploads/${filename}`;

    // Define S3 put parameters
    const params = {
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
      // Optionally add more S3 put parameters here
    };

    // Generate a pre-signed URL for putObject
    const uploadUrl = s3.getSignedUrlPromise('putObject', params);

    // Return the pre-signed URL
    res.status(200).json({ uploadUrl });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    res.status(500).send({ error: 'Internal Server Error', message: 'Error generating pre-signed URL' });
  }
}
