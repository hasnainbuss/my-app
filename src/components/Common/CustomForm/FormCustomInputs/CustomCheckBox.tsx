import { FormItem, Input } from "formik-antd";

interface Props {
  label: string;
  name: string;
  [x: string]: any;
}

export const CustomCheckBox = (props: Props, ...rest: any) => {
  return (
    <div>
      <FormItem name={props.name} label={props.label} required={props.required}>
        <Input id={props.id} name={props.name} {...rest} />

        {/* <ErrorMessage name={props.name} component="span" className="error" /> */}
      </FormItem>
    </div>
  );
};
