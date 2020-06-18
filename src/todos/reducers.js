import {
  CREATE_TODO,
  REMOVE_TODO,
  COMPLETE_TODO,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_FAILURE,
  LOAD_TODOS_SUCCESS,
} from "./actions";

const initialState = { isLoading: false, data: [] };

export const todos = (state = initialState, action) => {
  // state = currentState = array of TodoItems

  const { type, payload } = action;
  // type = Create or Remove
  // payload = 값

  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      return {
        ...state,
        data: state.concat(todo)
      }
      // concat은 state을 직접적으로 바꾸지않고 합친 새로운 값을 변환하기에 문제없음
      // state은 직접적으로 손대선 안되기때문에 concat을 사용한 것.
    }
    case REMOVE_TODO: {
      const { todo: removedTodo /* change the name */ } = payload;
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== removedTodo.id),
      }
    }
    case COMPLETE_TODO: {
      const { todo: updatedTodo /* change the name */ } = payload;
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === updatedTodo.id ) {
            return updatedTodo
          }
          return todo;
        })
      }
    }
    case LOAD_TODOS_SUCCESS: {
      const { todos } = payload;
      return {
        ...state,
        isLoading: false,
        data: todos,
      };
    }
    case LOAD_TODOS_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,
      }
    case LOAD_TODOS_FAILURE:
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state;
    // state을 다시 리턴해주지않으면 리덕스는 undefined를 받고
    // 에러를 일으킬 수 있다.
  }
};
