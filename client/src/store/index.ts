import cardsSlice from "./cardsSlice";
import userSlice from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";
import categoiesSlice from "./categoiesSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    categories: categoiesSlice,
    cards: cardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
