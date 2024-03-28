import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper";
import toast from "react-hot-toast";

export const fetchCourseDetails = createAsyncThunk(
  "fetchCourseDetails",
  async (id) => {
    return await axiosInstance.get(`/course/getSingleCourse/${id}`);
  }
);

export const fetchInstructorCourse = createAsyncThunk(
  "fetchInstructorCourse",
  async () => {
    return axiosInstance.get(`/course/getInstructorCourses`);
  }
);

const initialState = {
  isLoading: false,
  courseDetails: null,
  courses: [],
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
      })
      .addCase(fetchInstructorCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInstructorCourse.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (!payload?.data?.success) {
          toast.error(payload?.data?.message);
          return;
        }
        state.courses = payload?.data?.courses;
      });
  },
});

export default courseSlice.reducer;
