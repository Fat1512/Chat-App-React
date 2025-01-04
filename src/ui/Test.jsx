import useSocket from "../hooks/useSocket";
import { Stomp } from "@stomp/stompjs";

function Test() {
  const { connected, stompClient } = useSocket();

  function sendMessage() {
    const listen = () => {
      console.log(stompClient);
      stompClient.send(
        "/app/room",
        {},
        JSON.stringify("Im testing web socket")
      );
    };
    connected && listen();
  }

  return (
    <div>
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        click me to send message
      </button>
      <button
        onClick={() => {
          getState();
        }}
      >
        Click to get all the state info
      </button>
    </div>
  );
}

export default Test;
