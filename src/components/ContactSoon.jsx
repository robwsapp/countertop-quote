import React from 'react';
import { Typography, Box } from '@mui/material';

const ContactSoon = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>We will be in contact!</Typography>
      <Typography variant='subtitle1'>
        Thank you for reaching out! One of our stone experts will be in contact with you within 2 business days.
      </Typography>
        
      <Box mt={2}>
        <Typography color="primary">
          We appreciate your interest and look forward to assisting you!
        </Typography>
      </Box>
    </> 
  );
};

export default ContactSoon;




