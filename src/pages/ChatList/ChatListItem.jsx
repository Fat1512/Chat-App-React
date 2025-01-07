import { formatTime } from "../../utils/helper";

function ChatItem({
  userProfile,
  latestMessage,
  totalUnreadMessages,
  id,
  currentChatItemId,
  onClick,
}) {
  console.log(latestMessage);
  return (
    <div
      onClick={() => onClick(id)}
      className={`flex rounded-lg w-full items-center py-3 cursor-pointer hover:bg-slate-300 px-4 ${
        currentChatItemId == id ? "chat-item-active" : ""
      }`}
    >
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
        alt=""
        className="w-[5rem] object-contain"
      />
      <div className="flex flex-col w-full text-xl pl-4">
        <div className="flex justify-between">
          <div className="font-bold">
            {userProfile.name}
            <span>
              {userProfile.status.online
                ? "(online)"
                : `(offline) last seen at ${userProfile.status.lastSeen}`}
            </span>
          </div>
          <div>
            <span className="pl-2">{formatTime(latestMessage.timeSent)}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>{latestMessage.content}</div>
          {totalUnreadMessages !== 0 && (
            <div className="rounded-full border bg-blue-500 p-3 m-0">
              {totalUnreadMessages}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
//chat-item-active
