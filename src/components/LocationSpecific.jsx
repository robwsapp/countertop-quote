import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const LocationSpecific = ({ locationName }) => {
  // Replace these URLs with your actual Calendly URLs
  const calendlyLinks = {
    Kentwood: "https://calendly.com/lakeside-surfaces/kentwood-gallery-free-design-consultation",
    Muskegon: "https://calendly.com/lakeside-surfaces/muskegon-gallery-free-design-consultation",
    TraverseCity: "https://calendly.com/lakeside-surfaces/traverse-city-gallery-free-design-consultation",
    Brighton: "https://calendly.com/lakeside-surfaces/brighton-gallery-free-design-consultation",
    // Add more locations as needed
  };

  // Get the appropriate Calendly link for the current location
  const calendlyLink = calendlyLinks[locationName];

  return (
    <>
      <Typography variant="h5" gutterBottom>Book Your Appointment at {locationName}</Typography>
      <Typography paragraph>
        Click the button below to schedule your appointment at our {locationName} location.
      </Typography>
      <Box mt={2}>
        <Button 
          variant="contained" 
          color="primary" 
          href={calendlyLink} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Schedule at {locationName}
        </Button>
      </Box>
      </>
  );
};

export default LocationSpecific;





