import {createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  try {
    const response = await axios.get('http://192.168.35.203:3000/api/alluser');
    console.log(response,"response")
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
});

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

  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false, 
      state.Allusers = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false, 
      state.isError = true;
    });
  },
});

export const {getUse,loginUser} = userSlice.actions;
export default userSlice.reducer;
