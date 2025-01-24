import { useEffect, useState } from "react";
import Modal from "react-modal";

const customStyles = {
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

function CustomModal({ children, onClose, shouldCloseOnOverlayClick = true }) {
  const [modalIsOpen, setIsOpen] = useState(true);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
    onClose();
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal ? closeModal : () => {}}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      {children}
    </Modal>
  );
}

export default CustomModal;
