# 리액트 Redux

## React App Setting

NPM 이나 Yarn 으로 셋업한다.

폴더를 만든다 (src, public). public 폴더안에 index.html을 아래와 같이 만든다

```html
**<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><!-- 타이틀 --></title>
</head>
<body>
  <div id="root"></div>
<!-- 리액트 뷰가 담길 div#root -->
  <noscript>Please enable JavaScript to view this site.</noscript>
<!-- noscript는 유저가 자바스크립트를 disabled 해놨을때 알려주는 알림 -->
  <script src="../dist/bundle.js"></script>
</body>
</html>**
```

### Babel 설치

**@babel/core @babel/cli @babel/preset-env @babel/preset-react** 을 설치한다

babel/preset-env 는 ES6를 commonJS로 변환시켜준다

babel/preset-react 는 JSX를 변환시켜준다

1. .babelrc 파일을 root 디렉토리에 생성한다.

    ```jsx
    **{
    	"presets": ["@babel/preset-env", "@babel/preset-react"]
    }**
    ```

2. App.js, css 와 index.js 를 생성한다.

    ```jsx
    **//App.js

    import React from 'react';
    import './App.css;

    const App = () => (
    		<div className = "App">
    				<h1>Hello World</h1>
    		</div>**
    ```

    ```css
    **/* App.css */
    .App {
    	margin: 1rem;
    	font-family: Arial, Helventica, sans-serif;
    	color: #222222;
    }**
    ```

    ```jsx
    **// index.js

    import React from 'react';
    import ReactDom from 'react-dom';
    import App from './App.js';

    ReactDom.render(<App/>, document.getElementById("root");**
    ```

### react & react-dom 설치

```bash
yarn add react react-dom
```

### webpack 설치

1. **webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader**들을 —dev로 설치한다.
2. webpack.config.js를 루트 디렉토리에 생성한다

    ```jsx
    **// webpack.config.js
    // webpack will compile ES6 to commonJS

    const path = require('path');
    const webpack = require('webpack');

    module.exports = {
    	entry: './src/index.js',
    	mode: 'development',
    	module: {
        rules: [
          {
            test: /\.(js|jsx)$/, // matching all js & jsx files
            // transform ES6 to regular javaScript
            exclude: /(node_modules)/, // except node_modules
            loader: 'babel-loader',
            options: { presets: ["@babel/env"] }
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          }
        ]
      },
      resolve: { extensions: ['*', '.js', '.jsx'] },
      output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/dist/',
        filename: 'bundle.js'
      },
      devServer: { //allow us view our react application in browser
        contentBase: path.join(__dirname, 'public/'),
        port: 3000,
        publicPath: 'http://localhost:3000/dist/',
        hotOnly: true
      },
      plugins: [new webpack.HotModuleReplacementPlugin()]
    };**
    ```

3. yarn webpack-dev-server —mode development로 잘 작동되는지 확인해보자. (하지만 코드를 수정해도 create-react-app처럼 자동으로 새로고침되지않는다.)

### react-hot-loader 설치

1. yarn add —dev react-hot-loader를 설치하면된다.

    ```jsx
    import React from 'react';
    import './App.css';
    ***import { hot } from 'react-hot-loader'; // import***

    const App = () => (
    		<div className = "App">
    				<h1>Hello World</h1>
    		</div>
    )

    export default ***hot(module)(App); // excute***
    ```

2. 그리고 package.json에 script를 추가하자.

    ```jsx
    ...
    **scripts: {
    "scripts": {
        "dev": "yarn webpack-dev-server --mode development"
     },**
    ...
    ```

3. 우리가 웹펙서버를 실행하는동안 /dist 폴더가 디렉토리에서 보이지않는데, 그건 웹펙서버가 /dist폴더를 메모리에 저장하고 서버가 멈출때마다 삭제하기때문이다. (유지하고싶다면 아래처럼 package.json을 수정하면된다)

    ```jsx
    ...
    scripts: {
    "scripts": {
        "dev": "yarn webpack-dev-server --mode development"
     },
    ***"build": {
    	"build": "yarn webpack --mode development"
    }***
    ...
    ```

4. 자 이제 셋팅이 끝났다. 심플한 Todo App을 하나 만들어보자. 먼저 src폴더에 todos폴더를 만들고 그안에  TodoList.js 파일을 만들자.

    ```jsx
    **// TodoList.js
    import React from 'react';
    import TodoListItem from './TodoListItem';

    const TodoList = ({ todos }) => (
      <div className="list-wrapper">
        {todos.map(todo => <TodoListItem todo={todo} />)}
      </div>
    )

    export default TodoList;**
    ```

