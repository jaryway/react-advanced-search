import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect, ReactReduxContext } from "react-redux";

export class Test1 extends Component {
  //   static propTypes = {
  //     context: PropTypes.object
  //   };

  static contextTypes = {
    
    store: PropTypes.object
  };

  //   static contextType = ReactReduxContext;

  render() {
    console.log("Test1 render", this.context);
    return <div>test1sss</div>;
  }
}
export default Test1;
// const mapStateToProps = state => ({
//   user: { name: "xiaoming" }
// });

// const mapDispatchToProps = {};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Test1);
