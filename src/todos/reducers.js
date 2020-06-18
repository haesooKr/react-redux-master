import {
  CREATE_TODO,
  REMOVE_TODO,
  COMPLETE_TODO,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_FAILURE,
  LOAD_TODOS_SUCCESS,
} from "./actions";

export const isLoading = ( state=false, action ) => {
  // action에 따라서 true or false를 리턴한다
  const { type } = action;
  switch (type) {
    case LOAD_TODOS_IN_PROGRESS:
      return true;
    case LOAD_TODOS_SUCCESS:
    case LOAD_TODOS_FAILURE:
      return false;
    default: 
      return state;
  }
}

export const todos = (state = [], action) => {
  // state = currentState = array of TodoItems

  const { type, payload } = action;
  // type = Create or Remove
  // payload = 값

  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      return state.concat(todo);
      // concat은 state을 직접적으로 바꾸지않고 합친 새로운 값을 변환하기에 문제없음
      // state은 직접적으로 손대선 안되기때문에 concat을 사용한 것.
    }
    case REMOVE_TODO: {
      const { todo: todoToRemove } = payload;
      return state.filter((todo) => todo.id !== todoToRemove.id);
    }
    case COMPLETE_TODO: {
      const { text } = payload;
      return state.map((todo) => {
        if (todo.text === text) {
          return { ...todo, isCompleted: true };
        }
        return todo;
      });
    }
    case LOAD_TODOS_SUCCESS: {
      const { todos } = payload;
      return todos;
    }
    case LOAD_TODOS_IN_PROGRESS:
    case LOAD_TODOS_FAILURE:
    default:
      return state;
    // state을 다시 리턴해주지않으면 리덕스는 undefined를 받고
    // 에러를 일으킬 수 있다.
  }
};
