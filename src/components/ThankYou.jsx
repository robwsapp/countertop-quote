// src/components/ThankYou.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography, Box } from '@mui/material';

const ThankYou = ({ setStep }) => {
  const firstName = useSelector((state) => state.user.firstName);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Thank you, {firstName}
      </Typography>
      <Typography paragraph>
        We have received your quote request. One of our stone experts will be with you shortly.
      </Typography>
      <Typography paragraph>Do you have drawings?</Typography>
      
      <Box mt={2}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setStep(2)} 
          style={{ marginRight: '16px' }}
        >
          Yes
        </Button>
        <Button variant="outlined" color="primary" onClick={() => setStep(6)}>
          No
        </Button>
      </Box>
    </>
  );
};

export default ThankYou;




