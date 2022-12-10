import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    /*     products: cartSlice,
    catalog: catalogSlice, */
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
