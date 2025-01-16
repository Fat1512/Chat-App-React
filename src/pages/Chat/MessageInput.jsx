import { useState } from "react";
import { BsSearch, BsSendFill } from "react-icons/bs";
import useSocket from "../../hooks/useSocket";
import { AuthenticationHeader } from "../../utils/helper.js";

function MessageInput({ chatRoomId }) {
  const { stompClient, connected } = useSocket();
  const [message, setMessage] = useState();
  function handleSendMessage() {
    if (!connected) return;
    stompClient.publish({
      destination: `/app/chatRoom/${chatRoomId}/sendMessage`,
      body: JSON.stringify({
        messageType: "TEXT",
        content: message,
      }),
    });
  }

  return (
    <div className="flex shrink-0 justify-center items-center rounded-full border focus-within:border mb-5">
      <input
        onChange={(e) => {
          stompClient.publish({
            destination: `/app/chatRoom/${chatRoomId}/typing`,
            headers: AuthenticationHeader,
          });
          setMessage(e.target.value);
        }}
        type="text"
        className="text-2xl mr-7 p-4 focus-within:outline-none w-full rounded"
        placeholder="Search"
      />
      <span
        className="text-3xl cursor-pointer"
        onClick={() => handleSendMessage()}
      >
        <BsSendFill />
      </span>
    </div>
  );
}

export default MessageInput;
