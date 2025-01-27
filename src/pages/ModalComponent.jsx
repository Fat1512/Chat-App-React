import { useSelector } from "react-redux";
import VideoCallModal from "./VideoCall/VideoCallModal";
import { MODAL } from "../utils/constants";

function ModalComponent() {
  const { currentModal } = useSelector((state) => state.modalReducer);
  return (
    <>
      {currentModal == MODAL.VIDEOCALL && (
        <VideoCallModal currentModal={currentModal} />
      )}
    </>
  );
}

export default ModalComponent;
