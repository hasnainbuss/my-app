import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormItem, Input, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import * as yup from "yup";
import { Modal } from "antd";

export interface BasicTitleFormProps {
  formTitle: string;
  label: string;
  intialValue?: string;
  onSubmit: (values: { title: string }, formOptions: any) => any;
}

const SingleInputForm: React.FC<BasicTitleFormProps> = (
  props: BasicTitleFormProps
) => {
  let navigate = useNavigate();
  const [modalVisibility, setModalVisibility] = useState(true);

  function addItemOnCancel() {
    navigate(-1);
    setModalVisibility(false);
  }

  const validationSchema = yup.object({
    title: yup.string().required(),
  });
  return (
    <Formik
      initialValues={{
        title: "",
      }}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {() => (
        <Modal
          visible={modalVisibility}
          className="form-input-modal"
          centered
          title={props.formTitle}
          footer={[]}
          onCancel={addItemOnCancel}
        >
          <Form className="form-input">
            <FormItem name="title" label={props.label} required={true}>
              <Input name="title" placeholder={`Enter ${props.label} title`} />
            </FormItem>
            <SubmitButton className="input-form-submit-button">
              Submit
            </SubmitButton>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};
export default SingleInputForm;
