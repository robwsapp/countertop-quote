import React from 'react';
import { Typography, Box, CardContent } from '@mui/material';
import { useCalendlyEventListener, InlineWidget } from 'react-calendly';

const LocationSpecific = ({ locationName }) => {
  
  const calendlyLinks = {
    Kentwood: "https://calendly.com/lakeside-surfaces/kentwood-gallery-free-design-consultation",
    Muskegon: "https://calendly.com/lakeside-surfaces/muskegon-gallery-free-design-consultation",
    TraverseCity: "https://calendly.com/lakeside-surfaces/traverse-city-gallery-free-design-consultation",
    Brighton: "https://calendly.com/lakeside-surfaces/brighton-gallery-free-design-consultation",
    // Add more locations as needed
  };

  // Get the appropriate Calendly link for the current location
  const calendlyLink = calendlyLinks[locationName];

  // Set up Calendly event listeners
  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => console.log(e.data.payload),
  });

  return (
    <>
      <CardContent>
        <Typography variant="h5" gutterBottom>Book Your Appointment at {locationName}</Typography>
        <Typography paragraph>
          Schedule your appointment at our <strong>{locationName}</strong> location below:
        </Typography>
        
          <InlineWidget 
            url={calendlyLink}
            pageSettings={{
              backgroundColor: 'ffffff',
              hideEventTypeDetails: true,
              hideLandingPageDetails: false,
              primaryColor: '00a2ff',
              textColor: '4d5055'
            }}
          />
        
      </CardContent>
    </>
  );
};

export default LocationSpecific;






