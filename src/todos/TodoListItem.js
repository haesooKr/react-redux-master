import React from "react";
import styled from "styled-components";

const TodoItemContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  border-bottom: ${(props) =>
    new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
      ? "none"
      : "2px solid red"};
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`;

const ButtonsContainer = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

const CompletedButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin-right: 5px;
`;

const RemoveButton = styled.button`
  background-color: red;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
`;

const TodoListItem = ({ todo, onRemovePressed, onCompletePressed }) => (
  <TodoItemContainer createdAt={todo.createdAt}>
    <h3>{todo.text}</h3>
    <p>
      Created at:&nbsp;
      {new Date(todo.createdAt).toLocaleDateString()}
    </p>
    <ButtonsContainer>
      {todo.isCompleted ? null : (
        <CompletedButton
          onClick={() => onCompletePressed(todo.id)}
          className="completed-button"
        >
          Mark As Completed
        </CompletedButton>
      )}
      <RemoveButton
        onClick={() => onRemovePressed(todo.id)}
        className="remove-button"
      >
        Remove
      </RemoveButton>
    </ButtonsContainer>
  </TodoItemContainer>
);

export default TodoListItem;
