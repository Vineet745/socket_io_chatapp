import {createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import axios from 'axios';


export const userSlice = createSlice({
  name: 'user',
  initialState: {user: null, Allusers: [], isLoading: false, isError: false},
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    loginUser: (state, action) => {
      state.user = action.payload;
    },
  },

  
});

export const {getUser,loginUser} = userSlice.actions;
export default userSlice.reducer;
