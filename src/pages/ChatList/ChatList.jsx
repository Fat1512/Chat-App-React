import { BsHddStack } from "react-icons/bs";
import SideBarHeader from "../SideBar/SideBarHeader";
import SideBarSearchInput from "../SideBar/SideBarSearchInput";
import ChatItem from "./ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_REQUEST } from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import { chatListActions } from "../../store/chatListSlice";
import { chatActions } from "../../store/chatSlice";
import { profileActions } from "../../store/profileSlice";
import Spinner from "../../ui/Spinner";
import { current } from "@reduxjs/toolkit";
import Modal from "react-modal";
import OptionMenu from "../../ui/OptionMenu";
import OptionItem from "../../ui/OptionItem";
import { AnimatePresence, motion } from "motion/react";
import ActiveSidebar from "../../ui/ActiveSidebar";
import { MODAL, SIDEBAR } from "../../utils/constants";
import { sidebarActions } from "../../store/sideBarSlice";
import ChatListMenuModal from "./ChatListMenuModal";
import { modalActions } from "../../store/modalSlide";
import { AuthenticationHeader } from "../../utils/helper";
import useSubscribe from "../../hooks/useSubscribe";
import useSocket from "../../hooks/useSocket";
import useUser from "../../hooks/useUser";
import { BiSolidAddToQueue } from "react-icons/bi";

function ChatList() {
  const { chatList, isLoading, currentChatItemId } = useSelector(
    (state) => state.chatListReducer
  );
  const chatListKeysCount = useSelector(
    (state) => Object.keys(state.chatListReducer.chatList).length
  );
  const { stompClient } = useSocket();
  const { user } = useUser();
  const { subscribeAllTheMessageEvent } = useSubscribe();
  const dispatch = useDispatch();

  useEffect(() => {
    const subObj = stompClient.subscribe(
      `/topic/chatRoom/${user.id}/newChatRoom`,
      (message) => {
        //In case user has added another user in group
        const body = JSON.parse(message.body);

        if (chatList[body.chatRoomId]) return;

        subscribeAllTheMessageEvent(body.chatRoomId);
        dispatch(chatListActions.setChatList([body]));
      },
      AuthenticationHeader()
    );

    return () =>
      stompClient?.unsubscribe(subObj.id, {
        ...AuthenticationHeader(),
      });
  }, [chatListKeysCount, stompClient]);

  function toggleMenu(e) {
    const target = e.target.closest(".menu");
    const dimension = target.getBoundingClientRect();
    const x = dimension.x - dimension.width;
    const y = dimension.height + dimension.y;
    dispatch(modalActions.setCurrentModal(MODAL.CHATLIST_MENU));
    dispatch(
      modalActions.setPosition({
        left: x,
        top: y,
        right: "auto",
        bottom: "auto",
      })
    );
  }

  function switchActiveChatItem(chatRoomId) {
    if (chatRoomId === currentChatItemId) return;
    dispatch(chatListActions.setCurrentChatRoomId(chatRoomId));
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <ActiveSidebar sidebarName={SIDEBAR.CHATLIST}>
      <div className="px-3">
        <SideBarHeader className="flex items-center justify-around px-3 relative">
          <div
            className="text-2xl p-6 cursor-pointer menu"
            onClick={toggleMenu}
          >
            <BsHddStack />
          </div>
          <SideBarSearchInput />
        </SideBarHeader>
        <div>
          {Object.values(chatList).map(
            (chatItem) =>
              (chatItem.roomType == "GROUP" ||
                (chatItem.roomType == "PRIVATE" &&
                  chatItem.lastestMessage != null) ||
                chatItem.roomType == "CHATBOT") && (
                <ChatItem
                  roomType={chatItem.roomType}
                  currentChatItemId={currentChatItemId}
                  onClick={switchActiveChatItem}
                  id={chatItem.chatRoomId}
                  key={chatItem.chatRoomId}
                  roomInfo={chatItem.roomInfo}
                  latestMessage={chatItem.lastestMessage}
                  totalUnreadMessages={chatItem.totalUnreadMessages}
                />
              )
          )}
        </div>
      </div>
      <div
        onClick={() =>
          dispatch(sidebarActions.setCurrentSidebar(SIDEBAR.CREATEGROUP))
        }
        className="absolute bottom-10 right-10 rounded-full cursor-pointer p-9 bg-blue-300 text-4xl"
      >
        <BiSolidAddToQueue />
      </div>
      <ChatListMenuModal />
    </ActiveSidebar>
  );
}

export default ChatList;
