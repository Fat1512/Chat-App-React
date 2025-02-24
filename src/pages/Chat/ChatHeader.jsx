import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../../store/profileSlice";
import { formatTime } from "../../utils/helper";
import { modalActions } from "../../store/modalSlide";
import { MODAL } from "../../utils/constants";
import { videoCallActions } from "../../store/videoCallSlice";
import { BiSolidPhoneCall } from "react-icons/bi";

import useUser from "../../hooks/useUser";

function ChatHeader({ currentChatRoomId }) {
  const { visible, profile, currentProfileId } = useSelector(
    (state) => state.profileReducer
  );
  const { user: currentUser } = useUser();
  const dispatch = useDispatch();
  return (
    <div className="flex rounded-lg cursor-pointer w-full items-center bg-white py-3 px-4 border border-1">
      <div
        className="flex w-full items-center"
        onClick={() => dispatch(profileActions.setVisible(!visible))}
      >
        <img
          src={profile[currentProfileId].avatar}
          alt=""
          className="w-[5rem] h-[5rem] object-fit rounded-full"
        />
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col w-full text-xl pl-4">
            <div className="font-bold">{profile[currentProfileId]?.name}</div>
            {profile[currentProfileId].mode != null &&
              profile[currentProfileId].mode}
            <div>
              {profile[currentProfileId].roomType == "PRIVATE" &&
                (profile[currentProfileId].status.online
                  ? `online`
                  : `offline last seen: ${formatTime(
                      profile[currentProfileId]?.status?.lastSeen
                    )}`)}
            </div>
          </div>
        </div>
      </div>
      <div className="text-2xl px-5 cursor-pointer">
        <button
          className="p-3 text-4xl rounded-lg"
          onClick={() => {
            dispatch(videoCallActions.setCaller(currentUser.id));
            dispatch(videoCallActions.setCurrentChatRoomId(currentChatRoomId));
            dispatch(modalActions.setCurrentModal(MODAL.VIDEOCALL));
          }}
        >
          <BiSolidPhoneCall />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
