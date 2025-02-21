import { useEffect, useRef } from "react";
import useUser from "../../hooks/useUser";
import { formatDate, formatTime } from "../../utils/helper";
import MessageItem from "./MessageItem";
import { getMessagesAPI } from "../../services/messageAPI";
import { current } from "@reduxjs/toolkit";
import { MESSAGE_PAGE_SIZE } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { chatActions } from "../../store/chatSlice";

function MessageList({ messageHistoryList, currentChat }) {
  const { isLoading, user: currentUser } = useUser();
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    let previousScrollHeight = container.scrollHeight;

    async function onScroll() {
      if (container?.scrollTop == 0 && !currentChat.last) {
        const data = await getMessagesAPI({
          chatRoomId: currentChat.chatRoomId,
          page: currentChat.page + 1,
          paddingOffset: currentChat.paddingOffset,
        });
        dispatch(chatActions.updatePaginationMessageHistory(data));
      }
    }
    container.addEventListener("scroll", onScroll);

    return () => {
      container.scrollTop += container.scrollHeight - previousScrollHeight;
      container.removeEventListener("scroll", onScroll);
    };
  }, [currentChat, containerRef.current]);
  return (
    <div
      ref={containerRef}
      className="flex flex-col text-2xl text-wrap overflow-y-scroll no-scrollbar pb-6"
    >
      {messageHistoryList.map((messageHistory) => {
        return (
          <div key={+messageHistory.day} className="flex flex-col">
            <div className="text-center">{formatDate(+messageHistory.day)}</div>
            {messageHistory.messages.map((message) => {
              return (
                <MessageItem
                  key={message.id}
                  message={message}
                  currentUser={currentUser}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;

/**
 *
 *
 *
 */
