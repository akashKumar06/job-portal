import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  appliedTo: [],
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    loadJobs(state, action) {
      state.jobs = action.payload;
    },
    userAppliedTo(state, action) {},
  },
});

const jobReducer = jobSlice.reducer;
export const { loadJobs } = jobSlice.actions;
export default jobReducer;
// export function fetchJobs(city = "", niche = "", keyword = "") {
//   return async function (dispatch) {
//     try {
//       dispatch(jobSlice.actions.requestForAllJobs());
//       let link = "http://localhost:8000/api/v1/jobs?";
//       let queryParams = [];
//       if (keyword) {
//         queryParams.push(`keyword=${keyword}`);
//       }
//       if (city) {
//         queryParams.push(`city=${city}`);
//       }
//       if (niche) {
//         queryParams.push(`niche=${niche}`);
//       }
//       link += queryParams.join("&");
//       console.log(link);
//       const res = await axios.get(link);
//       dispatch(jobSlice.actions.successForAllJobs(res.jobs));
//       dispatch(jobSlice.actions.clearAllErrors());
//     } catch (error) {
//       dispatch(jobSlice.actions.failureForAllJobs(error.response.data.message));
//     }
//   };
// }

// export function clearAllJobErrors() {
//   return function (dispatch) {
//     dispatch(jobSlice.actions.clearAllErrors());
//   };
// }

// export function resetJobSlice() {
//   return function (dispatch) {
//     dispatch(jobSlice.actions.resetJobSlice());
//   };
// }
