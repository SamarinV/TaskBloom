import React from "react";
import { Button } from "@mui/material";
import { FilterValuesType, todolistsActions } from "features/TodolistsList/model/todolists.slice";
import { useAppDispatch } from "common/hooks";

type Props = {
  filter: string;
  id: string;
};

export const FilterTasksButtons = ({ filter, id }: Props) => {
  const dispatch = useAppDispatch();
  const { changeTodolistFilter } = todolistsActions;

  const changeFilterHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilter({ filter, id }));
  };
  return (
    <>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => changeFilterHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => changeFilterHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => changeFilterHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  );
};
