import React from "react";
import { Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Formik, FormikHelpers } from "formik";
import { FormItem, SubmitButton, Form, Input } from "formik-antd";
import * as yup from "yup";
import "./login.scss";
import { AuthenticateUser } from "../../apiHandler/AuthenticationHandler";
import { HandleApiError } from "../../common/errorUtils";
import { ApplicationUser } from "../models";
import { AuthenticationRequest } from "../models/auth/AuthenticationRequest";
import { useAppDispatch } from "../redux/hooks";
import { setApplicationUser } from "../redux/slice/user.slice";
import { Roles } from "../../Constants";

const { Title } = Typography;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function onSubmit(
    values: AuthenticationRequest,
    formOptions: FormikHelpers<AuthenticationRequest>
  ) {
    try {
      let user: ApplicationUser = await AuthenticateUser(values);
      if (!user.token) {
        message.error("Retry! Invalid username or password");
        return;
      }
      dispatch(setApplicationUser(user));
      redirectToHome(user);
    } catch (err) {
      HandleApiError(err);
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

        // navigate("/web-template");
        // navigate("/web-template/users");
        break;
      case Roles.USER:
        navigate("/web-template/users");
        break;
    }
  }

  const validationSchema = yup.object({
    username: yup.string().required("User Name Required!"),
    password: yup.string().required("Password Required!"),
  });

  return (
    <div style={{ alignSelf: "center" }}>
      <Title> Welcome, Please Login to continue ! </Title>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="login-form-input" style={{ width: 400 }}>
            <FormItem
              style={{ color: "white" }}
              name="username"
              label="User Name"
              required
            >
              <Input name="username" placeholder="User Name" />
            </FormItem>

            <FormItem name="password" label="Password" required>
              <Input.Password name="password" placeholder="Password" />
            </FormItem>

            <SubmitButton className="input-form-submit-button">
              Login
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
