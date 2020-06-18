export const CREATE_TODO = "CREATE_TODO";
export const createTodo = todo => ({
  type: CREATE_TODO,
  payload: { todo },
});

export const REMOVE_TODO = "REMOVE_TODO";
export const removeTodo = todo => ({
  type: REMOVE_TODO,
  payload: { todo },
});

export const COMPLETE_TODO = "COMPLETE_TODO";
export const completeTodo = text => ({
  type: COMPLETE_TODO,
  payload: { text },
});

export const LOAD_TODOS_IN_PROGRESS = "LOAD_TODOS_IN_PROGRESS";
export const loadTodosInProgess = () => ({
  type: LOAD_TODOS_IN_PROGRESS,
  // it is not needed payload
})

export const LOAD_TODOS_SUCCESS = "LOAD_TODOS_SUCCESS";
export const loadTodoSuccess = todos => ({
  type: LOAD_TODOS_SUCCESS,
  payload: { todos },
})

export const LOAD_TODOS_FAILURE = "LOAD_TODOS_FAILURE";
export const loadTodosFailure = () => ({
  type: LOAD_TODOS_FAILURE,
})