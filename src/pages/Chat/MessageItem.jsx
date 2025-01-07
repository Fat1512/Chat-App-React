import { MESSAGE_STATUS } from "../../utils/constants";
import { formatTime } from "../../utils/helper";

function MessageItem({ message, userProfile }) {
  console.log(message);
  const deliveredStatus = message.deliveredStatus;
  const readStatus = message.readStatus;
  let status = null;
  if (deliveredStatus) {
    status = MESSAGE_STATUS.DELIVERD;
  }
  if (readStatus) {
    status = MESSAGE_STATUS.READ;
  }
  if (!readStatus && !deliveredStatus) {
    status = MESSAGE_STATUS.SENT;
  }
  return (
    <div
      className={`max-w-[50rem] bg-white my-3 rounded-lg p-4 ${
        message.sender == userProfile.id
      } ? "self-start" : "self-end`}
    >
      <p>{message.content}</p>
      <div
        className={`flex ${
          message.sender == userProfile.id
        } ? "justify-end" : "justify-end`}
      >
        <span>{formatTime(+message.timeSent)}</span>
        {message.senderId == userProfile.id && (
          <span className="pl-3 text-orange-600">{status}</span>
        )}
      </div>
    </div>
  );
}

export default MessageItem;
