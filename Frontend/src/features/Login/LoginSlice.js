import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3000";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || "",
};

export const loginRequest = createAsyncThunk(
  "user/loginRequets",
  async ({ email, password }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/user/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data.errorMessage;
    }
  }
);

export const updateLoggedInUserData = createAsyncThunk(
  "user/updateLoggedInUserData",
  async ({ userId, email, fullName, department, imgUrl }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/user/updateUser/${userId}`,
        {
          email,
          fullName,
          department,
          imgUrl,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data.errorMessage;
    }
  }
);

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = "";
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.token));
      state.user = action.payload;
    });
    builder.addCase(updateLoggedInUserData.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default LoginSlice.reducer;
export const LoginSliceActions = LoginSlice.actions;