5. 이제 TodoListItem.js를 만들어보자

    ```jsx
    **import React from "react";

    const TodoListItem = ({ todo }) => (
      <div className="todo-item-container">
        <h3>{todo.text}</h3>
        <div className="buttons-container">
          <button className="completed-button">Mark As Completed</button>
          <button className="remove-button">Remove</button>
        </div>
      </div>
    );

    export default TodoListItem;**
    ```

6. 이번에는 NewTodoForm.js를 만들어보자

    ```jsx
    **import React, { useState } from "react";

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

    export default NewTodoForm;**
    ```

7. TodoList에 NewTodoForm을 연결하고 App에 연결시켜보자

## Redux

### redux & react-redux 설치

Yarn add redux react-redux

### Create store.js

```jsx
**import { createStore, combineReducers } from 'redux';

const reducers = {};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer);**
```

Go to index.js and modify

```jsx
import React from "react";
import ReactDom from "react-dom";
***import { Provider } from "react-redux";***
***import { configureStore } from "./store";*** 
import App from "./App";

ReactDom.render(
  ***<Provider store={configureStore()}>***
    <App />
  ***</Provider>,***
  document.getElementById("root")
);
```

### Create actions.js

```jsx
**export const CREATE_TODO = "CREATE_TODO";
export const createTodo = text => ({
  type: CREATE_TODO,
  payload: { text },
});

export const REMOVE_TODO = "REMOVE_TODO";
export const removeTodo = text => ({
  type: REMOVE_TODO,
  payload: { text },
// 왜 text를 Object 형식으로 받는지?
})**
```

### Create reducers.js

```jsx
**import { CREATE_TODO, REMOVE_TODO } from './actions';

export const todos = (state = [], action) => {
  // state = currentState = array of TodoItems

  const { type, payload } = action;
  // type = Create or Remove
  // payload = 값

  switch (type) {
    case CREATE_TODO: {
      const { text } = payload;
      const newTodo = {
        text,
        isCompleted: false,
      }
      return state.concat(newTodo);
      // concat은 state을 직접적으로 바꾸지않고 합친 새로운 값을 변환하기에 문제없음
      // state은 직접적으로 손대선 안되기때문에 concat을 사용한 것.
    }
    case REMOVE_TODO: {
      const { text } = payload;
      return state.filter(todo => todo.text !== text);
    }
    default :
      return state;
      // state을 다시 리턴해주지않으면 리덕스는 undefined를 받고
      // 에러를 일으킬 수 있다.
  }
}**
```

리듀서를 store.js에 import 하자

```jsx
import { createStore, combineReducers } from 'redux';
***import { todos } from './todos/reducers';***

***const reducers = {
  todos,
};***

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer);
```

NewTodoForm에 리덕스를 연결하자

```jsx
import React, { useState } from "react";
***import { connect } from 'react-redux'; 
// connect = higher order component***
***import { createTodo } from './actions';***
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
        ***<button onClick={() => {
          const isDuplicateText = todos.some(todo => todo.text === inputValue);
          if(!isDuplicateText){
            onCreatePressed(inputValue);
            setInputValue("");
          }
        }}*** className="new-todo-button">Create Todo</button>
      </div>
    </div>
  );
};

***const mapStateToProps = state => ({
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
// connect로 mapStateToProps와 mapDispatchToProps를 
// NewTodoForm의 props로 넣어서 넘겨준다***
```

TodoList.js 도 위와같이 변경하자

```jsx
import React from 'react';
***import { connect } from 'react-redux';
import { removeTodo } from './actions';***
import TodoListItem from './TodoListItem.jsx';
import NewTodoForm from './NewTodoForm.jsx';
import './TodoList.css';

const TodoList = ({ todos = [], ***onRemovePressed*** }) => (
  <div className="list-wrapper">
    <NewTodoForm />
    {todos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} />)}
  </div>
)

***const mapStateToProps = state => ({
  todos: state.todos,
})

const mapDispatchToProps = dispatch => ({
  onRemovePressed: text => dispatch(removeTodo(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);***
```

TodoList.js에서 TodoListItem에 onRemovePressed prop을 전달해줬으니 TodoListItem에서 적용해보자

