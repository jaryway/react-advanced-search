/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PropTypes from "prop-types";

import moment from "moment";
import { DatePicker } from "antd";
import { onItemClick, OPTION, CUSTOM } from "./utils";
import Container from "./Container";
import styles from "./style";

const getMinDate = (...rest) => {
  const dates = rest.filter(m => m);
  if (!dates.length) return undefined;
  return moment.min(...dates);
};
const getMaxDate = (...rest) => {
  const dates = rest.filter(m => m);
  if (!dates.length) return undefined;
  return moment.max(...dates);
};

class DateRangeItem extends Component {
  static propTypes = {
    onCollapsed: PropTypes.func,
    onRef: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.onItemClick = onItemClick.bind(this);

    this.state = {
      mode: OPTION,
      ...("value" in props ? props.value : { selectedKeys: [], extra: "" })
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      data: { options }
    } = nextProps;

    if ("value" in nextProps) {
      const { value = {} } = nextProps;
      const hintOptions = options.some(m => (value.selectedKeys || []).includes(m.value));
      this.setState({
        ...nextProps.value,
        mode: hintOptions ? OPTION : CUSTOM
      });
    }
  }

  _onDateChange = dateType => date => {
    const { mode, selectedKeys } = this.state;
    let [[start, end] = []] = selectedKeys || [];

    start = dateType === "start" ? date : mode === CUSTOM ? start : undefined;
    end = dateType === "end" ? date : mode === CUSTOM ? end : undefined;

    this.setState({
      mode: CUSTOM,
      ...("value" in this.props ? {} : { selectedKeys: [[start, end]] })
    });
    this.triggerChange({ selectedKeys: [[start, end]] });
  };

  _onSelectChange = selectedKey => {
    this.setState({
      ...("value" in this.props ? {} : { extra: selectedKey })
    });
    this.triggerChange({ extra: selectedKey });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    const { selectedKeys, extra } = this.state;

    onChange && onChange({ selectedKeys, extra, ...changedValue });
  };

  disabledStartDate = current => {
    const { mode, selectedKeys } = this.state;
    const [[start, end] = []] = selectedKeys || [];

    const {
      data: { minDate = moment().add(-20, "days"), maxDate }
    } = this.props;

    const endDate = mode === CUSTOM ? end : null;
    const maxValue = getMinDate(maxDate, endDate);

    if (!current) return false;

    if (minDate && maxValue)
      return current.valueOf() < minDate.valueOf() || current.valueOf() > maxValue.valueOf();

    if (minDate) return current.valueOf() < minDate.valueOf();
    if (maxValue) return current.valueOf() > maxValue.valueOf();

    return false;
  };

  disabledEndDate = current => {
    const { mode, selectedKeys } = this.state;
    const [[start] = []] = selectedKeys || [];
    const {
      data: { minDate, maxDate }
    } = this.props;

    const startDate = mode === CUSTOM ? start : undefined;
    const minValue = getMaxDate(minDate, startDate);

    if (!current) return false;

    if (minValue && maxDate)
      return current.valueOf() < minValue.valueOf() || current.valueOf() > maxDate.valueOf();

    if (minValue) return current.valueOf() < minValue.valueOf();
    if (maxDate) return current.valueOf() > maxDate.valueOf();

    return false;
  };

  render() {
    const { collapsed, viewMoreVisible, onRef, onCollapsed, data } = this.props;
    const { label, options, multiple, dropDownData = [] } = data || {};
    const { selectedKeys = [], mode, extra } = this.state;
    const [[start, end] = []] = selectedKeys;

    if (!data) return null;
    return (
      <Container
        {...{
          label,
          options,
          multiple,
          collapsed,
          selectedKeys,
          viewMoreVisible,
          onRef,
          onCollapsed,
          dropDownData,
          dropDownValue: extra,
          onSelectChange: this._onSelectChange,
          onItemClick: this.onItemClick
        }}
      >
        <div className={styles["date-picker"]}>
          <DatePicker
            placeholder={"开始"}
            onChange={this._onDateChange("start")}
            value={mode === CUSTOM ? start : undefined}
            disabledDate={this.disabledStartDate}
          />
          -
          <DatePicker
            placeholder={"结束"}
            onChange={this._onDateChange("end")}
            value={mode === CUSTOM ? end : undefined}
            disabledDate={this.disabledEndDate}
          />
        </div>
      </Container>
    );
  }
}

export default DateRangeItem;
