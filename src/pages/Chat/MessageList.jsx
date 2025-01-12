import { formatDate, formatTime } from "../../utils/helper";
import MessageItem from "./MessageItem";

function MessageList({ messageHistoryList, userProfile }) {
  return (
    <div className="flex flex-col text-2xl text-wrap overflow-y-scroll no-scrollbar pb-6">
      {messageHistoryList.map((messageHistory) => {
        return (
          <div key={+messageHistory.day} className="flex flex-col">
            <div className="text-center">{formatDate(+messageHistory.day)}</div>
            {messageHistory.messages.map((message) => {
              return (
                <MessageItem
                  key={message.id}
                  message={message}
                  userProfile={userProfile}
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
