import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../ui/CustomModal";
import { modalActions } from "../../store/modalSlide";
import useVideoCall from "../../hooks/useVideoCall";

function VideoCallModal() {
  const dispatch = useDispatch();
  const { localRef, remoteRef } = useVideoCall();

  return (
    <CustomModal onClose={() => dispatch(modalActions.setCurrentModal(null))}>
      <div>
        <span>local video</span>
        <video autoPlay playsInline ref={localRef} src=""></video>
      </div>
      <div>
        <span>remote video</span>
        <video autoPlay playsInline ref={remoteRef} src=""></video>
      </div>
    </CustomModal>
  );
}

export default VideoCallModal;
