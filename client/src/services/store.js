import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './slices/categorySlice'

export const store = configureStore({
  reducer: {
    categories:categorySlice
  },
})