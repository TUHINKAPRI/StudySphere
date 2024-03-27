import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper";
import toast from "react-hot-toast";

export const updateProfile = createAsyncThunk("updateProfile", async (data) => {
  return await axiosInstance.put("/profile/update-profile", data);
});

export const fetchProfileDetails = createAsyncThunk(
  "fetchProfileDetails",
  async () => {
    return await axiosInstance.get("/profile/get-profile-details");
  }
);

export const updateProfilePicture = createAsyncThunk(
  "updateProfilePicture",
  async (data) => {
    return axiosInstance.put("/profile/update-profile-picture", data);
  }
);

const initialState = {
  isLoading: false,
  profileData: null,
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
        if (payload?.data?.success) {
          toast.success(payload?.data?.message);
        }
      })
      .addCase(fetchProfileDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload?.data?.success) {
          state.profileData = payload?.data?.data[0];
        }
      })
      .addCase(updateProfilePicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfilePicture.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if(payload?.data?.success){
          toast.success(payload?.data?.message);
        }
        localStorage.setItem('user',JSON.stringify(payload?.data?.data))
      });
  },
});

export default profileSlice.reducer;
