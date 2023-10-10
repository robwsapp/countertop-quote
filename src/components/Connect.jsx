// src/components/Connect.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Typography, Box, } from '@mui/material';
import { setUserData } from '../redux/userSlice';

// Validation schema
const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
});

const Connect = ({ setStep }) => {
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(setUserData(values));
      setStep((prevStep) => prevStep + 1);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h3" gutterBottom>Let's Connect</Typography>
        <TextField fullWidth margin="normal" label="First Name" {...formik.getFieldProps('firstName')} />
        <TextField fullWidth margin="normal" label="Last Name" {...formik.getFieldProps('lastName')} />
        <TextField fullWidth margin="normal" label="Phone Number" {...formik.getFieldProps('phoneNumber')} />
        <TextField fullWidth margin="normal" label="Email" {...formik.getFieldProps('email')} />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
      </form>
    </>
  );
};

export default Connect;
