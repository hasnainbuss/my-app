import { FormInputTypes } from "../../../../components/models/Enumerations";
import { FormItem, InputNumber } from "formik-antd";

interface Props {
  id?: string;
  name: string;
  type: FormInputTypes;
  placeholder?: string;
  min?: number;
  max?: number;
  [x: string]: any;
}

export const CustomInputNumber = (props: Props, ...rest: any) => {
  return (
    <div>
      <FormItem
        name={props.name}
        label={props.label}
        required={props.required}
        extra={props.extra}
      >
        <InputNumber
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          min={props.min}
          max={props.max}
          value={props.value}
          {...rest}
        />
        {/* <ErrorMessage component={TextErrorWrapper} name={props.name} /> */}
        {/* <ErrorMessage name={props.name} component="span" className="error" /> */}
      </FormItem>
    </div>
  );
};