```jsx
import React from "react";
import './TodoListItem.css';

const TodoListItem = ({ todo, ***onRemovePressed*** }) => (
  <div className="todo-item-container">
    <h3>{todo.text}</h3>
    <div className="buttons-container">
      <button className="completed-button">Mark As Completed</button>
      <button ***onClick={() => onRemovePressed(todo.text)***} className="remove-button">Remove</button>
    </div>
  </div>
);

export default TodoListItem;
```

앱을 실행시켜서 잘 작동되는지 확인해보자

잘 작동되지만 새로고침 할 경우 기록이 사라진다. 이 때 redux-persist가 이 문제를 해결해준다.

### redux-persist 설치

redux-persist를 설치하고, store.js에 적용시켜준다

```jsx
import { createStore, combineReducers } from 'redux';
***import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';***
import { todos } from './todos/reducers';

const reducers = {
  todos,
};

***const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
}***

const rootReducer = combineReducers(reducers);
***const persistedReducer = persistReducer(persistConfig, rootReducer);***

export const configureStore = () => createStore(***persistedReducer***);
```

index.js에도 적용시켜준다

```jsx
import React from "react";
import ReactDom from "react-dom";
***import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from "react-redux";***
import { configureStore } from "./store";
import App from "./App";

***const store = configureStore();
const persistor = persistStore(store);***

ReactDom.render(
  ***<Provider store={store}>**
    **<PersistGate persistor={persistor} loading={<div>Loading...</div>}>***
      <App />
*    **</PersistGate>***
  </Provider>,
  document.getElementById("root")
);
```

잘 실행되는지 확인한다. *한가지 문제점은 만약에 오류가 생긴다면 permacrash라고 저장되있는 리덕스스토에때문에 계속 적으로 오류가 생길수있는데 이때 delete persisted-data를 로컬스토리지에서 제거해주면된다. Inspector를 열고 application tab으로가서 local storage에서 persist root를 제거한다.*

### redux dev tools

Redux Store 값을 추적하려면 redux dev tools를 이용하자. 사용하기위해서는 store.js를 수정해야한다.

```jsx
export const configureStore = () =>
  createStore(
    persistedReducer,
    ***window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()***
  );
```

위의 글을 참고하여 onCompletePressed를 추가하고 버튼을 누르면 사라지게해보자.

## Redux Thunk

### Why we need to use Redux Thunk?

It is to handle all of the side-effects login and server communication. 

### Install redux-thunk

```bash
**yarn add redux-thunk redux-devtools-extension 
@babel/runtime**
```

**redux-devtools-extension** - add the Thunk middleware to Redux store

**@babel/runtime** - make asynchronous Thunks work

```bash
**yarn add @babel/plugin-transform-runtime**
```

Development version of the **@babel/runtime** package

### Modify .babelrc

```jsx
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  ***"plugins": ["@babel/plugin-transform-runtime"]***
}
```

Add to store.js

```jsx
...
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
...

export const configureStore = () =>
  createStore(
    persistedReducer,
    ***composeWithDevTools(applyMiddleware(thunk))***
  );
```

Create thunk.js **to test**

```jsx
export const displayAlert = () => () => {
  alert("Hello");
}
```

Apply to TodoList.js **to test**

```jsx
...
***import NewTodoForm from "./NewTodoForm.jsx";
import { displayAlert } from "./thunk";***
...

const TodoList = ({
  todos = [],
  onRemovePressed,
  onCompletePressed,
  ***onDisplayAlertClicked,***
}) => (
  <div className="list-wrapper">
    <NewTodoForm />
    {todos.map((todo, index) => (
      <TodoListItem
        key={index}
        todo={todo}
        onRemovePressed={onRemovePressed}
        ***onCompletePressed={onDisplayAlertClicked}***
      />
    ))}
  </div>
);

...
const mapDispatchToProps = (dispatch) => ({
  onRemovePressed: (text) => dispatch(removeTodo(text)),
  onCompletePressed: (text) => dispatch(completeTodo(text)),
  ***onDisplayAlertClicked: () => dispatch(displayAlert())***,
});
...
```

이번에는 thunk가 인자를 받도록 하나 더 테스트해보자

```jsx
export const displayAlert = **text** => () => {
  ***alert(`You clicked on ${text}`);***
}
```

```jsx
// TodoList.js
...
const mapDispatchToProps = (dispatch) => ({
  onRemovePressed: (text) => dispatch(removeTodo(text)),
  onCompletePressed: (text) => dispatch(completeTodo(text)),
  ***onDisplayAlertClicked: (text) => dispatch(displayAlert(text))***,
});
...
```

