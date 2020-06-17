import React from 'react';
import './App.css';
import TodoList from './todos/TodoList';
import { hot } from 'react-hot-loader';

const App = () => (
		<div className = "App">
				<TodoList />
		</div>
)

export default hot(module)(App);