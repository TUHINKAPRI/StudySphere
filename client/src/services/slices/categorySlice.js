import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper";

export const fetchAllCategory = createAsyncThunk("fetchCategory", async () => {
  try {
    const res = await axiosInstance.get("/course/getAllCategory");
    return res?.data;
  } catch (err) {
    return err;
  }
});

const initialState = {
  isLoading: false,
  categories: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = payload.categories;
      });
  },
});

export default categorySlice.reducer;
