import React from 'react';
import TodoListItem from './TodoListItem.jsx';
import NewTodoForm from './NewTodoForm.jsx';
import './TodoList.css';

const TodoList = ({ todos = [] }) => (
  <div className="list-wrapper">
    <NewTodoForm />
    {todos.map(todo => <TodoListItem todo={todo} />)}
  </div>
)

export default TodoList;
