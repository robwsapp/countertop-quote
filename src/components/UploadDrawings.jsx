import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Input, FormControl, FormHelperText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'; 
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setFileUrls } from '../redux/userSlice';
import CssBaseline from '@mui/material/CssBaseline';

const UploadDrawings = ({ setStep, setHasDrawings }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [previewUrls, setPreviewUrls] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);

  useEffect(() => {
    const newUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(newUrls);

    return () => {
      newUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleFileUpload = (e) => {
    const uploadedFiles = e.target.files;

    if (uploadedFiles && files.length + uploadedFiles.length <= 3) {
      const validFiles = Array.from(uploadedFiles).filter(file => 
        ["image/jpeg", "image/png", "application/pdf"].includes(file.type)
      );
  
      if (validFiles.length > 0) {
        setFiles(prevFiles => [...prevFiles, ...validFiles]);
        setError('');
      } else {
        setError('Please upload valid image files (JPEG, PNG) or PDFs');
      }
    } else {
      setError('You can upload up to 3 images');
    }
  };

  const uploadToS3 = async (file) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/get-upload-url`, {
        contentType: file.type,
        filename: file.name,
      });

      const { uploadUrl } = response.data;

      await axios.put(uploadUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
      return uploadUrl.split("?")[0]; 
    } catch (error) {
      console.error('File upload error:', error.response ? error.response.data : error);
      setError('File upload failed, please try again.');
      
    }
  };

  const handleSubmit = async () => {
    if (files.length > 0) {
      try {
        const uploadedFileUrls = await Promise.all(files.map(file => uploadToS3(file)));
        setHasDrawings(true);
        setStep(3);
        dispatch(setFileUrls(uploadedFileUrls)); 

        const combinedData = {
          ...userData,
          fileUrls: uploadedFileUrls,
        };
        
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/submit`, combinedData);

        if (response.status === 200) {
          console.log('Data submitted successfully:', response.data);
          setHasDrawings(true);
          setStep(3); 
        } else {
          console.error('Data submission failed:', response.data);
          setError('Data submission failed. Please try again later.');
        }

        
      } catch (error) {
        console.error('Error in data submission:', error);
        setError('Data submission failed. Please try again later.');
      }
    } else {
      setError('Please upload a drawing before proceeding');
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };
  

  return (
    <>
    <CssBaseline />
      <Typography variant="h5" gutterBottom>Upload Drawings</Typography>
      <Typography paragraph>Accepted formats: .jpg, .png, .pdf. Max files: 3</Typography>

      <FormControl error={Boolean(error)} fullWidth>
        <Input 
          type="file" 
          onChange={handleFileUpload}
          disableUnderline
          inputProps={{ accept: ".jpeg, .jpg, .png, .pdf", multiple: true }}
          style={{ margin: '20px 0', display: 'inline-block', verticalAlign: 'middle', }}
        />
        <FormHelperText>{error}</FormHelperText>
      </FormControl>

      <Box mt={2}>
        {previewUrls.map((url, index) => (
          <Box key={index} mt={1} mb={1}>
            {files[index] ? (
              files[index].type === "application/pdf" ? (
                <div style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}>
                  <Typography variant="body2">PDF: {files[index].name}</Typography>
                </div>
              ) : (
                <img 
                  src={url} 
                  alt={`Preview ${index + 1}`} 
                  style={{ width: '100px', marginRight: '8px', verticalAlign: 'middle' }}
                />
              )
            ) : null}
            <IconButton onClick={() => removeFile(index)} size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {files.length > 0 ? 'Submit' : 'Choose files to upload'}
        </Button>
      </Box>
    </>
  );
};

export default UploadDrawings;
