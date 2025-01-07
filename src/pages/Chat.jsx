import ChatHeader from "./Chat/ChatHeader";
import MessageInput from "./Chat/MessageInput";
import MessageList from "./Chat/MessageList";

function Chat() {
  return (
    <div className={`flex flex-col chat-bg grow h-screen ease-in-out`}>
      <ChatHeader />
      <div className="flex grow flex-col justify-end px-60 overflow-hidden">
        <MessageList />
        <MessageInput />
      </div>
    </div>
  );
}

export default Chat;
