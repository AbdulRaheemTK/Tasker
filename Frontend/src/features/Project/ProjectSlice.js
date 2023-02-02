import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseUrl = "http://localhost:3000";

const initialState = {
  newProject: {},
  projects: [],
};

export const addProject = createAsyncThunk(
  "project/addProject",
  async ({ projectName, allocatedTo, dueDate }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/project/addProject`, {
        projectName,
        allocatedTo,
        dueDate,
      });
      return response.data;
    } catch (error) {
      throw error.response.data.errorMessage;
    }
  }
);

export const getProjects = createAsyncThunk("project/getProjects", async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/project/getProjects`);
    return response.data;
  } catch (error) {
    throw error.response.data.errorMessage;
  }
});

const ProjectSlice = createSlice({
  name: "project",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.newProject = action.payload;
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      console.log("getProjects", action.payload);
    });
  },
});

export default ProjectSlice.reducer;