강좌의 Exercise Files를 다운받고 그안에있는 서버를 테스트하기위해 구동시키자 (강좌에 대한 링크는 맨 위에있다)

```bash
// 폴더를 열고 아래의 코드로 실행시키자

yarn install
yarn start
```

actions.js 파일에 아래와 같이 REST API를 위한 action들을 추가하자

```jsx
...
***export const LOAD_TODOS_IN_PROGRESS = "LOAD_TODOS_IN_PROGRESS";
export const loadTodosInProgess = () => ({
  type: LOAD_TODOS_IN_PROGRESS,
  // it is not needed payload
})

export const LOAD_TODOS_SUCCESS = "LOAD_TODOS_SUCCESS";
export const loadTodoSuccess = todos => ({
  type: LOAD_TODOS_SUCCESS,
  payload: { todos },
})

export const LOAD_TODOS_FAILURE = "LOAD_TODOS_FAILURE";
export const loadTodosFailure = () => ({
  type: LOAD_TODOS_FAILURE,
})***
```

그리고 thuk.js로 돌아가 우리가 만든 actions를 적용한다.

```jsx
***import {
  loadTodoSuccess,
  loadTodosInProgess,
  loadTodosFailure,
} from "./actions";***

***export const loadTodos = () => async (dispatch, getState) => {
  // we can recycle dispatch & get current State through thunk
  try {
    dispatch(loadTodosInProgess());
    const response = await fetch("http://localhost:8080/todos");
    const todos = await response.json();
    dispatch(loadTodoSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(e));
  }
};***

export const displayAlert = (text) => () => {
  alert(`You clicked on ${text}`);
};
```

다시 reducers.js로 돌아가서 새로만든 actions와 isLoading reducer를 추가하자

```jsx
import {
  CREATE_TODO,
  REMOVE_TODO,
  COMPLETE_TODO,
  ***LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_FAILURE,
  LOAD_TODOS_SUCCESS,***
} from "./actions";

***export const isLoading = ( state=false, action ) => {
  // action에 따라서 true or false를 리턴한다
  const { type } = action;
  switch (type) {
    case LOAD_TODOS_IN_PROGRESS:
      return true;
    case LOAD_TODOS_SUCCESS:
    case LOAD_TODOS_FAILURE:
      return false;
    default: 
      return state;
  }
}***
...
```

위에 추가한 reducer를 다시 store.js에 적용시켜주자

```jsx
...
***import { todos, isLoading } from "./todos/reducers";***

const reducers = {
  todos,
  ***isLoading,***
};

...
```

적용된 reducer를 가지고 TodoList.js에 또 적용시켜주자 (로딩화면 적용)

```jsx
import React, ***{ useEffect }*** from "react";
import { connect } from "react-redux";
***import { loadTodos } from "./thunk";***
import { removeTodo, completeTodo } from "./actions";
import TodoListItem from "./TodoListItem.jsx";
import NewTodoForm from "./NewTodoForm.jsx";
import "./TodoList.css";

const TodoList = ***({***
  todos = [],
  onRemovePressed,
  onCompletePressed,
  ***isLoading,
  startLoadingTodos,***
}) => {
  ***useEffect(() => {
    startLoadingTodos();
  }, []);
  const loadingMessage = <div>Loading todos...</div>;
  const content = (***
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
  ***);
  return isLoading ? loadingMessage : content;
};***

const mapStateToProps = (state) => ({
  ***isLoading: state.isLoading,***
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  ***startLoadingTodos: () => dispatch(loadTodos()),***
  onRemovePressed: (text) => dispatch(removeTodo(text)),
  onCompletePressed: (text) => dispatch(completeTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

이제 실행시켜보면 로딩 후에 TodoList Content가 표시되는걸 볼 수 있다. 하지만 아직 서버에서 데이터를 가져오는것이아니라 local storage에서 불러오는것이므로 이걸 해결해보자.

reducers.js 파일을 열고

```jsx
...
export const todos = (state = [], action) => {
		...
    case COMPLETE_TODO: {
      const { text } = payload;
      return state.map((todo) => {
        if (todo.text === text) {
          return { ...todo, isCompleted: true };
        }
        return todo;
      });
    }
// 우리가 정해준데로 LOAD_TODOS_...들은 payload로 todos를 받는다
    ***case LOAD_TODOS_SUCCESS: {
      const { todos } = payload;
      return todos; // 한명이 todos를 고치면 다른 모든 유저들도 영향을 받는다 
										// 이 문제는 지금 강의와 별개의 사항이므로 패스한다. (데이터베이스가 없기때문)
    }
    case LOAD_TODOS_IN_PROGRESS:
    case LOAD_TODOS_FAILURE:***
    default:
      return state;
  }
