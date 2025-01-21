import { BsHddStack } from "react-icons/bs";
import SideBarHeader from "../SideBar/SideBarHeader";
import SideBarSearchInput from "../SideBar/SideBarSearchInput";
import ChatItem from "./ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_REQUEST } from "../../utils/helper";
import { useEffect, useState } from "react";
import { chatListActions } from "../../store/chatListSlice";
import { chatActions } from "../../store/chatSlice";
import { profileActions } from "../../store/profileSlice";
import Spinner from "../../ui/Spinner";
import { current } from "@reduxjs/toolkit";
import Modal from "react-modal";
import OptionMenu from "../../ui/OptionMenu";
import OptionItem from "../../ui/OptionItem";
import CustomModal from "../../ui/CustomModal";

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
  const [currentModal, setOpenModal] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchChatSummary() {
      const res = await AUTH_REQUEST.get("/api/v1/chatrooms");
      if (res.status != 200) throw new Error("error");
      dispatch(chatListActions.setChatList(res.data.data));
    }
    fetchChatSummary();
  }, []);

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
    <div className="px-3">
      <SideBarHeader className="flex items-center justify-center relative">
        <div className="text-2xl pr-6 cursor-pointer" onClick={toggleMenu}>
          <BsHddStack />
        </div>
        {isOpenMenu && (
          <>
            <OptionMenu>
              <OptionItem onClick={() => setOpenModal("setting")}>
                setting
              </OptionItem>
              <OptionItem onClick={() => setOpenModal("contact")}>
                contact
              </OptionItem>
              <OptionItem onClick={() => setOpenModal("darkmode")}>
                darkmode
              </OptionItem>
            </OptionMenu>
            <CustomModal
              parentSelector={document.getElementById("sidebar-header")}
              currentName={currentModal}
              name="setting"
            >
              setting modal
            </CustomModal>
            <CustomModal
              parentSelector={document.getElementById("sidebar-header")}
              currentName={currentModal}
              name="contact"
            >
              contact modal
            </CustomModal>
            <CustomModal
              parentSelector={document.getElementById("sidebar-header")}
              currentName={currentModal}
              name="darkmode"
            >
              darkmode modal
            </CustomModal>
          </>
        )}

        <SideBarSearchInput />
      </SideBarHeader>
      <div>
        {Object.values(chatList).map((chatItem) => (
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
        ))}
      </div>
    </div>
  );
}

export default ChatList;
