import { PayloadAction, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { appActions } from "app/app.reducer";
import { clearTasksAndTodolists } from "common/actions";
import { createAppAsyncThunk } from "common/utils";
import { LoginParamsType, authAPI } from "features/auth/api/auth.api";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    captcha: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isFulfilled(authThunks.login, authThunks.logout, authThunks.initializeApp),
        (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      );
  },
});

// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  `${slice.name}/login`,
  async (arg, { rejectWithValue }) => {
    const res = await authAPI.login(arg);
    if (res.data.resultCode === 0) {
			localStorage.setItem("sn-token", res.data.data.token);
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(res.data);
    }
  },
);

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/logout`,
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authAPI.logout();
    if (res.data.resultCode === 0) {
      dispatch(clearTasksAndTodolists());
			localStorage.clear();
      return { isLoggedIn: false };
    } else {
      return rejectWithValue(res.data);
    }
  },
);

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/initializeApp`,
  async (_, { rejectWithValue, dispatch }) => {
    const res = await authAPI.me().finally(() => {
      dispatch(appActions.setAppInitialized({ isInitialized: true }));
    });
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(res.data);
    }
  },
);

export const authReducer = slice.reducer;
export const authThunks = { login, logout, initializeApp };