******};
```

이제는 서버에서 todos 데이터를 잘 받아온다. 하지만 아직까지 서버에서 받아온 todos를 수정할 방법은 추가하지않았다. (브라우저에서는 새로운 todo를 만들거나 없애는것처럼 보이지만 실제로는 아니다)

thunk.js로 가서 addTodoRequest를 만들어주자

```jsx
import {
  loadTodoSuccess,
  loadTodosInProgess,
  loadTodosFailure,
  ***createTodo,***
} from "./actions";

...
**export const addTodoRequest = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch("http://localhost:8080/todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body,
    });
    const todo = await response.json();
    dispatch(createTodo(todo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};**
```

이제 이 새로운 workflow를 위해 actions.js 와 reducers.js를 수정해주자

```jsx
//actions.js

export const CREATE_TODO = "CREATE_TODO";
export const createTodo = ***todo*** => ({
  type: CREATE_TODO,
  payload: { ***todo*** },
});
...
```

```jsx
//reducers.js

...
const todos = (state = [], action) => {
  const { type, payload } = action;
  // type = Create or Remove
  // payload = 값

  switch (type) {
    case CREATE_TODO: {
      const { ***todo*** } = payload;
      return state.concat(***todo***);
    }
...
};
```

이제 이걸 컴포넌트 NewTodoForm에 적용하자

```jsx
...
***import { createTodo } from './actions';***

...
const mapDispatchToProps = dispatch => ({
  onCreatePressed: text => dispatch(***addTodoRequest***(text)),

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);

```

이제 서버에 우리가 만든 todo가 잘 추가되는것을 볼 수 있다. 이제 deleteTodoRequest를 만들어보자.

thunk.js로 가서 아래의 코드를 추가하자.

```jsx
...
***import removeTodo from './actions';***

...
***export const removeTodoRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "delete"
    });
    const removedTodo = await response.json();
    dispatch(removeTodo(removedTodo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
}***
```

actions.js 와 reducers.js도 변경해주자

```jsx
// actions.js
export const REMOVE_TODO = "REMOVE_TODO";
export const removeTodo = **todo** => ({
  type: REMOVE_TODO,
  payload: { **todo** },
});
```

```jsx
// reducers.js
case REMOVE_TODO: {
      const { **todo: todoToRemove** } = payload;
      return state.filter**((todo) => todo.id !== todoToRemove.id);**
    }
```

TodoList.js 컴포넌트로와서 또 변경된 사항을 추가해주자

```jsx
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadTodos, ***removeTodoRequest*** } from "./thunk";
import { completeTodo } from "./actions";
import TodoListItem from "./TodoListItem.jsx";
import NewTodoForm from "./NewTodoForm.jsx";
import "./TodoList.css";

const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: **(id)** => dispatch(**removeTodoRequest(id)**),
  onCompletePressed: (text) => dispatch(completeTodo(text)),
});
```

TodoList.js의 하위 컴포넌트에서 onRemovePressed를 물려받기때문에 TodoListItem.js도 변경해주어야한다.

```jsx
const TodoListItem = ({ todo, onRemovePressed, onCompletePressed }) => (
			...
      <button onClick={() => onRemovePressed(**todo.id**)} className="remove-button">Remove</button>
	    ...
);

