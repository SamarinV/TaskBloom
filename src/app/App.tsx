import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { selectAppStatus, selectIsInitialized } from "app/app.selectors";
import { ErrorSnackbar } from "common/components";
import { useAppDispatch } from "common/hooks";
import { TodolistsList } from "features/TodolistsList/ui/TodolistsList";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { authThunks } from "features/auth/model/auth.slice";
import { Login } from "features/auth/ui/Login";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunks.initializeApp());
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(authThunks.logout());
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h6">TaskBloom</Typography>
            {isLoggedIn && (
              <Button color="inherit" onClick={logoutHandler}>
                Log out
              </Button>
            )}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodolistsList />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
