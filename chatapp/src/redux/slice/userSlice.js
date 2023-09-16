import {createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import axios from 'axios';


export const userSlice = createSlice({
  name: 'user',
  initialState: {userId: null, Allusers: [], isLoading: false, isError: false},
  reducers: {
    registerUser: (state, action) => {
      state.userId = action.payload;
    },
    loginUser: (state, action) => {
      state.userId = action.payload;
    },
  },

  
});

export const {registerUser,loginUser} = userSlice.actions;
export default userSlice.reducer;
