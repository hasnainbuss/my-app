import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { SubmitButton } from "formik-antd";
import { getInputs } from "./FormCustomInputs/GetInputs";
import { CustomDatePicker } from "./FormCustomInputs/CustomDatePicker";
import { CustomInputPassword } from "./FormCustomInputs/CustomInputPassword";
import { CustomSelect } from "./FormCustomInputs/CustomSelect";
import { CustomTextInput } from "./FormCustomInputs/CustomTextInput";
import { CustomInputNumber } from "./FormCustomInputs/CustomInputNumber";
import { useTheming } from "../Custom Hooks/ThemeOptionsContext";
import { CustomFormInputProps } from "../../../components/models/CustomFormInputProps";
import { FormInputTypes } from "../../../components/models/Enumerations";

interface CustomFormProps {
  formSchema: CustomFormInputProps[];
  initialValues?: any;
  onSubmit: (values: any, formOptions: FormikHelpers<any>) => any;
}

export const CustomForm: React.FC<CustomFormProps> = (
  props: CustomFormProps
) => {
  const { initialValues, inputs, validationSchema } = getInputs(
    props.formSchema,
    props.initialValues
  );

  const { themeOptions } = useTheming();

  const fontColor: string = getContrastColor(themeOptions.themeColor);

  const primaryColorStyle = {
    backgroundColor: `${themeOptions.themeColor}`,
    color: fontColor, // You can set the text color accordingly
  };

  function getContrastColor(hexColor: string): string {

    if (hexColor === "#4091ff") {
      return "#ffffff";  // Return white for the specified color
    }
    // Remove the "#" symbol if it's included
    hexColor = hexColor.replace("#", "");

    // Convert hex to RGB
    const r: number = parseInt(hexColor.slice(0, 2), 16);
    const g: number = parseInt(hexColor.slice(2, 4), 16);
    const b: number = parseInt(hexColor.slice(4, 6), 16);

    // Calculate relative luminance
    const luminance: number = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Choose a threshold value (0.5 is a common choice)
    const threshold: number = 0.5;

    // Determine whether to use light or dark text color
    return luminance > threshold ? "#000000" : "#ffffff";
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
      enableReinitialize
    >
      {() => (
        <Form noValidate>
          {inputs.map(({ name, type, value, ...props }) => {
            switch (type) {
              case FormInputTypes.Select:
                return (
                  <CustomSelect
                    key={name}
                    label={props.label!}
                    placeholder={props.placeholder}
                    name={name}
                    options={props.options!}
                    initialValue={props.initialValue}
                    required={props.required}
                    className="custom-select"
                  />
                );

              case FormInputTypes.Text:
                return (
                  <CustomTextInput
                    key={name}
                    name={name}
                    label={props.label}
                    placeholder={props.placeholder}
                    type={type}
                    required={props.required}
                    width={props.width}
                    extra={props.extra}
                  />
                );

              case FormInputTypes.Password:
                return (
                  <CustomInputPassword
                    key={name}
                    name={name}
                    label={props.label}
                    placeholder={props.placeholder}
                    type={type}
                    required={props.required}
                  />
                );

              case FormInputTypes.Email:
                return (
                  <CustomTextInput
                    key={name}
                    name={name}
                    label={props.label}
                    placeholder={props.placeholder}
                    type={type}
                    required={props.required}
                  />
                );

              case FormInputTypes.DatePicker:
                return (
                  <CustomDatePicker
                    key={name}
                    name={name}
                    label={props.label}
                    placeholder={props.placeholder}
                    type={type}
                    required={props.required}
                  />
                );
              case FormInputTypes.Number:
                return (
                  <CustomInputNumber
                    key={name}
                    name={name}
                    label={props.label}
                    placeholder={props.placeholder}
                    type={type}
                    value={props.initialValue}
                    required={props.required}
                    min={props.min}
                    max={props.max}
                    extra={props.extra}
                  />
                );

              case FormInputTypes.Hidden:
                return <></>;

              default:
                return (
                  <CustomTextInput
                    key={name}
                    name={name}
                    label={props.label}
                    placeholder={props.placeholder}
                    type={type}
                    required={props.required}
                  />
                );
            }
          })}

          <SubmitButton
            style={primaryColorStyle}
            className="input-form-submit-button"
          >
            {props.initialValues ? "Update" : "Add"}
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};
