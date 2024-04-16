import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { EditableSpan } from "common/components";
import { useAppDispatch } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists.slice";
import React from "react";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();
  const removeTodolistCallback = () => {
    dispatch(todolistsThunks.removeTodolist(todolist.id));
  };

  const changeTodolistTitleCallback = (title: string) => {
    dispatch(todolistsThunks.changeTodolistTitle({ id: todolist.id, title }));
  };
  return (
    <h3>
      <EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback} />
      <IconButton onClick={removeTodolistCallback} disabled={todolist.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};
