import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import '../App.css'


const ChooseLocation = ({ setStep }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>Choose Your Location</Typography>
      <Typography variant='body2'  >What location would you like to book at?</Typography>
      
      <Box mt={2} display="flex" flexDirection="column" alignItems= 'center' gap={2}>
      
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setStep(10)}
          fullWidth
          size="large"
          startIcon={<WorkspacePremiumRoundedIcon />}
          endIcon={<WorkspacePremiumRoundedIcon />}
          className="glowingButton"
          style={{
            padding: '16px 32px', 
            color: '#FFFFFF', 
            boxShadow: '0px 9px 30px rgb(27, 117, 188, 0.6)',
        }}        
        >
          <Typography fontWeight={700} >Kentwood - Flagship Gallery Experience</Typography>
        </Button>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setStep(11)}
          size="small"
          style={{ minWidth: '80%', maxWidth: 'auto', padding: '12px' }}
        >
          Muskegon
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setStep(12)}
          size="small"
          style={{ minWidth: '75%', maxWidth: 'auto', padding: '10px'}}
        >
          Traverse City
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setStep(13)}
          size="small"
          style={{ minWidth: '75%', maxWidth: 'auto', padding: '10px'}}
        >
          Brighton
        </Button>
      </Box>
    </>
  );
};

export default ChooseLocation;



