import React from "react";
import { Task } from "./Task/Task";
import { TodolistDomainType } from "features/TodolistsList/model/todolists.slice";
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types";
import { TaskStatuses } from "common/enums";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Tasks = ({ todolist, tasks }: Props) => {
  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  return (
    <>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={todolist.id} />
      ))}
    </>
  );
};
