import { FormInputTypes } from "../../../../components/models/Enumerations";
import { DatePicker, FormItem } from "formik-antd";

interface Props {
  id?: string;
  name: string;
  type: FormInputTypes;
  placeholder?: string;
  [x: string]: any;
}

export const CustomDatePicker = (props: Props, ...rest: any) => {
  return (
    <div>
      <FormItem name={props.name} label={props.label} required={props.required}>
        <DatePicker
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          {...rest}
          format="DD/MM/YYYY"
        />
        {/* <ErrorMessage name={props.name} component="span" className="error" /> */}
      </FormItem>
    </div>
  );
};
