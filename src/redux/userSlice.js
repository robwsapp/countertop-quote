// src/redux/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    // Add any other user data fields here
  },
  reducers: {
    setUserData: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phoneNumber = action.payload.phoneNumber;
      state.email = action.payload.email;
      // Add any other user data fields here
    },
    // You may define additional reducers here if needed
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
