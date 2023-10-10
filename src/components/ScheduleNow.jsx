// src/components/ScheduleNow.js

import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const ScheduleNow = ({ setStep }) => {
  // Calendly link - replace with your actual Calendly link
  const calendlyLink = "https://calendly.com/lakeside-surfaces/in-home-design-consultation";

  return (
   <>
      <Typography variant="h5" gutterBottom>Schedule Now!</Typography>
      <Typography paragraph>Great, let's schedule a time to connect!</Typography>
      
      <Box mt={2}>
        <Button 
          variant="contained" 
          color="primary" 
          href={calendlyLink} 
          target="_blank" 
          rel="noopener noreferrer"
          size="large"
        >
          Schedule In-Home Consultation
        </Button>
      </Box>
    </>
  );
};

export default ScheduleNow;



