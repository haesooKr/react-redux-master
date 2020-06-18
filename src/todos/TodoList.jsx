import React from 'react';
import { connect } from 'react-redux';
import { removeTodo, completeTodo } from './actions';
import TodoListItem from './TodoListItem.jsx';
import NewTodoForm from './NewTodoForm.jsx';
import './TodoList.css';

const TodoList = ({ todos = [], onRemovePressed, onCompletePressed }) => (
  <div className="list-wrapper">
    <NewTodoForm />
    {todos.map((todo, index) => <TodoListItem key={index} todo={todo} onRemovePressed={onRemovePressed} onCompletePressed={onCompletePressed}/>)}
  </div>
)

const mapStateToProps = state => ({
  todos: state.todos,
})

const mapDispatchToProps = dispatch => ({
  onRemovePressed: text => dispatch(removeTodo(text)),
  onCompletePressed: text => dispatch(completeTodo(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
