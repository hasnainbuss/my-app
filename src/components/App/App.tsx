import "./App.scss";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "antd";
import NavBar from "./Navbar";
import SideBar from "./Sidebar";
import Login from "../Auth/Login";
import Portal from "../Portal/Portal";
import { GlobalOutlined, MailFilled, PhoneFilled } from "@ant-design/icons";
import { ApplicationUser } from "../models";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import withRequiredData from "../Common/Custom Hooks/withRequiredData";
import { useTheming } from "../Common/Custom Hooks/ThemeOptionsContext";

const { Header, Footer, Sider, Content } = Layout;

const App: React.FC = () => {
  const user: ApplicationUser = useAppSelector((s: RootState) => s.user);

  const { themeOptions } = useTheming();

  const backgroundColor: string = getBackGroundColor(
    themeOptions.pageStyleSetting
  );

  const primaryColorStyle = {
    backgroundColor: backgroundColor,
    height: "80px",
  };

  function getBackGroundColor(hexColor: string): string {
    return hexColor === "light" ? "white" : "#001529";
  }

  return (
    <Layout className="App">
      {themeOptions.navigationMode === "left" ? (
        <Sider
          breakpoint="lg"
          collapsible
          collapsedWidth={80}
          width={160}
          theme={themeOptions.pageStyleSetting === "dark" ? "dark" : "light"}
        >
          <SideBar />
        </Sider>
      ) : null}

      <Layout style={{ background: "lightgray" }}>
        <Header style={primaryColorStyle}>
          <NavBar />
        </Header>

        <Content>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="*"
              element={
                !user?.firstName ? (
                  <Navigate to="/login" />
                ) : (
                  <Routes>
                    <Route path="/web-template/*" element={<Portal />} />
                  </Routes>
                )
              }
            />
            {/* <Route path="/web-template/*" element={<Portal />} /> */}
          </Routes>
        </Content>

        <Footer>
          <span>
            <PhoneFilled style={{ color: "#dbdbdb" }} />
            <a href="tel:+92-3315890467" style={{ color: "#dbdbdb" }}>
              +92-331-5890467
            </a>
          </span>
          <a
            href="https://technationals.com/"
            style={{ color: "#dbdbdb" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Copyright {new Date().getFullYear()} © Tech Nationals{" "}
            <GlobalOutlined />
          </a>
          <span>
            <a
              href="mailto: info@technationals.com?subject=Jornaya Archive Portal Inquiry"
              style={{ color: "#dbdbdb" }}
            >
              info@technationals.com
            </a>
            <MailFilled style={{ color: "#dbdbdb" }} />
          </span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default withRequiredData(App);
