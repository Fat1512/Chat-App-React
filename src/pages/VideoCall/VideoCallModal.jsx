import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../ui/CustomModal";
import useVideoCall from "../../hooks/useVideoCall";
import { AuthenticationHeader, formatSecond } from "../../utils/helper";
import { MODAL } from "../../utils/constants";

function VideoCallModal({ currentModal }) {
  const {
    time,
    currentChatRoomId,
    currentUser,
    stompClient,
    localRef,
    remoteRef,
    caller,
    acceptRequest,
    setAcceptRequest,
    status,
    remoteCallerInfo,
  } = useVideoCall();

  function endVideoCall() {
    stompClient.publish({
      destination: `/app/chatRoom/${currentChatRoomId}/callEnded`,
      body: JSON.stringify({
        senderId: currentUser.id,
        duration: time,
      }),
      headers: AuthenticationHeader(),
    });
  }

  function denyVideoCall() {
    stompClient.publish({
      destination: `/app/chatRoom/${currentChatRoomId}/callDenied`,
      headers: AuthenticationHeader(),
    });
  }

  return (
    <CustomModal
      currentModal={currentModal}
      modal={MODAL.VIDEOCALL}
      shouldCloseOnOverlayClick={false}
    >
      <div className="flex justify-between text-3xl">
        <p>{status}</p>
        <p>{formatSecond(time)}</p>
      </div>
      <div className="flex">
        <div className="p-3 flex flex-col">
          {/* <span className="text-3xl text-center w-full">local video</span> */}
          <video autoPlay playsInline ref={localRef} src=""></video>
        </div>
        {acceptRequest && (
          <div className=" p-3 flex flex-col">
            <span className="text-3xl text-center w-full">VideoCall</span>
            <video autoPlay playsInline ref={remoteRef} src=""></video>
          </div>
        )}
      </div>
      <div className="flex text-3xl justify-around">
        {!caller && !acceptRequest && (
          <div>
            <button
              onClick={() => setAcceptRequest(true)}
              className="rounded-full bg-green-200 p-5"
            >
              Accept
            </button>
          </div>
        )}
        <div>
          <button
            onClick={acceptRequest ? endVideoCall : denyVideoCall}
            className="rounded-full bg-red-200 p-5"
          >
            {acceptRequest ? `End call` : `Deny`}
          </button>
        </div>
      </div>
    </CustomModal>
  );
}

export default VideoCallModal;
/**
 *
 * Call Accepted => Display local + remote camera + hide all the calling buttons
 * Caller -> Display local camera + deny button
 * Receiver -> Display local camera + deny button + accept button
 *
 *
 */
