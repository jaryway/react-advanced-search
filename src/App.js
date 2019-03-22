import React, { Component } from "react";
import moment from "moment";
import AdvancedSearch from "./AdvancedSearch";
import { dataSource, filter2value, value2filter } from "./utils";

import "./App.css";
import "antd/dist/antd.css";

class App extends Component {
  state = {
    filter: {
      beginTime: "2019-03-16T16:00:00.000Z",
      endTime: "2019-03-23T15:59:59.999Z"
    }
  };
  _onFilterChange = value => {
    console.log("_onFilterChange", JSON.stringify(value2filter(value)));
    this.setState({ filter: value2filter(value) }, () => {
      // todo fetch data
    });
  };
  render() {
    const { filter } = this.state;
    return (
      <div style={{ margin: 8, marginTop: 80 }}>
        <AdvancedSearch
          value={filter2value(filter || {})}
          dataSource={dataSource}
          onChange={this._onFilterChange}
        />
      </div>
    );
  }
}

export default App;
