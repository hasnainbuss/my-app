import { CustomFormInputProps } from "../../models/CustomFormInputProps";
import { FormInputTypes, ValidationType } from "../../models/Enumerations";



export const leadForm : CustomFormInputProps[] = [
  {
    type: FormInputTypes.Text,
    name: "jornayaLeadId",
    label: "Jornaya Id",
    value: "",
    required: true,
    validations: [
      {
        type: ValidationType.required,

        message: "Jornaya Id is required",
      },
    ],
  },{
    type: FormInputTypes.Text,
    name: "phoneNumber",
    label: "Phone Number",
    value: "",
    required: true,
    validations: [
      {
        type: ValidationType.required,

        message: "Phone Number is required",
      },
    ],
  },{
    type: FormInputTypes.Text,
    name: "website",
    label: "Website",
    value: "",
    required: true,
    validations: [
      {
        type: ValidationType.required,

        message: "Website is required",
      },
    ],
  },{
    type: FormInputTypes.Text,
    name: "quoteType",
    label: "Quote Type",
    value: "",
    required: true,
    validations: [
      {
        type: ValidationType.required,

        message: "Quote Type is required",
      },
    ],
  },

  {
    type: FormInputTypes.DatePicker,
    name: "date",
    label: "Date",
    value: "",
    required: true,
    validations: [
      {
        type: ValidationType.required,
        message: "Date is required",
      },
    ],
  },
  
];
