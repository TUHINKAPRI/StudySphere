import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper";
import toast from "react-hot-toast";

export const signin = createAsyncThunk("signin", async (value) => {
  const res = await axiosInstance.post("/auth/signin", value);
  return res;
});

const initialState = {
  isLoading: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  error: null,
  redirectTo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
        console.log(payload.data);
        state.user=payload?.data?.user
        toast.success(payload?.data?.message);
        localStorage.setItem("token", JSON.stringify(payload?.data?.token));
        localStorage.setItem("user", JSON.stringify(payload?.data?.user));
        state.redirectTo='/'
      });
  },
});

export default authSlice.reducer;
