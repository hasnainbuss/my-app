import { CustomFormInputProps } from "../../models/CustomFormInputProps";
import { FormInputTypes, ValidationType } from "../../models/Enumerations";



export const userForm : CustomFormInputProps[] = [
  {
    type: FormInputTypes.Text,
    name: "firstName",
    label: "First Name",
    value: "",
    required: true,
    validations: [
      {
        type: ValidationType.required,

        message: "First Name is required",
      },
    ],
  },
  {
    type: FormInputTypes.Text,
    name: "lastName",
    label: "Last Name",
    required: true,
    value: "",
    validations: [
      {
        type: ValidationType.required,

        message: "Last Name is required",
      },
    ],
  },
  {
    type: FormInputTypes.Text,
    name: "userName",
    label: "User Name",
    required: true,
    value: "",
    validations: [
      {
        type: ValidationType.required,

        message: "User Name is required",
      },
    ],
  },
  {
    type: FormInputTypes.Password,
    name: "password",
    label: "Password",
    value: "",
    required: true,
    validations: [
      {
        type: ValidationType.required,

        message: "Password is required",
      },
    ],
  },
  {
    type: FormInputTypes.Password,
    name: "confirmPassword",
    label: "Confirm Password",
    required: true,
    value: "",
    validations: [
      {
        type: ValidationType.required,
        message: "Confirm Password id is required",
      },
    ],
  },
  {
    type: FormInputTypes.Select,
    name: "role",
    label: "Role",
    placeholder: "Select Role",
    required: true,
    value: "",
    options: [{
        key: "admin",
        description: "Admin",
        value: "Admin",
      },
      {
        key: "user",
        description: "User",
        value: "User",
      }
    ],
    validations: [
      {
        type: ValidationType.required,
        message: "Role is required",
      },
    ],
  },
];
