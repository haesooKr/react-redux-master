import React, { useState } from "react";
import './NewTodoForm.css';

const NewTodoForm = () => {
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
        <button className="new-todo-button">Create Todo</button>
      </div>
    </div>
  );
};

export default NewTodoForm;
