// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    zipCode: '',
    fileUrls: [],  // Store URLs of uploaded drawings
  },
  reducers: {
    setUserData: (state, action) => {
      // Use Object.assign or spread operator to merge state
      Object.assign(state, action.payload);
  },  
    setFileUrls: (state, action) => {  // Adding new reducer for file URLs
      state.fileUrls = action.payload;
    },
  },
});

export const { setUserData, setFileUrls } = userSlice.actions;
export default userSlice.reducer;
