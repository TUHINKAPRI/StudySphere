import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper";

export const fetchAllCategory = createAsyncThunk("fetchCategory", async () => {
  const res = await axiosInstance.get("/course/getAllCategory");
  return res;
});

export const fetchCategoryCourse = createAsyncThunk(
  "fetchCategoryCourse",
  async (value) => {
    return await axiosInstance.get(`/course/?category=${value.id}`);
  }
);
const initialState = {
  isLoading: false,
  categories: [],
  categoriesCourse:[],
  singleCourse:null
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
        state.categories = payload?.data?.categories;
      })
      .addCase(fetchCategoryCourse.pending,(state)=>{
        state.isLoading=true;
      })
      .addCase(fetchCategoryCourse.fulfilled,(state,{payload})=>{
        state.isLoading=false;
        console.log(payload)
        state.categoriesCourse=payload?.data?.course
      })
  },
});

export default categorySlice.reducer;
