import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./cardsSlice";
import userSlice from "./userSlice";
import categoiesSlice from "./categoiesSlice";
import { categoryApi } from "./categoryApi";
import { cardApi } from "./cardApi";
import { newsApi } from "./newsApi";
import { userApi } from "./userApi";
import { organizationApi } from "./organizationApi";

export const store = configureStore({
  reducer: combineReducers({
    user: userSlice,
    categories: categoiesSlice,
    cards: cardsSlice,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [cardApi.reducerPath]: cardApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
  }),
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      categoryApi.middleware,
      cardApi.middleware,
      newsApi.middleware,
      userApi.middleware,
      organizationApi.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
