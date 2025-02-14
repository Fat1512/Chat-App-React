import { useSelector } from "react-redux";
import VideoCallModal from "./VideoCall/VideoCallModal";
import { MODAL } from "../utils/constants";
import AddContactModal from "./Contact/AddContactModal";
import { current } from "@reduxjs/toolkit";

function ModalComponent() {
  const { currentModal } = useSelector((state) => state.modalReducer);

  const modal = (function () {
    switch (currentModal) {
      case MODAL.VIDEOCALL:
        return <VideoCallModal modal={MODAL.VIDEOCALL} />;
        break;
      case MODAL.ADDCONTACT:
        return <AddContactModal modal={MODAL.ADDCONTACT} />;
        break;
    }
  })();

  return <>{modal}</>;
}

export default ModalComponent;
