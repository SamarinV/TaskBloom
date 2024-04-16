import { createSlice, isFulfilled, isPending, isRejected, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { tasksThunks } from "features/TodolistsList/model/tasks.slice";
import { todolistsThunks } from "features/TodolistsList/model/todolists.slice";
import { authThunks } from "features/auth/model/auth.slice";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(isPending, (state, action) => {
      state.status = "loading";
    });
    builder.addMatcher(isFulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addMatcher(isRejected, (state, action: any) => {
      state.status = "failed";
			debugger;
      if (action.payload) {
        if (
          action.type === todolistsThunks.addTodolist.rejected.type ||
          tasksThunks.addTask.rejected.type ||
          authThunks.initializeApp.rejected.type
        ) {
          return;
        }
        state.error = action.payload.messages[0];
      } else {
        state.error = action.error.message ? action.error.message : "Some error occured";
      }
    });
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
