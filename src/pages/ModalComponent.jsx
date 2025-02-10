import { useSelector } from "react-redux";
import VideoCallModal from "./VideoCall/VideoCallModal";
import { MODAL } from "../utils/constants";

function ModalComponent() {
  const { currentModal } = useSelector((state) => state.modalReducer);

  const modal = (function () {
    switch (currentModal) {
      case MODAL.VIDEOCALL:
        return <VideoCallModal currentModal={currentModal} />;
    }
  })();

  return <>{modal}</>;
}

export default ModalComponent;
