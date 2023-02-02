import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3000";

const initialState = {
  users: [],
};

export const getUsersData = createAsyncThunk("home/getUsersData", async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/users`);
    return response.data;
  } catch (error) {
    throw error.response.data.errorMessage;
  }
});

const HomeSlice = createSlice({
  name: "home",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUsersData.fulfilled, (state, action) => {
      console.log(action);
      state.users = action.payload;
    });
    //   builder.addCase(loginRequest.rejected, (state, action) => {
    //     console.log("action", action);
    //     state.notification = action.error.message;
    //     state.notificationSeverity = "error";
    //   });
  },
});

export default HomeSlice.reducer;
