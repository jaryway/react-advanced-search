import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";
import DateRangeItem from "./DateRangeItem";
import SearchItem from "./SearchItem";
import { DATERANGE, SEARCH } from "./utils";

import styles from "./style";

const components = {
  [DATERANGE]: DateRangeItem,
  [SEARCH]: SearchItem
};

const data = [
  {
    key: "1",
    type: "SEARCH",
    label: "品牌",
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
  },
];

export default class AdvancedFilter extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    collapsed: {},
    viewMoreVisible: {},
    value: {
      "1": { selectedKeys: ["2GB"], extra: "ddsds" },
      "2": { selectedKeys: [[moment()]], extra: "naqiDate" }
    }
  };
  elements = {};

  _onCollapsed = key => () => {
    this.setState(prev => ({
      collapsed: {
        ...prev.collapsed,
        [key]: !prev.collapsed[key]
      }
    }));
  };

  componentDidMount() {
    window.addEventListener("resize", this.changeViewMoreVisible);
    setTimeout(() => this.changeViewMoreVisible());
  }

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

  componentWillUnmount() {
    window.removeEventListener("resize", this.changeViewMoreVisible);
  }

  _onItemChange = key => changedValue => {
    console.log("item onchange", key, changedValue);
    this.setState(prev => ({ value: { ...prev.value, [key]: changedValue } }));
  };

  render() {
    const { collapsed, viewMoreVisible, value } = this.state;
    return (
      <div className={classNames("advanced-filter", styles["advanced-filter"])}>
        {data.map(({ key, ...item }) => {
          const ItemComponent = components[item.type] || null;

          return (
            ItemComponent && (
              <ItemComponent
                key={key}
                type={item.type}
                data={item}
                value={value[key]}
                collapsed={collapsed[key]}
                viewMoreVisible={viewMoreVisible[key]}
                onRef={el => (this.elements[key] = el)}
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
