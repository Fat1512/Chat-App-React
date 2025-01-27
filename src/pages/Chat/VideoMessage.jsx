import { formatSecond } from "../../utils/helper";

function VideoMessage({ message, currentUserId }) {
  return (
    <>
      <p>
        {message.senderId == currentUserId ? `Outgoing Call` : `Incoming Call`}
      </p>
      <p>duration: {formatSecond(message?.callDetails?.callDuration)}</p>
      {message?.callDetails?.callRejectReason && (
        <p>{message.callDetails.callRejectReason}</p>
      )}
    </>
  );
}

export default VideoMessage;
