import moment from "moment";

export const dataSource = [
  {
    key: "keywords",
    type: "SEARCH",
    label: "搜索",
    multiple: true,
    options: [
      { label: "考核月份", value: "title" },
      { label: "设备名称", value: "num" },
      { label: "供应商", value: "main" },
      { label: "抄送", value: "copy" },
      { label: "签发人", value: "issuer" }
    ]
  },
  {
    key: "date",
    type: "DATERANGE",
    label: "时间筛选",
    dropDownData: [
      { value: "naqiDate", label: "到货纳期0" },
      { value: "kaoheDate", label: "考核时间" }
    ],
    options: [
      {
        key: "3days",
        label: "3天内",
        value: [
          moment()
            .add(-3, "days")
            .startOf("day"),
          moment().endOf("day")
        ]
      },
      {
        key: "5days",
        label: "5天内",
        value: [
          moment()
            .add(-5, "days")
            .startOf("day"),
          moment().endOf("day")
        ]
      },
      {
        key: "thisweek",
        label: "本周",
        // 本周开始 ~ 当前日期
        value: [moment().startOf("week"), moment().endOf("week")]
      },
      {
        key: "lastweek",
        label: "上周",
        value: [
          moment()
            .add(-1, "weeks")
            .startOf("week"),
          moment()
            .add(-1, "weeks")
            .endOf("week")
        ]
      },
      {
        key: "thismonth",
        label: "本月",
        // 本月开始 ~ 当前日期
        value: [moment().startOf("month"), moment().endOf("month")]
      },
      {
        key: "lastmonth",
        label: "上个月",
        value: [
          moment()
            .add(-1, "months")
            .startOf("month"),
          moment()
            .add(-1, "months")
            .endOf("month")
        ]
      },
      {
        key: "thisquarter",
        label: "本季度",
        // 本月开始 ~ 当前日期
        value: [moment().startOf("quarter"), moment().endOf("quarter")]
      },
      {
        key: "lastquarter",
        label: "上个季度",
        value: [
          moment()
            .add(-1, "quarters")
            .startOf("quarter"),
          moment()
            .add(-1, "quarters")
            .endOf("quarter")
        ]
      },
      {
        key: "thisyear",
        label: "今年",
        value: [moment().startOf("year"), moment().endOf("year")]
      }
    ]
  },
  {
    key: "status",
    type: "GENERAL",
    label: "状态",
    multiple: true,
    options: [
      { value: "1", label: "已收到协议未订货" },
      { value: "2", label: "未签协议" },
      { value: "3", label: "已订货图纸未确认" },
      { value: "4", label: "未到期" },
      { value: "5", label: "提前到期" },
      { value: "6", label: "按期到货" },
      { value: "7", label: "脱期未到" },
      { value: "8", label: "脱期到货" }
    ]
  }
];

// 将值转为 api 查询对象
export const value2filter = value => {
  const { extra: dateType, selectedKeys: [[beginTime, endTime] = []] = [] } =
    "date" in value ? value.date : {};
  const { extra: queryValue, selectedKeys: queryType } =
    "keywords" in value ? value.keywords : {};
  const { selectedKeys: [status] = [] } = "status" in value ? value.status : {};
  return { dateType, beginTime, endTime, queryValue, queryType, status };
};
// 将查询对象转为值
export const filter2value = filter => {
  const {
    dateType,
    beginTime,
    endTime,
    queryValue,
    queryType,
    status
  } = filter;

  const value = {};

  if ("dateType" in filter || "beginTime" in filter || "endTime" in filter) {
    value.date = {
      extra: dateType,
      selectedKeys: [[moment(beginTime), moment(endTime)]]
    };
  }

  if ("queryValue" in filter || "queryType" in filter) {
    value.keywords = { extra: queryValue, selectedKeys: queryType };
  }

  if ("status" in filter) {
    value.status = { selectedKeys: [status] };
  }

  return value;
};
