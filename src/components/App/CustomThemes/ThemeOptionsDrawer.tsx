import React from "react";
import { Drawer } from "antd";
import ThemeOptionsComponent from "./ThemeOptionsComponent";

interface FilterDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const ThemeOptionsDrawer: React.FC<FilterDrawerProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Drawer
      title="Theme Studio"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
      width={300} // Customize the width as needed
    >
      <ThemeOptionsComponent />
    </Drawer>
  );
};

export default ThemeOptionsDrawer;
