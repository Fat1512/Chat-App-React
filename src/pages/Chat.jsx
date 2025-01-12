import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./Chat/ChatHeader";
import MessageInput from "./Chat/MessageInput";
import MessageList from "./Chat/MessageList";
import { useEffect } from "react";
import { chatActions } from "../store/chatSlice";
import { AUTH_REQUEST } from "../utils/helper";
import { profileActions } from "../store/profileSlice";
import Spinner from "../ui/Spinner";
import useSocket from "../hooks/useSocket";

function Chat() {
  const { chatHistory, currentChatId, visible, isLoading } = useSelector(
    (state) => state.chatReducer
  );
  const chatList = useSelector((state) => state.chatListReducer.chatList);
  const dispatch = useDispatch();

  const currentChat = chatHistory[currentChatId];

  useEffect(() => {
    //Initial state
    if (!currentChatId) return;
    else if (!chatHistory[currentChatId]) {
      async function fetchChatDetail() {
        console.log("chua co");
        const res = await AUTH_REQUEST.get(
          `/api/v1/chatrooms/${currentChatId}`
        );
        if (res.status != 200) throw new Error("error");
        res.data.data.userProfile = chatList.filter(
          (chatItem) => chatItem.chatRoomId == currentChatId
        )[0].userProfile;
        dispatch(chatActions.setChatHistory(res.data.data));
        dispatch(chatActions.setVisible(true));
        dispatch(profileActions.setProfile(res.data.data.userProfile));
      }
      fetchChatDetail();
    } else {
      dispatch(
        profileActions.setProfile(chatHistory[currentChatId].userProfile)
      );
    }
  }, [currentChatId]);

  if (!currentChat && currentChatId !== null) return <Spinner />;

  return (
    <div className={`flex flex-col chat-bg grow h-screen ease-in-out`}>
      {visible && (
        <>
          <ChatHeader
            name={currentChat.userProfile.name}
            status={currentChat.userProfile.status}
          />
          <div className="flex grow flex-col justify-end px-60 overflow-hidden">
            <MessageList
              messageHistoryList={currentChat.messageHistory} //Object with key as day
              userProfile={currentChat.userProfile}
            />
            <MessageInput chatRoomId={currentChatId} />
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
// isLoading: true,
// chatHistory: {}, //cache fetched messages, key = chatRoomId
// currentChat: {},
// visible: false,

// const initialState = {
//   isLoading: true,
//   chatList: [],
//   currentActiveItem: null, //chatRoomId
// };
