import { BsHddStack } from "react-icons/bs";
import SideBarHeader from "../SideBar/SideBarHeader";
import SideBarSearchInput from "../SideBar/SideBarSearchInput";
import ChatItem from "./ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_REQUEST } from "../../utils/helper";
import { useEffect } from "react";
import { chatListActions } from "../../store/chatListSlice";
import Spinner from "../../ui/Spinner";
import { current } from "@reduxjs/toolkit";

function ChatList() {
  const { chatList, isLoading, currentChatItemId } = useSelector(
    (state) => state.chatListReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchChatSummary() {
      const res = await AUTH_REQUEST.get("/api/v1/chatrooms");
      if (res.status != 200) throw new Error("error");
      dispatch(chatListActions.setChatList(res.data.data));
    }
    fetchChatSummary();
  }, []);

  function switchActiveChatItem(chatRoomId) {
    if (chatRoomId === chatList.currentChatItemId) return;
    dispatch(chatListActions.setCurrentChatRoomId(chatRoomId));
  }

  if (isLoading) {
    return <Spinner />;
  }
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
            currentChatItemId={currentChatItemId}
            onClick={switchActiveChatItem}
            id={chatItem.chatRoomId}
            key={chatItem.chatRoomId}
            userProfile={chatItem.userProfile}
            latestMessage={chatItem.lastestMessage}
            totalUnreadMessages={chatItem.totalUnreadMessages}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
