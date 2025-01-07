import { formatTime } from "../../utils/helper";

function ChatItem({ userProfile, latestMessage }) {
  return (
    <div className="flex rounded-lg w-full items-center py-3 cursor-pointer hover:bg-slate-300 px-4">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
        alt=""
        className="w-[5rem] object-contain"
      />
      <div className="flex flex-col w-full text-xl pl-4">
        <div className="flex justify-between">
          <div className="font-bold">{userProfile.name} </div>
          <div>
            <span>
              {userProfile.status.online
                ? "(online)"
                : `(offline) last seen ${userProfile.status.lastSeen}`}
            </span>
            <span className="pl-2">{formatTime(latestMessage.timeSent)}</span>
          </div>
        </div>
        <div>{latestMessage.content}</div>
      </div>
    </div>
  );
}

export default ChatItem;