export default TodoListItem;
```

## Selectors

### Why do we need Selectors?

![Redux%20b1df49d1f771461ea82cc379a0b3231a/Screen_Shot_2020-06-18_at_2.54.51_PM.png](Redux%20b1df49d1f771461ea82cc379a0b3231a/Screen_Shot_2020-06-18_at_2.54.51_PM.png)

따로따로 관리하는게 아니라 todos안에 isLoading과 todos를 todos.data로 관리하는것 ⇂

![Redux%20b1df49d1f771461ea82cc379a0b3231a/Screen_Shot_2020-06-18_at_2.55.14_PM.png](Redux%20b1df49d1f771461ea82cc379a0b3231a/Screen_Shot_2020-06-18_at_2.55.14_PM.png)

하지만 이렇게 하려고 할 경우, 모든 reference를 다 수정해줘야하기때문에 좋지않은 방법이다.

![Redux%20b1df49d1f771461ea82cc379a0b3231a/Screen_Shot_2020-06-18_at_2.57.10_PM.png](Redux%20b1df49d1f771461ea82cc379a0b3231a/Screen_Shot_2020-06-18_at_2.57.10_PM.png)

위와 같은 방법으로하면 simple one line change로 모든 코드를 쉽게 변경 할 수 있다.

다른 예제를 들어보면

![Redux%20b1df49d1f771461ea82cc379a0b3231a/Screen_Shot_2020-06-18_at_2.59.14_PM.png](Redux%20b1df49d1f771461ea82cc379a0b3231a/Screen_Shot_2020-06-18_at_2.59.14_PM.png)

completedTodos와 incompleteTodos를 관리하고싶으면 위와 같은 코드를 작성해야한다.

![Redux%20b1df49d1f771461ea82cc379a0b3231a/Screen_Shot_2020-06-18_at_3.00.24_PM.png](Redux%20b1df49d1f771461ea82cc379a0b3231a/Screen_Shot_2020-06-18_at_3.00.24_PM.png)

Selectors를 사용하면 위에 코드처럼 간결화 할 수 있다.

### Create Selectors

먼저 selectors.js를 만들자

```jsx
export const getTodos = state => state.todos;
export const getTodosLoading = state => state.isLoading;
```

그리고 이걸 state을 필요로하는 TodoList와 NewTodoForm에 적용해주기만 하면 끝난다.

```jsx
//TodoList.js
**import { getTodos, getTodosLoading } from './selectors';**

const mapStateToProps = (state) => ({
  isLoading: **getTodosLoading(state),**
  todos: **getTodos(state),**
});
```

```jsx
//NewTodoForm.js
**import { getTodos } from './selectors';**

const mapStateToProps = state => ({
  todos: **getTodos(state),**
});
```

다른 예를 들어보겠다. isLoading은 todos를 불러올때만 사용하는것이아니라 만약 우리가 user나 다른 데이터들을 불러올때, 똑같이 사용해야되는것이기때문에 하나의 isLoading state을 따로따로 분리시켜준다면 더 간결하고 좋은 코드가 만들어질것이다.

reducers.js 를 변경해보자

```jsx
//reducers.js
~~export const isLoading = ( state=false, action ) => {
  const { type } = action;
  switch (type) {
    case LOAD_TODOS_IN_PROGRESS:
      return true;
    case LOAD_TODOS_SUCCESS:
    case LOAD_TODOS_FAILURE:
      return false;
    default: 
      return state;
  }
}~~

isLoading state을 todos안에서 변경가능하기때문에 
이제 더 이상 isLoading이 따로 필요없다 (삭제할것)

***const initialState = { isLoading: false, data: [] };***

export const todos = (state = ***initialState***, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      ***return {
        ...state,
        data: state.data.concat(todo)
      }***
    }
    case REMOVE_TODO: {
      const { todo: ***removedTodo*** /* change the name */ } = payload;
      ***return {
        ...state,
        data: state.data.filter((todo) => todo.id !== removedTodo.id),
      }***
    }
    case COMPLETE_TODO: {
      const { todo: ***updatedTodo*** /* change the name */ } = payload;
      ***return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === updatedTodo.id ) {
            return updatedTodo
          }
          return todo;
        })
      }***
    }
    case LOAD_TODOS_SUCCESS: {
      const { todos } = payload;
      ***return {
        ...state,
        isLoading: false,
        data: todos,
      };***
    }
    case LOAD_TODOS_IN_PROGRESS:
      ***return {
        ...state,
        isLoading: true,
      }***
    case LOAD_TODOS_FAILURE:
      ***return {
        ...state,
        isLoading: true,
      }***
    default:
      return state;
  }
};
```

store.js 에서도 isLoading 리듀서를 삭제해주자.

```jsx
//store.js
import { todos, ~~**reducers**~~ } from "./todos/reducers";

const reducers = {
  todos,
	~~**reducers**~~
};
```

이렇게하면 앱은 실행이 안된다. 왜냐하면 우리가 state의 structure을 바꾸었기때문이다. 하지만 selectors의 장점은 여기서 나온다. 우리가 해줘야하는 일은 selectors에서 리턴하는 값만 약간 수정해주면된다.

```jsx
// selectors.js

