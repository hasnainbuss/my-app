import React from "react";
import { Drawer } from "antd";

interface FilterDrawerProps {
  children?: React.ReactNode;
  isVisible?: boolean;
  placement?: string;
  toogleVisibility: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = (
  props: FilterDrawerProps
) => {
  function onClose() {
    props.toogleVisibility();
  }

  // const { themeOptions } = useTheming();

  // const fontColor: string = getFontColor(themeOptions.pageStyleSetting);

  // const backgroundColor: string = getBackGroundColor(
  //   themeOptions.pageStyleSetting
  // );

  // const primaryColorStyle = {
  //   backgroundColor: backgroundColor,
  //   color: fontColor, // You can set the text color accordingly
  // };

  // function getFontColor(hexColor: string): string {
  //   return hexColor === "light" ? "black" : "white";
  // }

  // function getBackGroundColor(hexColor: string): string {
  //   return hexColor === "light" ? "white" : "black";
  // }

  return (
    <Drawer
      className="FilterDrawer"
      title="Applied Filters"
      placement="right"
      width={"290px"}
     // bodyStyle={primaryColorStyle}
      closable
      onClose={onClose}
      visible={props.isVisible}
    >
      {props.children}
    </Drawer>
  );
};
export default FilterDrawer;
