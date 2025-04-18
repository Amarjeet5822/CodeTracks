import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "../middleware/loggerMiddleware";

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
