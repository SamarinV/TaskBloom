import { AddItemForm } from "common/components";
import { useAppDispatch } from "common/hooks";
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types";
import { tasksThunks } from "features/TodolistsList/model/tasks.slice";
import { TodolistDomainType } from "features/TodolistsList/model/todolists.slice";
import React, { useEffect } from "react";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(function ({ todolist, tasks }: Props) {
  const dispatch = useAppDispatch();
  const todolistId = todolist.id;

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(todolistId));
  }, []);

  const addTaskCallback = (title: string) => {
    return dispatch(tasksThunks.addTask({ title, todolistId })).unwrap();
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <Tasks tasks={tasks} todolist={todolist} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons id={todolistId} filter={todolist.filter} />
      </div>
    </div>
  );
});
