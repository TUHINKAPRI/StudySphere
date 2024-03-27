import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper";
import toast from "react-hot-toast";

export const signin = createAsyncThunk("signin", async (value) => {
  const res = await axiosInstance.post("/auth/signin", value);
  return res;
});

export const signup = createAsyncThunk("signup", async (value) => {
  const res = await axiosInstance.post("/auth/signup", value);
  return res;
});

export const getOtp = createAsyncThunk("getOtp", async (value) => {
  const res = await axiosInstance.post("/auth/send-otp", value);
  return res;
});




const initialState = {
  isLoading: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  error: null,
  redirectTo: null,
  userFormData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserFormData: (state, { payload }) => {
      state.userFormData = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (!payload?.data?.success) {
          state.error = payload?.data?.message;
          toast.error(payload?.data?.message);
          return;
        }
        state.user = payload?.data?.user;
        toast.success(payload?.data?.message);
        localStorage.setItem("token", JSON.stringify(payload?.data?.token));
        localStorage.setItem("user", JSON.stringify(payload?.data?.user));
        state.redirectTo = "/";
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.redirectTo = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (!payload?.data.success) {
          toast.error(payload?.data?.message);
          return;
        }
        toast.success(payload?.data?.message);
        state.redirectTo = "/signin";
      })
      .addCase(getOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.redirectTo = null;
      })
      .addCase(getOtp.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.redirectTo = "/verify-otp";
        if (payload?.data?.success) {
          toast.success(payload?.data?.message);
        } else {
          toast.error(payload?.data?.message);
        }
      })
      
  },
});

export default authSlice.reducer;

export const { getUserFormData } = authSlice.actions;
