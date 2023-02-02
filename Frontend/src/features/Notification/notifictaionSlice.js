import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: "",
  notificationSeverity: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    setNotificationSeverity: (state, action) => {
      state.notificationSeverity = action.payload;
    },
  },
});

export default notificationSlice.reducer;
export const { setNotification, setNotificationSeverity } =
  notificationSlice.actions;
