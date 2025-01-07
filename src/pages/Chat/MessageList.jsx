import { formatDate, formatTime } from "../../utils/helper";
import MessageItem from "./MessageItem";

function MessageList({ messageHistory, userProfile }) {
  return (
    <div className="flex flex-col text-2xl text-wrap overflow-y-scroll no-scrollbar pb-6">
      {Object.entries(messageHistory).map((messages) => {
        return (
          <div key={+messages[0]} className="flex flex-col">
            <div className="text-center">{formatDate(+messages[0])}</div>
            {messages[1].map((msg) => {
              return (
                <MessageItem
                  key={msg.id}
                  message={msg}
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
