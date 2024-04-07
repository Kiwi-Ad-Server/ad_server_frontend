import React from "react";
import { Modal } from "semantic-ui-react";

const AS_MODAL = ({ open, onClose, header, content,mode }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header> {header}</Modal.Header>
      <Modal.Content>{content}</Modal.Content>
    </Modal>
  );
};

export default AS_MODAL;
