import { createSlice } from "@reduxjs/toolkit";
import { CategoryTypeFetch } from "../types";

interface CategoriesState {
  categories: CategoryTypeFetch[];
}

const initialState: CategoriesState = {
  categories: [],
};

export const categoiesSlice = createSlice({
  name: "categoiesSlice",
  initialState,
  reducers: {
    setAllCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const { setAllCategories } = categoiesSlice.actions;

export default categoiesSlice.reducer;
