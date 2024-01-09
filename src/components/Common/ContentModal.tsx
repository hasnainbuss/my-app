import React, { Fragment, ReactNode, useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

interface ContentModalProps {
  children?: ReactNode;
  formTitle?: string;
}

const ContentModal: React.FC<ContentModalProps> = (
  props: ContentModalProps
) => {
  let navigate = useNavigate();

  const [modalVisibility, setModalVisibility] = useState<boolean>(true);

  function addCandidateOnCancel() {
    navigate(-1);
    setModalVisibility(false);
  }

  return (
    <Fragment>
      <Modal
        visible={modalVisibility}
        className="form-input-modal"
        centered
        title={props.formTitle}
        footer={[]}
        onCancel={addCandidateOnCancel}
      >
        {props.children}
      </Modal>
    </Fragment>
  );
};
export default ContentModal;
