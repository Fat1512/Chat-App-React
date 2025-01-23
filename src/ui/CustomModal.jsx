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

function CustomModal({
  children,
  name,
  currentName,
  parentSelector,
  setNullModal,
}) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState();
  useEffect(() => {
    setIsOpen(name == currentName);
  }, [currentName]);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
    setNullModal();
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      parentSelector={() => parentSelector}
    >
      {children}
    </Modal>
  );
}

export default CustomModal;
