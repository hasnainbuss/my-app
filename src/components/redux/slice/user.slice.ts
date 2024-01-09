import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationUser } from "../../models";

const initialUser: ApplicationUser = {};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setApplicationUser(state, action: PayloadAction<ApplicationUser>) {
      return { ...action.payload };
    },
    resetApplicationUser(state) {
      return {};
    },
  },
});

export const { setApplicationUser, resetApplicationUser } = userSlice.actions;

export default userSlice.reducer;
