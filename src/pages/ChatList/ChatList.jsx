import { BsHddStack } from "react-icons/bs";
import SideBarHeader from "../SideBar/SideBarHeader";
import SideBarSearchInput from "../SideBar/SideBarSearchInput";
import ChatItem from "./ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_REQUEST } from "../../utils/helper";
import { useEffect } from "react";
import { chatListActions } from "../../store/chatListSlice";
import Spinner from "../../ui/Spinner";

function ChatList() {
  const { chatList, isLoading } = useSelector((state) => state.chatListReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchChatSummary() {
      const res = await AUTH_REQUEST.get("/api/v1/chatrooms");
      if (res.status != 200) throw new Error("error");
      dispatch(chatListActions.setChatList(res.data.data));
    }
    fetchChatSummary();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  console.log(chatList);
  return (
    <div className="px-3">
      <SideBarHeader className="flex items-center justify-center">
        <div className="text-2xl pr-6 cursor-pointer">
          <BsHddStack />
        </div>
        <SideBarSearchInput />
      </SideBarHeader>
      <div>
        {chatList.map((chatItem) => (
          <ChatItem
            key={chatItem.chatRoomId}
            userProfile={chatItem.userProfile}
            latestMessage={chatItem.lastestMessage}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
