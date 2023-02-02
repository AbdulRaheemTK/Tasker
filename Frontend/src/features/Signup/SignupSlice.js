import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3000";

const initialState = {};

export const signupRequest = createAsyncThunk(
  "user/signup",
  async ({ fullName, email, password, department }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/user/signup`, {
        fullName,
        email,
        password,
        department,
      });
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error.response.data.errorMessage;
    }
  }
);

const SignupSlice = createSlice({
  name: "signup",
  initialState,
  //   extraReducers: (builder) => {
  //     builder.addCase(signupRequest.fulfilled, (state, action) => {
  //       state.notification = "User Signedup Succcessfully!";
  //       state.notificationSeverity = "success";
  //     });
  //     builder.addCase(signupRequest.rejected, (state, action) => {
  //       console.log("action", action);
  //       state.notification = action.error.message;
  //       state.notificationSeverity = "error";
  //     });
  //   },
});

export default SignupSlice.reducer;
