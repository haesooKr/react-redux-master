import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadTodos, removeTodoRequest } from "./thunk";
import { completeTodo } from "./actions";
import TodoListItem from "./TodoListItem.jsx";
import NewTodoForm from "./NewTodoForm.jsx";
import "./TodoList.css";

const TodoList = ({
  todos = [],
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
    <div className="list-wrapper">
      <NewTodoForm />
      {todos.map((todo, index) => (
        <TodoListItem
          key={index}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletePressed={onCompletePressed}
        />
      ))}
    </div>
  );
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (todo) => dispatch(removeTodoRequest(todo)),
  onCompletePressed: (text) => dispatch(completeTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
