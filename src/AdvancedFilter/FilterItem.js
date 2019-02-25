/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
// import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";
import { Input, DatePicker } from "antd";

import { DATERANGE, SEARCH, DROPSEARCH } from "./type";

import styles from "./style";

// import moment = require("moment");
const OPTION_MODE = "OPTION_MODE"; // 选项模式
const CUSTOM_MODE = "CUSTOM_MODE"; // 自定义模式

const getMinDate = (...rest) => {
  const dates = rest.filter(m => m);
  if (!dates.length) return null;
  return moment.min(...dates);
};
const getMaxDate = (...rest) => {
  const dates = rest.filter(m => m);
  if (!dates.length) return null;
  return moment.max(...dates);
};

// 获取 最大的结束时间，2019-1-2，2018-1-3，取 2019-1-2
const getMaxEndDate = (...rest) => {
  if (!rest.length) return null;
  return moment.min(...rest);
};

const getMinStartDate = (...rest) => {
  const dates = rest.filter(m => m);
  if (!dates.length) return null;
  return moment.max(...dates);
};

export default class AdvancedFilter extends Component {
  static propTypes = {
    onCollapsed: PropTypes.func,
    onRef: PropTypes.func
  };

  state = {
    selectedKeys: [],
    mode: OPTION_MODE
  };

  _onDateChange = dateType => (date, dateString) => {
    if (dateType === "start") console.log("_onDateChange", date, dateString);
    if (dateType === "end") console.log("_DateChange", date, date);
    let {
      selectedKeys: [[start, end] = []]
    } = this.state;
    start = dateType === "start" ? date : start;
    end = dateType === "end" ? date : end;

    this.setState({
      selectedKeys: [[start, end]],
      mode: CUSTOM_MODE
    });

    // console.log("");
  };

  disabledStartDate = current => {
    const {
      mode,
      selectedKeys: [[start, end] = []]
    } = this.state;
    const {
      data: { minDate, maxDate }
    } = this.props;

    const endDate = mode === CUSTOM_MODE ? end : null;
    const maxValue = getMinDate(maxDate, endDate);

    if (!current) return false;

    if (minDate && maxValue)
      return (
        current.valueOf() < minDate.valueOf() ||
        current.valueOf() > maxValue.valueOf()
      );

    if (minDate) return current.valueOf() < minDate.valueOf();
    if (maxValue) return current.valueOf() > maxValue.valueOf();

    return false;
  };

  disabledEndDate = current => {
    const {
      mode,
      selectedKeys: [[start, end] = []]
    } = this.state;
    const {
      data: { minDate, maxDate }
    } = this.props;

    const startDate = mode === CUSTOM_MODE ? start : null;
    const minValue = getMaxDate(minDate, startDate);
    const maxValue = maxDate;

    if (!current) return false;

    if (minValue && maxValue)
      return (
        current.valueOf() < minValue.valueOf() ||
        current.valueOf() > maxValue.valueOf()
      );

    if (minValue) return current.valueOf() < minDate.valueOf();
    if (maxValue) return current.valueOf() > maxValue.valueOf();

    return false;
  };

  // 渲染附加内容
  renderExtraContent = () => {
    // const extra = { type: "SEARCH" };
    const { data } = this.props;
    const { type, minDate, maxDate, options } = data;
    const { selectedKeys } = this.state;

    if (type === SEARCH) {
      return <Input.Search placeholder={"请输入关键字"} />;
    }

    if (type === DATERANGE) {
      const [[start, end] = []] = selectedKeys;

      console.log("canSetDatePickerValue", selectedKeys);

      // 如果前面的命中选项中有选中了，则把日期选择器的值清空
      const canSetStartValue =
        selectedKeys.length > 0 &&
        options.every(m => !selectedKeys.includes(m.value));

      return (
        <div className={styles["date-picker"]}>
          <DatePicker
            placeholder={"开始"}
            onChange={this._onDateChange("start")}
            // defaultValue={}
            value={canSetStartValue ? start : null}
            disabledDate={this.disabledStartDate}
            /*disabledDate={current => {
              const endDate = getMaxEndDate(maxDate, end);
              if (minDate && endDate)
                return current < minDate || current > endDate;

              if (minDate) return current < moment(minDate);
              if (endDate) return current > moment(endDate);

              return false;
            }}*/
          />
          -
          <DatePicker
            placeholder={"结束"}
            onChnage={this._onDateChange("end")}
            disabledDate={this.disabledEndDate}
          />
        </div>
      );
    }
    return null;
  };

  _onItemClick = item => () => {
    const { type, multiple } = this.props;
    const { value } = item;
    let { selectedKeys } = this.state;
    const { onChange } = this.props;

    // 已经存在
    if (selectedKeys.includes(value)) {
      selectedKeys = selectedKeys.filter(m => m !== value);
    } else {
      selectedKeys =
        type !== DATERANGE && multiple ? [...selectedKeys, value] : [value];
    }

    this.setState({ selectedKeys });
    onChange && onChange(selectedKeys);
    console.log("_onItemClick", selectedKeys);
  };

  render() {
    const { collapsed, viewMoreVisible, onRef, onCollapsed, data } = this.props;
    const { label, options, multiple } = data || {};
    const { selectedKeys = [] } = this.state;

    if (!data) return null;

    return (
      <div
        className={classNames("filter-item", styles["filter-item"])}
        style={{ height: collapsed ? 36 : "auto" }}
      >
        <strong className={styles["filter-type"]}>{label}：</strong>
        <div
          className={classNames("param-list", styles["param-list"])}
          ref={onRef}
        >
          {options.map(item => {
            const { value, label } = item;
            const checked = (selectedKeys || []).includes(value);
            return (
              <a
                onClick={this._onItemClick(item, multiple, checked)}
                className={checked ? "active" : null}
                href="javascript:;"
                title={label}
                key={value}
              >
                {label}
              </a>
            );
          })}

          {this.renderExtraContent()}
          {/* <div className={styles["date-picker"]}>
            <DatePicker placeholder={"开始"} /> -
            <DatePicker placeholder={"结束"} />
          </div> */}
        </div>
        {viewMoreVisible && (
          <a
            href="javascript:;"
            className={styles["view-more"]}
            onClick={onCollapsed}
          >
            {collapsed ? "更多" : "收起"}
          </a>
        )}
      </div>
    );
  }
}
