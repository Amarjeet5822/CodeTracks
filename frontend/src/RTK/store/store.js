import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "../middleware/loggerMiddleware";
import authUserReducer from "../features/authSlice"
import githubDataReducer from "../features/githubSlice";
export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    githubData: githubDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
