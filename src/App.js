import React, { Component } from "react";
import logo from "./logo.svg";
import dynamic from "./utils/dynamic";
import { Provider, ReactReduxContext } from "react-redux";
// import { ReactReduxContext } from "react-redux";
import { createStore, combineReducers } from "redux";
// import Test1 from "./Test1";
import AdvancedSearch from "./AdvancedSearch";
import "./App.css";
import "antd/dist/antd.css";
import PostList from "./post/PostList";
// import Test from "./Test";
// const Test = dynamic(() => import("./Test"));

// const MyContext =React.createContext()

function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(combineReducers({ app: counter }), {
  app: { name: "my app" }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <Test /> */}
        {/* <Test1 /> */}
        <PostList />
        <AdvancedSearch />
      </Provider>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //     <Test />
      //   </header>
      // </div>
    );
  }
}

export default App;
