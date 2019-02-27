/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import classNames from "classnames";
import { Select } from "antd";

import styles from "./style";

const { Option } = Select;

export default ({
  label: typeName,
  options,
  multiple,
  collapsed,
  selectedKeys,
  viewMoreVisible,
  onRef,
  onCollapsed,
  onItemClick,
  dropDownData = [],
  dropDownValue,
  onSelectChange,
  children
}) => {
  // console.log("dropDownValue", dropDownValue || []);
  return (
    <div
      className={classNames("filter-item", styles["filter-item"])}
      style={{ height: collapsed ? 36 : "auto" }}
    >
      <strong className={styles["filter-type"]}>{typeName}：</strong>
      <div className={classNames("param-list", styles["param-list"])} ref={onRef}>
        {!!(dropDownData && dropDownData.length) && (
          <Select
            value={dropDownValue || []}
            placeholder="请选择..."
            className={styles["filter-select"]}
            onChange={onSelectChange}
            dropdownMatchSelectWidth={false}
          >
            {dropDownData.map(({ value, label }) => (
              <Option key={value} value={value} title={label}>
                {label}
              </Option>
            ))}
          </Select>
        )}
        {options.map(item => {
          const { key, value, label } = item;
          const checked = (selectedKeys || []).includes(value);
          return (
            <a
              onClick={onItemClick(item, multiple, checked)}
              className={checked ? "active" : null}
              href="javascript:;"
              title={label}
              key={key || value}
            >
              {label}
            </a>
          );
        })}
        {children}
      </div>
      {viewMoreVisible && (
        <a href="javascript:;" className={styles["view-more"]} onClick={onCollapsed}>
          {collapsed ? "更多" : "收起"}
        </a>
      )}
    </div>
  );
};
