import {
  loadTodoSuccess,
  loadTodosInProgess,
  loadTodosFailure,
  createTodo,
} from "./actions";

export const loadTodos = () => async (dispatch, getState) => {
  // we can recycle dispatch & get current State through thunk
  try {
    dispatch(loadTodosInProgess());
    const response = await fetch("http://localhost:8080/todos-delay");
    const todos = await response.json();
    dispatch(loadTodoSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(e));
  }
};

export const addTodoRequest = (text) => async (disptach) => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch("http://localhost:8080/todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body,
    });
    const todo = await response.json();
    dispatch(createTodo(todo));
  } catch (e) {
    disptach(displayAlert(e));
  }
};

export const displayAlert = (text) => () => {
  alert(`You clicked on ${text}`);
};
