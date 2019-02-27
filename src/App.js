import React, { Component } from "react";
import logo from "./logo.svg";
import dynamic from "./utils/dynamic";
import { Provider, ReactReduxContext } from "react-redux";
// import { ReactReduxContext } from "react-redux";
import moment from "moment";
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

const data = [
  {
    key: "1",
    type: "SEARCH",
    label: "内存大小",
    options: [
      { value: "128GB及以上", label: "128GB及以上" },
      { value: "64GB", label: "64GB" },
      { value: "32GB", label: "32GB" },
      { value: "16GB", label: "16GB" },
      { value: "8GB", label: "8GB" },
      { value: "4GB", label: "4GB" },
      { value: "2GB", label: "2GB" },
      { value: "1GB", label: "1GB" }
    ],
    multiple: false
  },
  {
    key: "4",
    type: "GENERAL",
    label: "通用",
    options: [
      { value: "128GB及以上", label: "128GB及以上" },
      { value: "64GB", label: "64GB" },
      { value: "32GB", label: "32GB" },
      { value: "16GB", label: "16GB" },
      { value: "8GB", label: "8GB" },
      { value: "4GB", label: "4GB" },
      { value: "2GB", label: "2GB" },
      { value: "1GB", label: "1GB" },
      { value: "1", label: "其他" }
    ],
    multiple: true
  },
  {
    key: "2",
    type: "DATERANGE",
    label: "日期",
    // minDate: null,
    maxDate: moment(),
    options: [
      {
        value: [moment().startOf("week"), moment().endOf("week")],
        label: "本周"
      },
      {
        value: [moment().startOf("month"), moment().endOf("month")],
        label: "本月"
      },
      {
        value: [
          moment()
            .add(-1, "months")
            .startOf("month"),
          moment()
            .add(-1, "months")
            .endOf("month")
        ],
        label: "上个月"
      },
      {
        value: [moment().startOf("year"), moment().endOf("year")],
        label: "今年"
      }
      // { value: "", label: "8GB" },
      // { value: "4GB", label: "4GB" },
      // { value: "2GB", label: "2GB" },
      // { value: "1GB", label: "1GB" },
      // { value: "1", label: "128GB及以上" },
      // { value: "2", label: "128GB及以上" },
      // { value: "3", label: "128GB及以上" },
      // { value: "4", label: "128GB及以上" },
      // { value: "5", label: "128GB及以上" },
      // { value: "6", label: "128GB及以上" }
    ],
    multiple: true
  },
  {
    key: "3",
    type: "NORMAL",
    label: "状态",
    options: [
      { value: "128GB及以上", label: "128GB及以上" },
      { value: "64GB", label: "64GB" },
      { value: "32GB", label: "32GB" },
      { value: "16GB", label: "16GB" },
      { value: "8GB", label: "8GB" },
      { value: "4GB", label: "4GB" },
      { value: "2GB", label: "2GB" },
      { value: "1GB", label: "1GB" },
      { value: "1", label: "128GB及以上" },
      { value: "2", label: "128GB及以上" },
      { value: "3", label: "128GB及以上" },
      { value: "4", label: "128GB及以上" },
      { value: "5", label: "128GB及以上" },
      { value: "6", label: "128GB及以上" }
    ],
    multiple: true
  }
];

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <Test /> */}
        {/* <Test1 /> */}
        <PostList />
        <AdvancedSearch dataSource={data} onChange={() => {}} />
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
