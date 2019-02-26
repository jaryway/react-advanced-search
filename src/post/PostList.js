import React, { Component } from "react";
import higherOrderComponent from "./Wrap";

class PostList extends Component {
  // state = {
  //   list: []
  // };
  state = {
    data: []
  };
  onClick = () => {
    this.setState(prev => ({ data: [...prev.data, Date()] }));
  };
  render() {
    const { onItemClick } = this.props;
    console.log("sssshandleChange", this.state);
    return (
      <div onClick={onItemClick}>
        <p>Click Me</p>
        <div onClick={this.onClick}>Click Me</div>
      </div>
    );
  }
}

export default higherOrderComponent(PostList);
