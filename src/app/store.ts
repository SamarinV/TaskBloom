import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "app/app.reducer";
import { tasksReducer } from "features/TodolistsList/model/tasks.slice";
import { todolistsReducer } from "features/TodolistsList/model/todolists.slice";
import { authReducer } from "features/auth/model/auth.slice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
