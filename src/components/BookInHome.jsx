import React from 'react';
import { Typography, Button, Box } from '@mui/material';


const BookInHome = () => {
  // Replace with your actual Calendly link
  const calendlyLink = "https://calendly.com/lakeside-surfaces/in-home-design-consultation";

  return (
    
      <>
        <Typography variant="h5" gutterBottom>Book Your In-Home Appointment</Typography>
        
        <Box mt={2} textAlign="center">
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

export default BookInHome;



