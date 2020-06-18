import React from 'react';
import { connect } from 'react-redux';
import { removeTodo } from './actions';
import TodoListItem from './TodoListItem.jsx';
import NewTodoForm from './NewTodoForm.jsx';
import './TodoList.css';

const TodoList = ({ todos = [], onRemovePressed }) => (
  <div className="list-wrapper">
    <NewTodoForm />
    {todos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} />)}
  </div>
)

const mapStateToProps = state => ({
  todos: state.todos,
})

const mapDispatchToProps = dispatch => ({
  onRemovePressed: text => dispatch(removeTodo(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
