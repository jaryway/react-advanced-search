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
      selectedKeys =
        type !== DATERANGE && multiple ? [...selectedKeys, value] : [value];
    }
    this.setState({
      mode: OPTION,
      ...("value" in this.props ? {} : { selectedKeys })
    });

    this.triggerChange({ selectedKeys });
  };
}
