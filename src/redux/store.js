import { configureStore } from "@reduxjs/toolkit";
import shishaReducer from "./shishaSlice";

export const store = configureStore({
  reducer: {
    shisha: shishaReducer,
  },
});
