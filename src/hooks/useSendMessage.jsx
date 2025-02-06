import { MESSAGE_TYPE } from "../utils/constants";
import { AuthenticationHeader } from "../utils/helper";
import useSocket from "./useSocket";

function useSendMessage() {
  const { stompClient } = useSocket();

  function sendMessage(message, chatRoomId) {
    try {
      console.log(stompClient._stompHandler, stompClient);
      if (!stompClient._stompHandler) return;
      stompClient.publish({
        destination: `/app/chatRoom/${chatRoomId}/sendMessage`,
        body: JSON.stringify(message),
        headers: AuthenticationHeader(),
      });
    } catch (err) {
      toast.error(err.message);
    }
  }

  return { sendMessage };
}

export default useSendMessage;
