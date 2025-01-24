import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../ui/CustomModal";
import useVideoCall from "../../hooks/useVideoCall";

function VideoCallModal() {
  const dispatch = useDispatch();
  const {
    localRef,
    remoteRef,
    caller,
    acceptRequest,
    setAcceptRequest,
    status,
    remoteCallerInfo,
  } = useVideoCall();

  return (
    <CustomModal shouldCloseOnOverlayClick={false}>
      <div className="flex justify-center text-3xl">
        <p>{status}</p>
      </div>
      <div className="flex">
        <div className="p-3 flex flex-col">
          {/* <span className="text-3xl text-center w-full">local video</span> */}
          <video autoPlay playsInline ref={localRef} src=""></video>
        </div>
        {acceptRequest && (
          <div className=" p-3 flex flex-col">
            <span className="text-3xl text-center w-full">
              {remoteCallerInfo.name}
            </span>
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
          <button className="rounded-full bg-red-200 p-5">Deny</button>
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
