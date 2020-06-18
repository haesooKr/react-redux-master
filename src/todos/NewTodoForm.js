import React, { useState } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import { getTodos } from "./selectors";
import { addTodoRequest } from "./thunk";
// connect = higher order component

const FormContainer = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  border: 1px solid gray;
  padding: 0;
`;

const NewTodoInput = styled.input`
  border: none;
  padding: 5px 10px;
  width: 100%;
`;

const CreateButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
`;

const NewTodoForm = ({ todos, onCreatePressed }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      
      <FormContainer>
        <NewTodoInput
          className="new-todo-input"
          placeholder="Type your new todo here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        />
        <CreateButton
          onClick={() => {
            const isDuplicateText = todos.some(
              (todo) => todo.text === inputValue
            );
            if (!isDuplicateText) {
              onCreatePressed(inputValue);
              setInputValue("");
            }
          }}
          className="new-todo-button"
        >
          Create Todo
        </CreateButton>
      </FormContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: getTodos(state),
});
// state은 entire redux state을 넒겨준다
// 여기서 필요한 piece만 골라내게하는게 mapStateToProps function

const mapDispatchToProps = (dispatch) => ({
  onCreatePressed: (text) => dispatch(addTodoRequest(text)),
  // onCreatePressed는 임의로 정한 이름
});
// mapStateToProps와 다르게 entire redux state을 받는것이아니고
// dispatch를 받아온다

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
// connect에 mapStateToProps를 연결했기때문에 맨 위에서 ({ todos })를 받을 수 있게됬다.
