import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./Chat/ChatHeader";
import MessageInput from "./Chat/MessageInput";
import MessageList from "./Chat/MessageList";
import { useEffect } from "react";
import { chatActions } from "../store/chatSlice";
import { AUTH_REQUEST } from "../utils/helper";

function Chat() {
  const { chatHistory, currentChat, visible, isLoading } = useSelector(
    (state) => state.chatReducer
  );
  const { chatList, currentChatItemId } = useSelector(
    (state) => state.chatListReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //Initial state
    if (!currentChatItemId) return;
    else if (chatHistory[currentChatItemId]) {
      //If already existed
      dispatch(chatActions.setCurrentChat(chatHistory[currentChatItemId]));
    } else {
      //If not
      async function fetchChatDetail() {
        const res = await AUTH_REQUEST.get(
          `/api/v1/chatrooms/${currentChatItemId}`
        );
        if (res.status != 200) throw new Error("error");
        res.data.data.userProfile = chatList.filter(
          (chatItem) => chatItem.chatRoomId == currentChatItemId
        )[0].userProfile;
        dispatch(chatActions.setChatHistory(res.data.data));
        dispatch(chatActions.setCurrentChat(res.data.data));
        dispatch(chatActions.setVisible(true));
      }
      fetchChatDetail();
    }
  }, [currentChatItemId]);

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
              messageHistory={currentChat.messageHistory} //Object with key as day
              userProfile={currentChat.userProfile}
            />
            <MessageInput />
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
