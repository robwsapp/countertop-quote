import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const MeetAfterDrawings = ({ setStep, setWantsToMeet }) => {
  const handleYesClick = () => {
    setWantsToMeet(true); // User wants to meet
    setStep(4); // Navigate to the next step
  };

  const handleNoClick = () => {
    setWantsToMeet(false); // User doesn't want to meet
    setStep(9); // Navigate to the alternative step
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>We have your drawings! Now, Let's Meet!</Typography>
      <Typography paragraph>
        Thank you for submitting your drawing! Would you like to meet in person to discuss your project?
      </Typography>
      
      <Box mt={2}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleYesClick}
          style={{ marginRight: '16px' }}
        >
          Yes
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleNoClick}
        >
          No
        </Button>
      </Box>
    </>
  );
};

export default MeetAfterDrawings;



