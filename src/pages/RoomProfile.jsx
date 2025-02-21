import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../store/profileSlice";
import { useEffect } from "react";
import { Bell, Phone, AtSign, Edit2 } from "lucide-react";
import DetailProfile from "./Profile/DetailProfile";
import CustomModal from "../ui/CustomModal";
import { useState } from "react";

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
  const [activeTab, setActiveTab] = useState("media");

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
  console.log(profile);
  return (
    <div
      className={`overflow-hidden transition-all ease-in-out text-2xl border border-1 ${
        visible ? "w-[40rem]" : "w-0"
      }`}
    >
      {profile[currentProfileId] && chatHistory[currentChatId] && (
        <>
          <div className="relative">
            <img
              src={`${profile[currentProfileId].avatar}`}
              alt="User Background"
              className="w-full h-[40rem] object-cover"
            />
            <button className="absolute top-2 right-2 bg-gray-800 text-white p-4 rounded-full">
              <Edit2 size={19} />
            </button>
          </div>

          <div className="p-4">
            <h2 className="text-4xl font-semibold">
              {profile[currentProfileId].name}
            </h2>
            <p className="text-2xl text-gray-500">last seen 2/5/2025</p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Bell size={16} className="text-gray-600" />
                <span className="text-gray-700 font-bold cursor-pointer">
                  Notifications
                </span>
              </div>
            </div>
            <br />
            <div className="mt-4 space-y-2">
              <span className="font-bold text-4xl">Group members</span>
              {chatHistory[currentChatId].members.map((member) => (
                <p className="text-3xl py-2" key={member.id}>
                  {member.name}
                </p>
              ))}
            </div>
          </div>

          <div className="border-t flex">
            {["Media", "Files", "Links", "Music", "Voice", "Groups"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`flex-1 p-5 text-center text-2xl font-medium border-b-2 ${
                    activeTab.toLowerCase() === tab.toLowerCase()
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* Content */}
          <div className="p-4 text-center text-gray-500 text-2xl">
            No media files yet
          </div>
        </>
      )}
    </div>
  );

  // return (
  //   <div
  //     className={`overflow-hidden transition-all ease-in-out text-2xl ${
  //       visible ? "w-[35rem]" : "w-0"
  //     }`}
  //   >
  //     {profile[currentProfileId] && chatHistory[currentChatId] && (
  //       <>
  //         <img src={profile.avatar} alt="" className="w-full object-contain" />
  //         <DetailProfile profile={profile[currentProfileId]} />
  //         <br />
  //         <div>
  //           group members:
  //           {chatHistory[currentChatId].members.map((member) => (
  //             <p key={member.id}>name: {member.name}</p>
  //           ))}
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
}

export default RoomProfile;
