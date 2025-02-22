import { useSelector } from "react-redux";
import VideoCallModal from "./VideoCall/VideoCallModal";
import { MODAL } from "../utils/constants";
import AddContactModal from "./Contact/AddContactModal";
import { current } from "@reduxjs/toolkit";
import LogoutModal from "./Setting/LogoutModal";
import UserInfoModal from "../pages/Setting/UserInfoModal";
import CreateGroupModal from "../pages/Group/CreateGroupModal";

function ModalComponent() {
  const { currentModal } = useSelector((state) => state.modalReducer);
  const modal = (function () {
    switch (currentModal) {
      case MODAL.VIDEOCALL:
        return <VideoCallModal />;
        break;
      case MODAL.ADD_CONTACT:
        return <AddContactModal />;
        break;
      case MODAL.LOGOUT:
        return <LogoutModal />;
        break;
      case MODAL.USERINFO:
        return <UserInfoModal />;
        break;
      case MODAL.CREATE_GROUP:
        return <CreateGroupModal />;
        break;
    }
  })();

  return <>{modal}</>;
}

export default ModalComponent;
