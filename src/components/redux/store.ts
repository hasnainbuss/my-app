import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice";
import themeOptionsReducer from "./slice/themeOptions.slice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    themeOptions: themeOptionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
