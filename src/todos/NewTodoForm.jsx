import React, { useState } from "react";
import { connect } from 'react-redux'; 
// connect = higher order component
import { createTodo } from './actions';
import './NewTodoForm.css';

const NewTodoForm = ({ todos, onCreatePressed }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <div className="new-todo-form">
        <input
          className="new-todo-input"
          placeholder="Type your new todo here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        />
        <button onClick={() => {
          const isDuplicateText = todos.some(todo => todo.text === inputValue);
          if(!isDuplicateText){
            onCreatePressed(inputValue);
            setInputValue("");
          }
        }} className="new-todo-button">Create Todo</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  todos: state.todos,
});
// state은 entire redux state을 넒겨준다
// 여기서 필요한 piece만 골라내게하는게 mapStateToProps function

const mapDispatchToProps = dispatch => ({
  onCreatePressed: text => dispatch(createTodo(text)),
  // onCreatePressed는 임의로 정한 이름
});
// mapStateToProps와 다르게 entire redux state을 받는것이아니고
// dispatch를 받아온다

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
// connect에 mapStateToProps를 연결했기때문에 맨 위에서 ({ todos })를 받을 수 있게됬다.