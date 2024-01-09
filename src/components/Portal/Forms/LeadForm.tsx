import React from "react";
import { DatePicker, Form, FormItem, Input, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import * as yup from "yup";
import { LeadModel } from "../../../components/models";

export interface LeadFormProps {
  lead?: LeadModel;
  onSubmit: (values: any, formOptions: any) => any;
}

const LeadForm: React.FC<LeadFormProps> = (props: LeadFormProps) => {
  const validationSchema = yup.object({
    phoneNumber: yup
      .string()
      .matches(/^\d+$/, "Only digits allowed.")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    date: yup.date().required(" Date is Required"),
    website: yup.string().required("website is Required"),
    jornayaLeadId: yup.string().required("jornayaLeadId is Required"),
    quoteType: yup.string().required("quoteType is Required"),
  });

  return (
    <Formik
      initialValues={{
        ...props.lead,
      }}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {() => (
        <Form className="form-input">
          <FormItem name="jornayaLeadId" label="Jornaya Id" required>
            <Input name="jornayaLeadId" placeholder="jornayaLeadId" />
          </FormItem>

          <FormItem name="phoneNumber" label="Phone Number" required>
            <Input name="phoneNumber" placeholder="phoneNumber" />
          </FormItem>

          <FormItem name="website" label="Website" required>
            <Input name="website" placeholder="website" />
          </FormItem>

          <FormItem name="quoteType" label="Quote Type" required>
            <Input name="quoteType" placeholder="quoteType" />
          </FormItem>

          <FormItem name="date" label="Date" required>
            <DatePicker name="date" />
          </FormItem>

          <SubmitButton className="input-form-submit-button">
            {props.lead ? "Update" : "Add"}
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};
export default LeadForm;
