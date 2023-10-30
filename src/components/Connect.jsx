import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Typography, Box, Snackbar, Alert, CardContent, Grid } from '@mui/material';
import { setUserData } from '../redux/userSlice';
import { createContactInHubspot } from '../utils/hubspot'; // Import the HubSpot utility
import CssBaseline from '@mui/material/CssBaseline';

// Validation schema
const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  zipCode: yup.string().required('Zip code is required'),
});

const Connect = ({ setStep }) => {
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      zipCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Update the Redux store with the user data
      dispatch(setUserData(values));

      try {
        const hubspotutk = document.cookie.split('; ').find(row => row.startsWith('hubspotutk=')).split('=')[1];
        // Create a contact in HubSpot
        await createContactInHubspot({...values, hubspotutk });
        setSeverity('success');
        setSnackbarMessage('Data stored successfully!');
      } catch (error) {
        setSeverity('error');
        setSnackbarMessage('Error creating contact in HubSpot. Please try again.');
      }

      // Proceed to the next step
      setStep((prevStep) => prevStep + 1);
      setOpenSnackbar(true);
    },
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
    <CssBaseline />
    <CardContent >
    <form onSubmit={formik.handleSubmit}>
            <Typography variant="h3" gutterBottom>Let's Connect</Typography>

            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth margin="normal" label="First Name" {...formik.getFieldProps('firstName')} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth margin="normal" label="Last Name" {...formik.getFieldProps('lastName')} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth margin="normal" label="Phone Number" {...formik.getFieldProps('phoneNumber')} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth margin="normal" label="Email" {...formik.getFieldProps('email')} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth margin="normal" label="Project Zip Code" {...formik.getFieldProps('zipCode')} />
                </Grid>
            </Grid>

            <Box mt={2}>
                <Button type="submit" variant="contained" color="primary">Next</Button>
            </Box>
        </form>
      </CardContent>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={severity} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Connect;


