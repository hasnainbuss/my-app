import { FormInputTypes } from "../../../../components/models/Enumerations";
import { FormItem, Input } from "formik-antd";

interface Props {
  id?: string;
  name: string;
  type: FormInputTypes;
  placeholder?: string;
  [x: string]: any;
}

export const CustomInputPassword = (props: Props, ...rest: any) => {
  return (
    <div>
      <FormItem name={props.name} label={props.label} required={props.required}>
        <Input.Password
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          {...rest}
        />
      </FormItem>
    </div>
  );
};
