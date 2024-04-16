// import { TaskPriorities, TaskStatuses } from "common/enums";
// import { tasksActions, tasksReducer, TasksStateType, tasksThunks } from "features/TodolistsList/model/tasks.slice";
// import { todolistsActions, todolistsThunks } from "features/TodolistsList/model/todolists.slice";

// let startState: TasksStateType = {};


// test("empty arrays should be added when we set todolists", () => {
//   const action = todolistsThunks.fetchTodolists.fulfilled(
//     {
//       todolists: [
//         { id: "1", title: "title 1", order: 0, addedDate: "" },
//         { id: "2", title: "title 2", order: 0, addedDate: "" },
//       ],
//     },
//     "requestId",
//   );

//   const endState = tasksReducer({}, action);

//   const keys = Object.keys(endState);

//   expect(keys.length).toBe(2);
//   expect(endState["1"]).toBeDefined();
//   expect(endState["2"]).toBeDefined();
// });
