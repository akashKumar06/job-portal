import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [],
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    loadApplications(state, action) {
      state.applications = action.payload;
    },
    apply(state, action) {
      state.applications.push(action.payload);
    },
  },
});

export const { loadApplications, apply } = applicationSlice.actions;
const applicationReducer = applicationSlice.reducer;
export default applicationReducer;
