import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types";
import { tasksThunks } from "features/TodolistsList/model/tasks.slice";
import { useAppDispatch } from "common/hooks";

type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo(({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch();

  const removeTaskHandler = () => {
    dispatch(tasksThunks.removeTask({ taskId: task.id, todolistId: todolistId }));
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newIsDoneValue = e.currentTarget.checked;
    const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(
      tasksThunks.updateTask({
        taskId: task.id,
        domainModel: { status },
        todolistId: todolistId,
      }),
    );
  };

  const changeTaskTitleHandler = (title: string) => {
    dispatch(
      tasksThunks.updateTask({
        taskId: task.id,
        domainModel: { title },
        todolistId: todolistId,
      }),
    );
  };

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeTaskStatusHandler} />

      <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
