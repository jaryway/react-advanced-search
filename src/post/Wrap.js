import React from "react";
// This function takes a component...
function higherOrderComponent(WrappedComponent) {
  // ...and returns another component...
  return class HigherOrderComponent extends WrappedComponent {
    constructor(props) {
      super(props);
      // this.handleChange = this.handleChange.bind(this);
      // this.state = {
      //   data: []
      // };
    }

    // componentDidMount() {
    //   // ... that takes care of the subscription...
    //   DataSource.addChangeListener(this.handleChange);
    // }

    // componentWillUnmount() {
    //   DataSource.removeChangeListener(this.handleChange);
    // }

    handleChange = () => {
      const { data } = this.state;
      console.log("data", data);
      this.setState(prev => ({ data: [...prev.data, Math.random()] }));
      console.log("handleChange", this.state);
      //   this.setState({
      //     data: selectData(DataSource, this.props)
      //   });
    };

    render() {
      // return <div>{super.render()}</div>;

      // console.log("sssdsd", this.state);
      // // ... and renders the wrapped component with the fresh data!
      // // Notice that we pass through any additional props
      return (
        <WrappedComponent {...this.props} onItemClick={this.handleChange} />
      );
    }
  };
}

export default higherOrderComponent;
