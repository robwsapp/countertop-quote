import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Input, FormControl, FormHelperText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UploadDrawings = ({ setStep, setHasDrawings }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    // Generate URLs for previews whenever files state is updated
    const newUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(newUrls);

    // Cleanup function to revoke the object URLs
    return () => {
      newUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleFileUpload = (e) => {
    const uploadedFiles = e.target.files;
    
    if (uploadedFiles && files.length + uploadedFiles.length <= 3) {
      // Only accept image/jpeg, image/png, and application/pdf
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
  

  const handleSubmit = () => {
    if (files.length > 0) {
      setHasDrawings(true);
      setStep(3);
    } else {
      setError('Please upload a drawing before proceeding');
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>Upload Drawings</Typography>
      <Typography paragraph>Accepted formats: .jpg, .png, .pfd. Max files: 3</Typography>

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
          // Display a PDF icon or something similar
          <div style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}>
            <Typography variant="body2">PDF: {files[index].name}</Typography>
          </div>
        ) : (
          // Display the image preview
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




