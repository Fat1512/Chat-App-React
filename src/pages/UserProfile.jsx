import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../store/profileSlice";
import { useEffect } from "react";
function UserProfile() {
  const { visible, profile, currentProfileId } = useSelector(
    (state) => state.profileReducer
  );
  const { currentChatItemId, chatList } = useSelector(
    (state) => state.chatListReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentChatItemId) return;
    if (profile[currentChatItemId] != null) {
      dispatch(profileActions.setCurrentProfileId(currentChatItemId));
    } else {
      const chatItem = chatList[currentChatItemId];
      dispatch(profileActions.setProfile(chatItem));
      dispatch(profileActions.setCurrentProfileId(chatItem.chatRoomId));
    }
  }, [currentChatItemId]);

  return (
    <div
      className={`overflow-hidden transition-all ease-in-out text-2xl ${
        visible ? "w-[35rem]" : "w-0"
      }`}
    >
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
        alt=""
        className="w-[5rem] object-contain"
      />
      <div>name: {profile[currentProfileId]?.name}</div>
      <div>Username: {profile[currentProfileId]?.username}</div>
      <div>bio: {profile[currentProfileId]?.bio}</div>
    </div>
  );
}

export default UserProfile;
