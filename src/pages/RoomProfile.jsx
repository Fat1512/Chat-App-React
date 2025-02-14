import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../store/profileSlice";
import { useEffect } from "react";
import DetailProfile from "./Profile/DetailProfile";
import CustomModal from "../ui/CustomModal";
function RoomProfile() {
  const { visible, profile, currentProfileId } = useSelector(
    (state) => state.profileReducer
  );
  const { currentChatItemId, chatList } = useSelector(
    (state) => state.chatListReducer
  );
  const { currentChatId, chatHistory } = useSelector(
    (state) => state.chatReducer
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
      {profile[currentProfileId] && chatHistory[currentChatId] && (
        <>
          <img src={profile.avatar} alt="" className="w-full object-contain" />
          <DetailProfile profile={profile[currentProfileId]} />
          <br />
          <div>
            group members:
            {chatHistory[currentChatId].members.map((member) => (
              <p key={member.id}>name: {member.name}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default RoomProfile;
