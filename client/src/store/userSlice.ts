import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export type UserRole = "admin" | "user" | "superAdmin";

interface UserState {
  isAuthorized: boolean;
  userData: {
    email: string;
    userRole: UserRole;
    id: string;
  } | null;
}

const initialState: UserState = {
  isAuthorized: false,
  userData:
    (JSON.parse(localStorage.getItem("userData")!) as UserState["userData"]) ||
    null,
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
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
  },
});

export const { authorizeUser, setUserData } = userSlice.actions;

export const getUserRole = (state: RootState): UserRole =>
  state.user.userData?.userRole;

export default userSlice.reducer;
