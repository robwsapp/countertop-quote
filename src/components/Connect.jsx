import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Typography, Box, Snackbar, Alert, CardContent, Grid } from '@mui/material';
import { setUserData } from '../redux/userSlice';
import { createContactInHubspot } from '../utils/hubspot'; // Import the HubSpot utility
import CssBaseline from '@mui/material/CssBaseline';

// Validation schema
// Updated Validation schema with optional hyphens
const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup.string()
                 .matches(/^[2-9]{1}[0-9]{2}-?[2-9]{1}[0-9]{2}-?[0-9]{4}$/, 'Phone number must be in a valid format, with or without hyphens')
                 .required('Phone number is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  zipCode: yup.string().matches(/^\d{5}$/, 'Zip code must be a 5-digit number').required('Zip code is required'), // Updated zip code validation
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
        
        // Google Ads Conversion Tracking
        if (typeof window !== 'undefined' && window.gtag_report_conversion) {
          window.gtag_report_conversion();
        }
        
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
                    <TextField
                      fullWidth
                      margin="normal"
                      label="First Name"
                      {...formik.getFieldProps('firstName')}
                      error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                      helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Last Name"
                      {...formik.getFieldProps('lastName')}
                      error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                      helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Phone Number"
                      {...formik.getFieldProps('phoneNumber')}
                      error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                      helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Email"
                      {...formik.getFieldProps('email')}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Project Zip Code"
                      {...formik.getFieldProps('zipCode')}
                      error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                      helperText={formik.touched.zipCode && formik.errors.zipCode}
                    />
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
