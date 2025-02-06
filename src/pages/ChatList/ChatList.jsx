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
import { SIDEBAR } from "../../utils/constants";
import { sidebarActions } from "../../store/sideBarSlice";

const customStyles = {
  overlay: {
    backgroundColor: `transparent`,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

function ChatList() {
  const { chatList, isLoading, currentChatItemId } = useSelector(
    (state) => state.chatListReducer
  );
  const [isOpenMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();

  function toggleMenu() {
    setOpenMenu(!isOpenMenu);
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
          <div className="text-2xl px-6 cursor-pointer" onClick={toggleMenu}>
            <BsHddStack />
          </div>

          {isOpenMenu && (
            <>
              <OptionMenu>
                <OptionItem
                  onClick={() =>
                    dispatch(sidebarActions.setCurrentSidebar(SIDEBAR.SETTING))
                  }
                >
                  Setting
                </OptionItem>
                <OptionItem
                  onClick={() =>
                    dispatch(sidebarActions.setCurrentSidebar(SIDEBAR.CONTACT))
                  }
                >
                  Contact
                </OptionItem>
              </OptionMenu>
            </>
          )}
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
    </ActiveSidebar>
  );
}

export default ChatList;
