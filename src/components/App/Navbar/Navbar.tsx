import "./Navbar.scss";
import React, { useState } from "react";
import { Popover, Typography, Badge, Button, Avatar, Menu } from "antd";
import { BellOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import NotificationDrawer from "./NotificationDrawers";
import QCPortalMenu from "../../Configurations/WebPortalMenu";
import { useTheming } from "../../Common/Custom Hooks/ThemeOptionsContext";
import { ApplicationUser, NotificationModel, IState } from "../../models";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import ProfileOptions from "./ProfileOptions";
import ThemeOptionsDrawer from "../CustomThemes/ThemeOptionsDrawer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const { Title } = Typography;

const NavBar: React.FC = () => {
  const user: ApplicationUser = useAppSelector((s: RootState) => s.user);

  const [drawerVisible, setDrawerVisible] = useState(false);

  const [notificationDrawerVisibility, setNotificationDrawerVisibility] =
    useState(false);
  const [profileOptionsVisibility, setProfileOptionsVisibility] =
    useState(false);
  const reduxNotifications: NotificationModel[] = useSelector(
    (state: IState) => state.Notifications
  );

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const content = <NotificationDrawer />;
  const profileOptions = <ProfileOptions />;

  const { themeOptions } = useTheming();

  const fontColor: string = getFontColor(themeOptions.pageStyleSetting);

  const backgroundColor: string = getBackGroundColor(
    themeOptions.pageStyleSetting
  );

  const primaryColorStyle = {
    backgroundColor: backgroundColor,
    color: fontColor, // You can set the text color accordingly
  };

  function getFontColor(hexColor: string): string {
    return hexColor === "light" ? "black" : "white";
  }

  function getBackGroundColor(hexColor: string): string {
    return hexColor === "light" ? "white" : "black";
  }

  let menuItemId = 1;

  if (!user.firstName) {
    // If user not logged in
    return null;
  }

  return (
    <div style={primaryColorStyle} className="navbar">
      <Title style={primaryColorStyle} level={3}>
        {user?.firstName ? "All Star QA Portal" : "ALL STAR BPO"}
      </Title>

      {themeOptions.navigationMode === "top" ? (
        <Menu
          inlineIndent={5}
          style={{ width: "895px" }}
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
      ) : null}

      {user.firstName && (
        <>
          <div>
            <Button onClick={showDrawer} icon={<SettingOutlined />}></Button>
            <ThemeOptionsDrawer visible={drawerVisible} onClose={closeDrawer} />
          </div>
          <div style={{ lineHeight: 0 }}>
            <Popover
              className="notification-icon"
              placement="bottomLeft"
              trigger="click"
              visible={notificationDrawerVisibility}
              onVisibleChange={() =>
                setNotificationDrawerVisibility(!notificationDrawerVisibility)
              }
              content={content}
            >
              <Badge
                count={reduxNotifications ? reduxNotifications.length : 0}
                overflowCount={10}
              >
                <Button
                  className="transparent-button"
                  style={primaryColorStyle}
                  icon={<BellOutlined />}
                />
              </Badge>
            </Popover>

            <Popover
              placement="bottomLeft"
              trigger="click"
              visible={profileOptionsVisibility}
              onVisibleChange={() =>
                setProfileOptionsVisibility(!profileOptionsVisibility)
              }
              content={profileOptions}
            >
              <Button className="transparent-button">
                <Avatar style={{ border: 0, background: "#1890ff" }}>
                  {user.firstName ? (
                    `${user.firstName?.charAt(0).toUpperCase()}${user.lastName
                      ?.charAt(0)
                      .toUpperCase()}`
                  ) : (
                    <UserOutlined />
                  )}
                </Avatar>
              </Button>
            </Popover>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
