
import { FormItem, Select } from "formik-antd";
import { InputSelectOptionModel } from "../../../../components/models/InputSelectOptionModel";

const { Option } = Select;

interface Props {
  options?: InputSelectOptionModel[];
  label: string;
  name: string;
  initialValue?: any; // Add initialValue prop
  [x: string]: any;
}

export const CustomSelect = ({
  label,
  options,
  initialValue,
  ...props
}: Props) => {
  return (
    <div>
      <FormItem name={props.name} label={label} required={props.required}>
        <Select
          value={options![0].description} // Set the initial value using the initialValue prop
          {...props}
          style={{ width: "130px" }}
          allowClear
        >
          {options?.map((opt) => {
            return (
              <Option key={opt.key} value={opt.value}>
                {opt.description}
              </Option>
            );
          })}
        </Select>
        {/* <ErrorMessage name={props.name} component="span" className="error" /> */}
      </FormItem>
    </div>
  );
};
