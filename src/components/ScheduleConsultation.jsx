// src/components/ScheduleConsultation.js

import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const ScheduleConsultation = ({ setStep }) => {  
  return (
   <>
      <Typography variant="h5" gutterBottom>Schedule Free Consultation</Typography>
      <Typography paragraph>
        The first step in getting your estimate is measuring your space! 
        Schedule a free consultation now!
      </Typography>
      
      <Box mt={2}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setStep(7)}
        >
          Schedule Consultation
        </Button>
      </Box>
      </>
  );
};

export default ScheduleConsultation;


