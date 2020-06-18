import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  getTodosLoading,
  getCompletedTodos,
  getIncompleteTodos,
} from "./selectors";
import { loadTodos, removeTodoRequest, completeTodoRequest } from "./thunk";
import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = ({
  incompleteTodo,
  completedTodo,
  onRemovePressed,
  onCompletePressed,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  const loadingMessage = <div>Loading todos...</div>;
  const content = (
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete Todos: </h3>
      {incompleteTodo.map((todo, index) => (
        <TodoListItem
          key={index}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletePressed={onCompletePressed}
        />
      ))}
      <h3>Completed Todos: </h3>
      {completedTodo.map((todo, index) => (
        <TodoListItem
          key={index}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletePressed={onCompletePressed}
        />
      ))}
    </ListWrapper>
  );
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  incompleteTodo: getIncompleteTodos(state),
  completedTodo: getCompletedTodos(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletePressed: (id) => dispatch(completeTodoRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
