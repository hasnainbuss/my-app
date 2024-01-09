import React from "react";
import { Form, FormItem, Input, SubmitButton, Select } from "formik-antd";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Roles } from "../../../Constants";
import { UserModel } from "../../models";

const { Option } = Select;

interface UserFormProps {
  user?: UserModel;
  onSubmit: (values: UserModel, formOptions: any) => any;
}

const UserForm: React.FC<UserFormProps> = (props: UserFormProps) => {
  let { user } = props;

  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    userName: yup.string().required("User Name is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    role: yup.string().required("Role is required").oneOf(Roles.ALL_ROLES),
  });

  return (
    <Formik
      initialValues={{
        id: user?.id || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        userName: user?.userName || "",
        password: user?.password || "",
        confirmPassword: user?.password || "",
        role: user?.role || "",
      }}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
      enableReinitialize
    >
      {(formikProps) => (
        <Form>
          <FormItem name="firstName" label="First Name" required>
            <Input name="firstName" placeholder="First Name" />
          </FormItem>

          <FormItem name="lastName" label="Last Name" required>
            <Input name="lastName" placeholder="Last Name" />
          </FormItem>

          <FormItem name="userName" label="User Name" required>
            <Input name="userName" placeholder="User Name" />
          </FormItem>

          <FormItem name="password" label="Password" required>
            <Input.Password name="password" placeholder="Password" />
          </FormItem>

          <FormItem name="confirmPassword" label="Confirm Password" required>
            <Input.Password
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </FormItem>

          <FormItem name="role" label="Select Role" required>
            <Select name="role" placeholder="Select Role">
              {Roles.ALL_ROLES.map((role) => (
                <Option key={role} value={role}>
                  {role}
                </Option>
              ))}
            </Select>
          </FormItem>

          <SubmitButton>{props.user ? "Update" : "Register"}</SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
