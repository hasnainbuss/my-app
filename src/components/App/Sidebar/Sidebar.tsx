import "./Sidebar.scss";
import React from "react";
import { Link } from "react-router-dom";
import { Menu, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useTheming } from "../../Common/Custom Hooks/ThemeOptionsContext";
import { ApplicationUser } from "../../models";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import QCPortalMenu from "../../Configurations/WebPortalMenu";

const { Text } = Typography;

const SideBar: React.FC = () => {
  const user: ApplicationUser = useAppSelector((s: RootState) => s.user);

  const { themeOptions } = useTheming();

  const fontColor: string = getContrastColor(themeOptions.pageStyleSetting);

  const primaryColorStyle = {
    color: fontColor, // You can set the text color accordingly
  };

  function getContrastColor(hexColor: string): string {
    return hexColor === "light" ? "black" : "white";
  }

  let menuItemId = 1;

  if (!user.firstName) {
    // If user not logged in
    return null;
  }

  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <Avatar style={primaryColorStyle} icon={<UserOutlined />} />
        <Text style={primaryColorStyle} className="sidebar-titile-text">
          {user?.firstName + " " + user.lastName}
        </Text>
      </div>

      <Menu
        inlineIndent={5}
        theme={themeOptions.pageStyleSetting === "dark" ? "dark" : "light"}
        mode="inline"
        items={QCPortalMenu.filter(
          (item) => user.role && item.role.indexOf(user.role) !== -1
        ).map((item) => ({
          label: (
            <Link key={menuItemId++} to={item.url}>
              <span className="nav-text">{item.label}</span>
            </Link>
          ),
          key: item.key,
        }))}
      />

      <div className="sidebar-footer"> </div>
    </div>
  );
};

export default SideBar;
