import { createSlice } from "@reduxjs/toolkit";
import { CardType } from "../types";

interface CardState {
  allCards: CardType[];
}

const initialState: CardState = {
  allCards: [],
};

export const cardsSlice = createSlice({
  name: "cardsSlice",
  initialState,
  reducers: {
    setAllCards(state, action) {
      state.allCards = action.payload;
    },
  },
});

export const { setAllCards } = cardsSlice.actions;

export default cardsSlice.reducer;
