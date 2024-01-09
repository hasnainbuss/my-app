import { CustomFormInputProps } from "../../models/CustomFormInputProps";
import { FormInputTypes, ValidationType } from "../../models/Enumerations";



export const websiteForm : CustomFormInputProps[] = [
  {
    type: FormInputTypes.Text,
    name: "url",
    label: "URL",
    value: "",
    required: true,
    validations: [
      {
        type: ValidationType.required,
        message: "URL is required",
      },
    ],
  },
  
];
