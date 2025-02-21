import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { useEffect } from "react";
import { chatActions } from "../../store/chatSlice";
import Spinner from "../../ui/Spinner";
import useGetChatDetail from "../../hooks/useGetChatDetail";
import { MESSAGE_PAGE, MESSAGE_PAGE_SIZE } from "../../utils/constants";

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
          dispatch(
            chatActions.setChatHistory({
              ...data,
              page: MESSAGE_PAGE,
              last: false,
              paddingOffset: 0,
            })
          );
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
          <div className="flex grow flex-col justify-end px-28 scroll-smooth overflow-hidden">
            <MessageList
              currentChat={currentChat}
              isLast={currentChat.isLast}
              currentChatItemId={currentChatItemId}
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
