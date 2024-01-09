import React from "react";
import { Alert } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { NotificationModel } from "../../models";

const NotificationItem: React.FC<NotificationModel> = (
  props: NotificationModel
) => {
  let notification = props;
  //   const [notification, setNotification] = useState(notificationItem);

  return (
    <div className="NotificationItem">
      <Alert
        message={<p>{notification.title}</p>}
        description={notification.message}
        type={notification.type}
        showIcon
        closeText={<CloseCircleOutlined />}
        // afterClose={() =>
        //   dispach(notificationActions.state.removeNotification(notification.id))
        // }
      />
    </div>
  );
};

export default NotificationItem;
