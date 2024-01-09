import { FormInputTypes } from "../../../../components/models/Enumerations";
import { FormItem, Input } from "formik-antd";

interface Props {
  id?: string;
  name: string;
  type: FormInputTypes;
  placeholder?: string;
  width?: string;
  [x: string]: any;
}

export const CustomTextInput = (props: Props, ...rest: any) => {
  return (
    <div>
      <FormItem
        name={props.name}
        label={props.label}
        required={props.required}
        extra={props.extra}
      >
        <Input
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          width={props.width}
          {...rest}
        />
        {/* <ErrorMessage component={TextErrorWrapper} name={props.name} /> */}
        {/* <ErrorMessage name={props.name} component="span" className="error" /> */}
      </FormItem>
    </div>
  );
};
