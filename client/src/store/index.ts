import userSlice from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";
import categoiesSlice from "./categoiesSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    categories: categoiesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
