import React from 'react';
import { Button, Typography, Box, CardContent } from '@mui/material';

const ChooseMeetingLocation = ({ setStep, setMeetingLocation }) => {
  const handleLocationChoice = (location) => {
    setMeetingLocation(location);
    // Set the step index based on the chosen location
    setStep(location === 'Lakeside Location' ? 5 : 8);
  };

  return (
    <>
    <CardContent>
      <Typography variant="h5" gutterBottom>My Place or Yours?</Typography>
      <Typography paragraph>Great, let's schedule a time to connect!</Typography>
      <Typography paragraph>Would you like to meet at our location or at your home?</Typography>
      </CardContent>
      
      <Box mt={2}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleLocationChoice('Lakeside Location')}
          size="large"
          style={{ marginRight: '16px' }}
        >
          Lakeside Location
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => handleLocationChoice('At My Home')}
          size="large"
        >
          At My Home
        </Button>
      </Box>
    </>
  );
};

export default ChooseMeetingLocation;



