import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { message } from "antd";
import { RootState } from "../store";
import {
  GetThemeOptions,
  PutThemeOption,
} from "../../../apiHandler/ThemeOptions";
import { HandleApiError } from "../../../common/errorUtils";
import { ThemeOptionsModel } from "../../models/ThemeOptionsModel";

const themeOptionsAdapter = createEntityAdapter<ThemeOptionsModel>({
  // selectId: (themeOptions) => themeOptions.themeColor,
  // selectId: (themeOptions) => themeOptions.id,
});

export const getAllThemeOptionsAsync = createAsyncThunk(
  "themeOptionss/getAll",
  async () => {
    const defaultTheme: ThemeOptionsModel = await GetThemeOptions();
    return defaultTheme;
  }
);

export const updateThemeOptionsAsync = createAsyncThunk(
  "themeOptionss/update",
  async (themeOptions: ThemeOptionsModel, { rejectWithValue }) => {
    try {
      const updatedThemeOptions = await PutThemeOption(themeOptions);
      return updatedThemeOptions;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const themeOptionsSlice = createSlice({
  name: "themeOptionss",
  initialState: themeOptionsAdapter.getInitialState({
    isLoading: false,
    error: "",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllThemeOptionsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllThemeOptionsAsync.fulfilled,
        (state, action: PayloadAction<ThemeOptionsModel>) => {
          state.isLoading = false;
          themeOptionsAdapter.setAll(state, [action.payload]);
        }
      )
      .addCase(getAllThemeOptionsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ? action.error.message : "";
        if (action.payload) {
          HandleApiError(action.payload);
        }
      })
      .addCase(updateThemeOptionsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateThemeOptionsAsync.fulfilled,
        (state, action: PayloadAction<ThemeOptionsModel>) => {
          state.isLoading = false;
          themeOptionsAdapter.updateOne(state, {
            id: action.payload.id, // Using themeColor as the id
            changes: action.payload,
          });
          message.success("ThemeOptions Updated!");
        }
      )
      .addCase(updateThemeOptionsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ? action.error.message : "";
        if (action.payload) {
          HandleApiError(action.payload);
        }
      });
  },
});

export const themeOptionsSelectors =
  themeOptionsAdapter.getSelectors<RootState>((store) => store.themeOptions);

export default themeOptionsSlice.reducer;
