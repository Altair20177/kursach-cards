import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isAuthorized: boolean;
  userData: {
    email: string;
    userRole: 'admin' | 'user' | 'superAdmin';
    id: string;
  } | null;
}

const initialState: UserState = {
  isAuthorized: false,
  userData: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    authorizeUser(state, action) {
      state.isAuthorized = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const { authorizeUser, setUserData } = userSlice.actions;

export default userSlice.reducer;
