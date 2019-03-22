import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
// import moment from "moment";
import DateRangeItem from "./DateRangeItem";
import SearchItem from "./SearchItem";
import GeneralItem from "./GeneralItem";
import * as utils from "./utils";

import styles from "./style";

export const DATERANGE = utils.DATERANGE;
export const SEARCH = utils.SEARCH;
export const GENERAL = utils.GENERAL;
// console.log(DATERANGE)
const components = {
  [DATERANGE]: DateRangeItem,
  [SEARCH]: SearchItem,
  [GENERAL]: GeneralItem
};

export default class AdvancedSearch extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    dataSource: PropTypes.array,
    value: PropTypes.object
  };

  elements = {};

  constructor(props) {
    super(props);
    this.state = {
      collapsed: {},
      viewMoreVisible: {},
      value: "value" in props ? props.value || {} : {}
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.changeViewMoreVisible);
    setTimeout(() => this.changeViewMoreVisible());
  }

  componentWillReceiveProps(nextProps) {
    // const { value } = nextProps;

    if ("value" in nextProps) {
      const { value = {} } = nextProps;
      this.setState({ value });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.changeViewMoreVisible);
  }

  _onCollapsed = key => () => {
    this.setState(prev => ({
      collapsed: {
        ...prev.collapsed,
        [key]: !prev.collapsed[key]
      }
    }));
  };

  changeViewMoreVisible = () => {
    const items = Object.keys(this.elements);

    if (!items.length) return;

    const viewMoreVisible = items.reduce((prev, current) => {
      const element = this.elements[current];
      const { height } = findDOMNode(element).getBoundingClientRect();
      return { ...prev, [current]: height > 36 };
    }, {});

    this.setState({ viewMoreVisible });
  };

  _onItemChange = key => changedValue => {
    // console.log("item onchange", key, changedValue);
    if (!("value" in this.props)) {
      this.setState(prev => ({
        value: { ...prev.value, [key]: changedValue }
      }));
    }
    this.triggerChange({ [key]: changedValue });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    const { value } = this.state;

    onChange && onChange({ ...value, ...changedValue });
  };

  render() {
    const { dataSource, style, className } = this.props;
    const { collapsed, viewMoreVisible, value = {} } = this.state;
    const clsName = classNames(
      "advanced-search",
      styles["advanced-search"],
      className
    );
    // console.log("sdfsdf-sdf", value, collapsed);
    return (
      <div style={style} className={clsName}>
        {(dataSource || []).map(({ key, ...item }) => {
          const ItemComponent = components[item.type] || null;
          // console.log("key", key);
          return (
            ItemComponent && (
              <ItemComponent
                key={key}
                type={item.type}
                data={item}
                value={value[key] || {}}
                collapsed={collapsed[key]}
                viewMoreVisible={viewMoreVisible[key]}
                onRef={el => {
                  this.elements[key] = el;
                }}
                onCollapsed={this._onCollapsed(key)}
                onChange={this._onItemChange(key)}
              />
            )
          );
        })}
      </div>
    );
  }
}
