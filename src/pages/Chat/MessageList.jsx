import { useEffect, useRef } from "react";
import useUser from "../../hooks/useUser";
import { formatDate, formatTime } from "../../utils/helper";
import MessageItem from "./MessageItem";

function MessageList({ messageHistoryList }) {
  const { isLoading, user: currentUser } = useUser();
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messageHistoryList]);
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
