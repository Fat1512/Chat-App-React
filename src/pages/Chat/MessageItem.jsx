import { MESSAGE_STATUS } from "../../utils/constants";
import { formatTime } from "../../utils/helper";

function MessageItem({ message, currentUser }) {
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
      className={`max-w-[30rem] bg-white my-3 rounded-lg p-4 ${
        message.senderId == currentUser.id ? "self-end" : "self-start"
      }`}
    >
      <p>{message.content}</p>
      <div
        className={`flex ${
          message.senderId == currentUser.id
        } ? "justify-end" : "justify-start"`}
      >
        <span>{formatTime(+message.timeSent)}</span>
        {message.senderId == currentUser.id && (
          <span className="pl-3 text-orange-600">{status}</span>
        )}
      </div>
    </div>
  );
}

export default MessageItem;
