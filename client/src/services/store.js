import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './slices/categorySlice'
import authSlice from './slices/authSlice'

export const store = configureStore({
  reducer: {
    categories:categorySlice,
    auth:authSlice
  },
})