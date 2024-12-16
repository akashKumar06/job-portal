import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  jobsApplied: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;

      state.user = action.payload.user;
    },
    logout(state, action) {
      state.isAuthenticated = false;
      state.user = null;
    },
    loadJobsApplied(state, action) {
      state.jobsApplied = action.payload;
    },
    applyJob(state, action) {
      state.jobsApplied.push(action.payload);
    },
  },
});

const userReducer = userSlice.reducer;
export const { login, logout, loadJobsApplied, applyJob } = userSlice.actions;
export default userReducer;
