import { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modalSlide";
let customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

function CustomModal({ children, modal, shouldCloseOnOverlayClick = true }) {
  const dispatch = useDispatch();
  const { currentModal, position } = useSelector((state) => state.modalReducer);
  function afterOpenModal() {}

  function closeModal() {
    dispatch(modalActions.resetState());
  }

  customStyles["content"] = position;
  return (
    <Modal
      isOpen={currentModal == modal}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal ? closeModal : () => {}}
      style={customStyles}
      overlayClassName="fixed inset-0 bg-transparent"
      contentLabel="Example Modal"
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      {children}
    </Modal>
  );
}

export default CustomModal;
