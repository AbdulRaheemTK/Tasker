import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/Login/LoginSlice";
import signupReducer from "../features/Signup/SignupSlice";
import homeReducer from "../features/Home/HomeSlice";
import projectReducer from "../features/Project/ProjectSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    home: homeReducer,
    project: projectReducer,
  },
});

export default store;
