import { useSelector } from "react-redux";
import VideoCallModal from "./VideoCall/VideoCallModal";
import { MODAL } from "../utils/constants";
import AddContactModal from "./Contact/AddContactModal";
import { current } from "@reduxjs/toolkit";
import LogoutModal from "./Setting/LogoutModal";
import UserInfoModal from "../pages/Setting/UserInfoModal";
function ModalComponent() {
  const { currentModal } = useSelector((state) => state.modalReducer);

  const modal = (function () {
    switch (currentModal) {
      case MODAL.VIDEOCALL:
        return <VideoCallModal />;
        break;
      case MODAL.ADDCONTACT:
        return <AddContactModal />;
        break;
      case MODAL.LOGOUT:
        return <LogoutModal />;
        break;
      case MODAL.USERINFO:
        return <UserInfoModal />;
        break;
    }
  })();

  return <>{modal}</>;
}

export default ModalComponent;
