
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BE_URL } from "../store/links";

console.log("api backend", BE_URL); // check the api link
// First, create the thunk ( Login User)
export const loginUser = createAsyncThunk(
  "authUser/loginUser",
  async ({ password, email }, { rejectWithValue }) => {
    console.log("email-password", email, password); // check the email and password
    try {
      const response = await axios.post(
        `${BE_URL}/api/auth/login`,
        { password, email },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed Login!");
    }
  }
);
// First, create the thunk ( Register User)
export const registerUser = createAsyncThunk(
  "authUser/registerUser",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BE_URL}/api/auth/signup`,
        { password, email, name },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed - Register!");
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "authUser/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BE_URL}/logout`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed logout!");
    }
  }
);

// Get User Status
export const getUserStatus = createAsyncThunk(
  "authUser/getUserStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BE_URL}/api/auth/status`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "failed to get User Status!"
      );
    }
  }
);
const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  message: null,
};

// getUserStatus | loginUser | logoutUser | registerUser
const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setGitHubIsAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // Handle Pending State
    const handlePending = (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    };
    // Handle rejected state
    const handleRejected = (state, action) => {
      console.log("action.paylaod (handleRejected) :", action.payload);
      state.loading = false;
      state.message = null;
      state.error = action.payload?.data;
    };
    // Login builder
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(loginUser.rejected, handleRejected);

    // Logout builder
    builder
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.isAuthenticated = action.payload?.isAuthenticated;
      })
      .addCase(logoutUser.rejected, handleRejected);

    // get User Status
    builder
      .addCase(getUserStatus.pending, handlePending)
      .addCase(getUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload?.isAuthenticated;
        state.message = action.payload?.message;
      })
      .addCase(getUserStatus.rejected, handleRejected);

    // Register User
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("action.paylaod (insideFulfilled) ", action.payload);
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(registerUser.rejected, handleRejected);
  },
});
export const { setGitHubIsAuthenticated } = authUserSlice.actions;
export default authUserSlice.reducer;
