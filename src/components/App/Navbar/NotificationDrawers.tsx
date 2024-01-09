import React from "react";
import { Alert } from "antd";
import NotificationItem from "./NotificationItem";
import "./Navbar.scss";
import { IState } from "../../models";
import { NotificationModel } from "../../models/NotificationModel";
import { useSelector } from "react-redux";

const NotificationDrawer: React.FC = () => {
  const reduxNotifications = useSelector(
    (state: IState) => state.Notifications
  );

  return (
    <div
      className="notification-drawer"
      style={{ maxHeight: 400, overflow: "auto", margin: -11 }}
    >
      {reduxNotifications?.length > 0 ? (
        reduxNotifications.map((item: NotificationModel) => (
          <NotificationItem
            key={item.id}
            id={item.id}
            title={item.title}
            type={item.type}
            message={item.message}
          />
        ))
      ) : (
        <Alert
          message="No New Notifications"
          description="You have no new notifications"
          type="info"
          closable={false}
        />
      )}
    </div>
  );
};

export default NotificationDrawer;
