import moment from "moment";
export const SEARCH = "SEARCH";
export const DATERANGE = "DATERANGE";
// export const DROPSEARCH = "DROPSEARCH";
export const GENERAL = "GENERAL";
export const OPTION = "OPTION"; // 选项模式
export const CUSTOM = "CUSTOM"; // 自定义模式

export function onItemClick(item) {
  return () => {
    const {
      data: { type, multiple }
    } = this.props;
    const { value } = item;
    let { selectedKeys = [] } = this.state;
    // const { onChange } = this.props;

    // 已经存在
    if (selectedKeys.includes(value)) {
      selectedKeys = selectedKeys.filter(m => m !== value);
    } else {
      // console.log("ssssdsdsdsd", multiple);
      selectedKeys = type !== DATERANGE && multiple ? [...selectedKeys, value] : [value];
    }
    this.setState({
      mode: OPTION,
      ...("value" in this.props ? {} : { selectedKeys })
    });

    this.triggerChange({ selectedKeys });
  };
}

/**
 * value 为控件的值，
 * filter 为 ajax 的 params 对象
 * 一般的，filter 的结构为 {"filed1":value}, value 的 结构为 {key:{extra:"",selectedKeys:[]}},
 * 两者互转的方法如下：
 */

/**
 * 将 value 转成 filter 对象
 * @param {Object} value
 * @param {Array} dataSource
 */
export const value2filter = (value, dataSource) => {
  return dataSource
    .map(item => {
      // 没有这个值
      if (!(item.key in value)) return {};

      const itemValue = value[item.key];

      switch (item.type) {
        case "SEARCH": {
          // 设置 filter 的字段名称
          const [queryValue = "queryValue", queryType = "queryType"] = item.filterKeyNames || [];

          return {
            [queryValue]: itemValue.extra,
            [queryType]: itemValue.selectedKeys && itemValue.selectedKeys.join(",")
          };
        }

        case "DATERANGE": {
          const [dateType = "dateType", beginTime = "beginTime", endTime = "endTime"] =
            item.filterKeyNames || [];

          const [[beginTimeValue, endTimeVlaue] = []] = itemValue.selectedKeys;
          return {
            [dateType]: itemValue.extra,
            [beginTime]: beginTimeValue,
            [endTime]: endTimeVlaue
          };
        }

        // GENERAL
        case "GENERAL":
        default:
          return { [item.key]: itemValue.selectedKeys && itemValue.selectedKeys.join(",") };
      }
    })
    .reduce((prev, current) => ({ ...prev, ...current }), {});
};

/**
 *
 * @param {Object} filter
 * @param {Array} dataSource
 */
export const filter2value = (filter, dataSource) => {
  return dataSource
    .map(item => {
      switch (item.type) {
        case "SEARCH": {
          // 设置 filter 的字段名称
          const [queryType = "queryType", queryValue = "queryValue"] = item.filterKeyNames || [];

          if (!(queryValue in filter || queryType in filter)) return {};

          return {
            [item.key]: {
              extra: filter[queryValue],
              selectedKeys: filter[queryType] && filter[queryType].split(",")
            }
          };
        }

        case "DATERANGE": {
          // 设置 filter 的字段名称
          const [dateType = "dateType", beginTime = "beginTime", endTime = "endTime"] =
            item.filterKeyNames || [];

          if (!(dateType in filter || beginTime in filter || endTime in filter)) return {};

          const beginTimeValue = filter[beginTime];
          const endTimeValue = filter[endTime];

          return {
            [item.key]: {
              extra: filter[dateType],
              selectedKeys: [
                [beginTimeValue && moment(beginTimeValue), endTimeValue && moment(endTimeValue)]
              ]
            }
          };
        }

        case "GENERAL":
        default: {
          if (!(item.key in filter)) return {};

          return {
            [item.key]: {
              selectedKeys: filter[item.key] && filter[item.key].split(",")
            }
          };
        }
      }
    })
    .reduce((prev, current) => ({ ...prev, ...current }), {});
};
