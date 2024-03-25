import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper";

export const fetchCourseDetails = createAsyncThunk(
  "fetchCourseDetails",
  async (id) => {
    return await axiosInstance.get(`/course/getSingleCourse/${id}`);
  }
);

const initialState = {
  isLoading: false,
  courseDetails: null,
};

const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload?.data?.success) {
          state.courseDetails = payload?.data?.course;
        }
      });
  },
});

export default courseSlice.reducer;
