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
    applicationDelete(state, action) {
      state.applications = state.applications.filter(
        (application) => application._id !== action.payload
      );
    },
  },
});

export const { loadApplications, apply, applicationDelete } =
  applicationSlice.actions;
const applicationReducer = applicationSlice.reducer;
export default applicationReducer;
