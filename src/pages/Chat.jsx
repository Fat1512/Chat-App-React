import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./Chat/ChatHeader";
import MessageInput from "./Chat/MessageInput";
import MessageList from "./Chat/MessageList";
import { useEffect, useRef } from "react";
import { chatActions } from "../store/chatSlice";
import {
  AUTH_REQUEST,
  AuthenticationHeader,
  getStartMiliOfDay,
} from "../utils/helper";
import { profileActions } from "../store/profileSlice";
import Spinner from "../ui/Spinner";
import useSocket from "../hooks/useSocket";

function Chat() {
  const dispatch = useDispatch();
  const { chatHistory, currentChatId, visible, isLoading } = useSelector(
    (state) => state.chatReducer
  );
  const { currentChatItemId } = useSelector((state) => state.chatListReducer);
  useEffect(() => {
    //Initial state
    if (!currentChatItemId) return;
    else if (!chatHistory[currentChatItemId]) {
      dispatch(chatActions.setIsLoading(true));

      async function fetchChatDetail() {
        const res = await AUTH_REQUEST.get(
          `/api/v1/chatrooms/${currentChatItemId}`
        );
        if (res.status != 200) throw new Error("error");

        dispatch(chatActions.setChatHistory(res.data.data));
        dispatch(chatActions.setCurrentChatId(res.data.data.chatRoomId));
        dispatch(chatActions.setVisible(true));
        dispatch(chatActions.setIsLoading(false));
      }
      fetchChatDetail();
    } else {
      dispatch(chatActions.setCurrentChatId(currentChatItemId));
    }
  }, [currentChatItemId]);

  if (isLoading) return <Spinner />;
  return (
    <div className={`flex flex-col chat-bg grow h-screen ease-in-out`}>
      {visible && (
        <>
          <ChatHeader />
          <div className="flex grow flex-col justify-end px-60 overflow-hidden">
            <MessageList
              messageHistoryList={chatHistory[currentChatId].messageHistory} //Object with key as day
            />
            <MessageInput chatRoomId={chatHistory[currentChatId].chatRoomId} />
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
