import React from "react";
import { Image, Avatar, Typography, Tag, Button } from "antd";
import AllStarLogoImage from "../../../assets/logo.png";
import { ApplicationUser } from "../../models";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { resetApplicationUser } from "../../redux/slice/user.slice";
import { RootState } from "../../redux/store";
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Link, Title, Text } = Typography;

const ProfileOptions: React.FC = () => {
  const history = useNavigate();

  const user: ApplicationUser = useAppSelector((s: RootState) => s.user);

  const dispatch = useAppDispatch();

  return (
    <div style={{ minWidth: "200px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Link href="http://allstarbpo.com/" target="_blank">
          <Image width={30} src={AllStarLogoImage} />
          All Star BPO
        </Link>
      </div>

      <br></br>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar size={50} icon={<UserOutlined />} />
          <Tag color="orange">{user.role}</Tag>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Title level={5}>{`${user.lastName},${user.firstName}`} </Title>
          <Text type="secondary">@{user.userName}</Text>
          <Button
            onClick={() => {
              history("/qa-portal/reset-password");
            }}
            type="link"
            // icon={<PoweroffOutlined />}
          >
            Reset Password
          </Button>
          <Button
            onClick={() => {
              history("/login");
              setTimeout(() => dispatch(resetApplicationUser()), 1000);
            }}
            type="link"
            icon={<PoweroffOutlined />}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOptions;