export const getTodos = state => ***state.todos.data;***
export const getTodosLoading = state => ***state.todos.isLoading;***
```

### Combining selectors with Reselect

먼저 reselect를 사용하기위해 다운로드하자.

```bash
yarn add reselect
```

```jsx
// selectors.js
**import { createSelector } from reselect;**

export const getTodos = state => state.todos.data;
export const getTodosLoading = state => state.todos.isLoading;

**export const getIncompletedTodos = createSelector(
  getTodos,
  (todos) => todos.filter(todo => !todo.isCompleted),
)

export const getCompletedTodos = createSelector(
  getTodos,
  (todos) => todos.filter(todo => todo.isCompleted),
)**

/* 
****reselect의 createSelector는 여러개의 인자들(selectors)을
받아서 마지막이되는 function의 인자로서 사용하여 return한다.

위에 경우 getTodos를 받아서 그 리턴값을 todos로 사용해서
getIncompleteTodos의 값을 리턴한것이다.

아래 코드에 부가 설명이 있다.
*****/
```

```jsx
// 에를 들어서 아래처럼 3개의 기본 selectors가 있다고하자.
export const A = () => something;
export const B = () => something2;
export const C = () => something3;

// 그랬을때 우리는
export const reselectFunc = createSelector(
	A, B, C,
	(a, b, c) => a + b + c;
)
// 처럼 사용할 수 있는 것이다.
// 또한 createSelector를 이용해서 만든 selector를
// 다른 createSelector를 만드는데 필요한 인자로 넣을 수 있다.
```

하지만 이렇게 봤을 때는 왜 우리가 createSeletor를 사용해야되는지 확신이 안들수있다. 아래의 설명을 보자

### Reselect의 최대장점

```jsx
export const getCompletedTodos = createSelector(
  getTodos,
  (todos) => todos.filter(todo => todo.isCompleted),
)

export const getCompletedTodos = state => {
	const { data: todos } = state.todos;
	return todos.filter(todo => todo.isCompleted);
}

**/*
*이 두개의 function을 보면 둘 다 같은 계산을 하고 있는것처럼 보인다
하지만 createSelecotr의 장점은 Memoization을 사용한다는 것이다.
이 Function은 Functional Programming에서 pure functions 라고 불리는데
우리가 똑같은 function을 두번 연속 또는 연속적으로 부른다고 했을 때,
우리는 완전히 같은 값을 받기위해 두번 이상 계산을 실행해야한다. 하지만 이것은 
computational power의 낭비로 이어지고 성능을 저하시킬수있다.
그러나 createSelector에서는 마지막으로 받은 argument와 그에 대한 리턴값을 기억하고있다가
똑같은 arugment가 들어왔을 때 미리 계산되어 저장된 리턴값을 다시 넘겨주는 것으로 
쓸데없는 compuational power의 낭비를 막는다.*
*/**
```

### Adding selectors to components

```jsx
// TodoList.js

...
import { ***getCompleteTodos, getIncompleteTodos***, getTodosLoading } from './selectors';
...
const TodoList = ({
	~~todos,~~
  ***incompleteTodo,
  completedTodo,***
  ...
}) => {
  ...
      ***<h3>Incomplete Todos: </h3>
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
          onCompletePressed={onCompletePressed}***
        />
      ))}
	...
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  ***incompleteTodo: getIncompleteTodos(state),
  completedTodo: getCompletedTodos(state)***
});
```

## Styled Components

### Install styled-components

```bash
yarn add styled-components
```

### Creating a styled-components

```jsx
import styled from "styled-components";
// 먼저 import 해줍니다.

