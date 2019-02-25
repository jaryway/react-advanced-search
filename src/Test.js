import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Test extends Component {
  static contextTypes = {
    store: PropTypes.object
  };
  render() {
    console.log("ssssssssssssssssssss", this.context);
    return <div>Test</div>;
  }
}

export default connect(state => {
  console.log("sdsfda", state);
  return { ...state };
})(Test);
