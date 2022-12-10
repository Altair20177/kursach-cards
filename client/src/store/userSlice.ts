import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isAuthorized: boolean;
}

const initialState: UserState = {
  isAuthorized: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    /*     changeCurrentPage(state, page) {
      state.currentPage = page.payload;
    },
    addProducts(state, products) {
      state.allProducts = products.payload;
    },
    changeAmountProductsToShow(state, amount) {
      state.amountProductsToShow = amount.payload;
    }, */
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
