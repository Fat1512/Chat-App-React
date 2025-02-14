import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { useEffect, useRef } from "react";
import { chatActions } from "../../store/chatSlice";
import { AuthenticationHeader, getStartMiliOfDay } from "../../utils/helper";
import { AUTH_REQUEST } from "../../utils/axiosConfig";
import { profileActions } from "../../store/profileSlice";
import Spinner from "../../ui/Spinner";
import useSocket from "../../hooks/useSocket";
import useChat from "../../hooks/useGetChatDetail";
import useGetChatDetail from "../../hooks/useGetChatDetail";

function Chat() {
  const dispatch = useDispatch();
  const { currentChatItemId } = useSelector((state) => state.chatListReducer);
  const { chatHistory, currentChatId, visible, isLoading } = useSelector(
    (state) => state.chatReducer
  );
  const { getChatDetail } = useGetChatDetail();
  const currentChat = chatHistory[currentChatId];

  useEffect(() => {
    if (!currentChatItemId) return;
    else if (!chatHistory[currentChatItemId]) {
      dispatch(chatActions.setIsLoading(true));
      getChatDetail(currentChatItemId, {
        onSuccess: (data) => {
          dispatch(chatActions.setChatHistory(data));
          dispatch(chatActions.setCurrentChatId(data.chatRoomId));
          dispatch(chatActions.setVisible(true));
          dispatch(chatActions.setIsLoading(false));
        },
      });
    } else {
      dispatch(chatActions.setCurrentChatId(currentChatItemId));
      dispatch(chatActions.setVisible(true));
    }
  }, [currentChatItemId]);

  if (isLoading) return <Spinner />;

  return (
    <div className={`flex flex-col chat-bg grow h-screen ease-in-out`}>
      {visible && (
        <>
          <ChatHeader currentChatRoomId={currentChat.chatRoomId} />
          <div className="flex grow flex-col justify-end px-60 overflow-hidden">
            <MessageList
              messageHistoryList={currentChat.messageHistory} //Object with key as day
            />
            <MessageInput chatRoomId={currentChat.chatRoomId} />
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
