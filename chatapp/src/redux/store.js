import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import chatSlice from './slice/chatSlice'

export const store = configureStore({
  reducer: {
    user:userSlice,
    chat: chatSlice,
  },
})