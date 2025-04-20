import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BE_URL } from "../store/links";

// Async thunk to fetch all stocks
export const fetchGithubData = createAsyncThunk(
  "stocks/fetchGithubData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BE_URL}/api/github-data`,
        { withCredentials: true } 
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const githubDataSlice = createSlice({
  name: "githubData",
  initialState: {
    userDetails: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = "loading";
      state.error = null;
    };
    
    const handleRejected = (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    };
    // get the Stocks
    builder
      .addCase(fetchGithubData.pending, handlePending)
      .addCase(fetchGithubData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetails = action.payload;
        console.log("Github data fetched successfully: action.payload = ", action.payload);
      })
      .addCase(fetchGithubData.rejected, handleRejected);
  }
});

export default githubDataSlice.reducer;