// 원하는 이름을 지정하고 import된 styled 뒤에
// html element를 지정하고 백틱을 붙인다음 사이에다가 css를 넣습니다.
const TodoItemContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  border-bottom: ${(props) =>
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`;
```

### Passing props to styled-components

```jsx
const TodoItemContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  ***border-bottom: ${(props) =>
    new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
      ? "none"
      : "2px solid red"};***
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`;

위에 쓴 코드처럼 styled component를 통해 props를 받아서
그에 따른 css를 조건문으로 컨트롤 할 수 있습니다.
(아래에서 todo의 createdAt을 props로 받아 5일이 지난 
todo item은 border-bottom을 추가해줍니다.)

const TodoListItem = ({ todo, onRemovePressed, onCompletePressed }) => (
  <TodoItemContainer **createdAt={todo.createdAt}**>
    <h3>{todo.text}</h3>
    <p>
      **Created at:&nbsp;
      {new Date(todo.createdAt).toLocaleDateString()}**
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
```

### Extending styled-components

```jsx
const TodoItemContainer = styled.div`
  background: #fff;
  border-radius: 8px;
	~~border-bottom: ${(props) =>
    new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
      ? "none"
      : "2px solid red"};~~
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`;

아래처럼 styled.element가 아니라 styled(styled-component)로
사용해서 TodoItemContainer가 아래의 스타일을 확장하도록 만들수있다.

***const TodoItemContainerWithWarning = styled(TodoItemContainer)`
  border-bottom: ${(props) =>
    new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
      ? "none"
      : "2px solid red"};
`;***
```

## Testing Libraries (Mocha & Chai)

### Install mocha & chai

```bash
**yarn add mocha chai --dev
yarn add @babel/register

(make tests to run modern Babel code)**
```

test 폴더를 todos 폴더안에 만들고, package.json에 테스트 스크립트를 만들어준다.

```jsx
// package.json
"scripts": {
    "dev": "yarn webpack-dev-server --mode development",
    "build": "yarn webpack --mode development",
    ***"test": "mocha \"src/**/*.test.js\" --require @babel/register --recursive"***
  },
```

### Test Reducers

그리고 test 폴더안에 reducers.test.js를 만들고 코드를 추가해주자.

```jsx
**import { expect } from "chai";
import { todos } from "../reducers";

describe("The todos reducer", () => {
  it("Adds a new todo when CREATE_TODO action is received", () => {
    const fakeTodo = { text: "Test", isCompleted: false };
    const fakeAction = {
      type: "CREATE_TODO",
      payload: {
        todo: fakeTodo,
      },
    };
    const originalState = { isLoading: false, data: [] };

    const expected = {
      isLoading: false,
      data: [fakeTodo],
    };

    const actual = todos(originalState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
});**
```

### Test Thunk

```jsx
// thunk.test.js

**import "node-fetch";
import fetchMock from "fetch-mock";
import { expect } from "chai";
import sinon from "sinon";
import { loadTodos } from "../thunk";

describe("The loadTodos thunk", () => {
  it("Dispatches the correct actions in the success scenario", async () => {
    const fakeDispatch = sinon.spy();

    const fakeTodos = [{ text: "1" }, { text: "2" }];
    fetchMock.get("http://localhost:8080/todos", fakeTodos);
    // When thunk tries to use fetch to send a get request to this URL,
    // it will just get back the fakeTodos instead of sending a real request.

    const expectedFirstAction = { type: "LOAD_TODOS_IN_PROGRESS" };
    const expectedSecondAction = {
      type: "LOAD_TODOS_SUCCESS",
      payload: {
        todos: fakeTodos,
      },
    };

    await loadTodos()(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

    fetchMock.reset();
    // restore fetch to original state
  });
});

//이해가 되지않으면 thunk.js flow를 확인해보면 이해하기 쉽습니다.**
```

### Test Reselectors

Reselectors는 state의 결과값만 확인하는것이기 때문에 테스트하기 매우쉽다.

```jsx
export const getCompletedTodos = createSelector(
  getTodos,
  (todos) => todos.filter(todo => todo.isCompleted),
)

/*
우리가 앱을 만들어가다보면 저렇게 다른 selector를 이용해서 위에 selector처럼 복잡해지는 경우가
있는데 이럴때에도 그냥 getTodos는 이미 테스트했다고 가정했을 때 
마지막 (todos) => todos.filter(todo => todo.isCompleted) 만 테스트해주면된다.
getTodos는 원래의 function을 그냥 끌어다 재사용하면된다.

그리고 createSelector를 이용해 만든 function은 resultFunc라는 property가 있는데
예를들어 getCompletedTodos.resultFunc()를 호출하면 마지막 구문의 function만을 리턴한다
*/
```

## References

[리덕스 공식 홈페이지 Document](https://redux.js.org/recipes/writing-tests)


[이 노트의 출처 (강좌)](https://www.linkedin.com/learning/building-modern-projects-with-react/redux-best-practices?u=76115650)

[리덕스 소개 및 개념정리](https://velog.io/@velopert/Redux-1-%EC%86%8C%EA%B0%9C-%EB%B0%8F-%EA%B0%9C%EB%85%90%EC%A0%95%EB%A6%AC-zxjlta8ywt)

[리액트 리덕스에서 훅스 사용하기](https://velog.io/@velopert/react-redux-hooks)