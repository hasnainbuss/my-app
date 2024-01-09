import React, { FC, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { ApplicationUser } from "../../models";
import { Result, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import windowConfig from "../../Configurations/config";
import { Roles } from "../../../Constants";

const withRequiredData = (ChildComponent: FC) => (props: any) => {
  
  let user: ApplicationUser = useAppSelector((s: RootState) => s.user);
  const navigate = useNavigate();

  const [state, setState] = useState({
    loadingRequiredData: false,
    isError: false,
  });

  const dispatch = useAppDispatch();

  async function fetchInitialData() {}

  async function checkBackendAndFetchData() {
    try {
      const res = await fetch(`${windowConfig.API_URL}`);
      if (res.ok) {
        if (user.token) {
          setState({
            ...state,
            loadingRequiredData: true,
          });
          await fetchInitialData();
          setState({ ...state, loadingRequiredData: false });
          // redirectToHome(user);
        }
      } else {
        setState({
          ...state,
          isError: true,
        });
      }
    } catch (error) {
      setState({
        ...state,
        isError: true,
      });
    }
  }

  function redirectToHome(user: ApplicationUser) {
    switch (user.role) {
      case Roles.SUPER_ADMIN:
        navigate("/web-template/users");
        break;
      case Roles.ADMIN:
        navigate("/web-template/users");
        break;
      case Roles.DEVELOPER:
        navigate("/web-template/users");
        break;
      case Roles.USER:
        navigate("/web-template/users");
        break;
    }
  }

  useEffect(() => {
    checkBackendAndFetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);

  if (state.loadingRequiredData) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Spin tip="Please wait. Loading ..." size="large" />
      </div>
    );
  }

  // if (state.isError) {
  //   return (
  //     <div>
  //       {" "}
  //       <Result
  //         status="500"
  //         title="Api not working"
  //         subTitle="Sorry, something went wrong. "
  //       />
  //     </div>
  //   );
  // }

  return <ChildComponent {...props} />;
};

export default withRequiredData;
