import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './slices/categorySlice'
import authSlice from './slices/authSlice'
import courseSlice from './slices/courseSlice'
import profileSlice from './slices/profileSlice'

export const store = configureStore({
  reducer: {
    categories:categorySlice,
    auth:authSlice,
    course:courseSlice,
    profile:profileSlice
  },
})