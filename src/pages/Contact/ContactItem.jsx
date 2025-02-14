import { useDispatch } from "react-redux";
import { formatTime } from "../../utils/helper";
import { chatListActions } from "../../store/chatListSlice";

function ContactItem({ chatRoomId, roomInfo }) {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(chatListActions.setCurrentChatRoomId(chatRoomId))}
      className="flex rounded-lg w-full h-[7rem] items-center py-3 cursor-pointer hover:bg-slate-300 px-4"
    >
      <img
        // src="https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
        src={roomInfo.avatar}
        alt=""
        className="w-[5rem] object-contain"
      />
      <div className="flex flex-col w-full text-xl pl-4">
        <div className="flex justify-between">
          <div className="font-bold">
            {roomInfo.name}
            <span>
              {roomInfo.status.online
                ? `(online)`
                : `(offline) last seen at ${formatTime(
                    roomInfo.status.lastSeen
                  )}`}
            </span>
          </div>
          <div>
            <span className="pl-2"></span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>{roomInfo?.mode != null && roomInfo.mode}</div>
        </div>
      </div>
    </div>
  );
}

export default ContactItem;
