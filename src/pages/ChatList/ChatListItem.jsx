import { useEffect } from "react";
import {
  AuthenticationHeader,
  formatTime,
  getAccessToken,
  getStartMiliOfDay,
} from "../../utils/helper";
import useSocket from "../../hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../store/chatSlice";
import { profileActions } from "../../store/profileSlice";
import { chatListActions } from "../../store/chatListSlice";
import useUser from "../../hooks/useUser";
import { MESSAGE_TYPE } from "../../utils/constants";
let currentTimeOut;
function ChatItem({
  roomInfo,
  latestMessage,
  totalUnreadMessages,
  id,
  currentChatItemId,
  onClick,
}) {
  const dispatch = useDispatch();
  const { stompClient } = useSocket();
  useEffect(() => {
    if (roomInfo.roomType == "CHATBOT") return;
    if (id == currentChatItemId && stompClient._stompHandler) {
      stompClient.publish({
        destination: `/app/chatRoom/${id}/markAsRead`,
        headers: AuthenticationHeader(),
      });
      dispatch(
        chatListActions.resetUnreadMessageCount({
          chatRoomId: id,
        })
      );
    } else {
      stompClient.publish({
        destination: `/app/chatRoom/${id}/markAsDelivered`,
        headers: AuthenticationHeader(),
      });
    }
  }, [currentChatItemId, latestMessage, stompClient]);

  let displayMessageContent;
  if (latestMessage.messageType == MESSAGE_TYPE.TEXT) {
    displayMessageContent = latestMessage?.content;
  }
  if (latestMessage.messageType == MESSAGE_TYPE.VIDEOCALL) {
    displayMessageContent = "Video call";
  }
  if (latestMessage.messageType == MESSAGE_TYPE.IMAGE) {
    displayMessageContent = "Image";
  }

  if (roomInfo?.mode != null) {
    displayMessageContent = roomInfo?.mode;
  }

  return (
    <div
      onClick={() => onClick(id)}
      className={`flex rounded-lg w-full h-[7rem] items-center py-3 cursor-pointer hover:bg-slate-300 px-4 ${
        currentChatItemId == id ? "chat-item-active" : ""
      }`}
    >
      <img
        // src="https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
        src={roomInfo.avatar}
        alt=""
        className="w-[5rem] h-[5rem] object-fit rounded-full"
      />
      <div className="flex flex-col w-full text-2xl pl-4">
        <div className="flex justify-between">
          <div className="font-bold">
            {roomInfo.name}
            <span>
              {roomInfo.roomType == "PRIVATE" &&
                (roomInfo.status.online
                  ? `(online)`
                  : `(offline) last seen at ${formatTime(
                      roomInfo.status.lastSeen
                    )}`)}
            </span>
          </div>
          <div>
            <span className="pl-2">
              {latestMessage?.timeSent && formatTime(latestMessage?.timeSent)}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center text-xl">
          <div>{displayMessageContent}</div>
          {totalUnreadMessages !== 0 && (
            <div className="rounded-full border bg-blue-400 p-3 m-0">
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
