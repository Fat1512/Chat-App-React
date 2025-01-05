import { Stomp } from "@stomp/stompjs";
import { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext();

export const SocketProvider = function ({ children }) {
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState();

  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`http://localhost:8080/ws`);
      const client = Stomp.over(sock);
      client.connect({}, function () {
        setStompClient(client);
        setConnected(true);
      });
    };
    // !connected && connectWebSocket();
  }, [connected]);

  return (
    <SocketContext.Provider
      value={{
        connected,
        stompClient,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);
export default useSocket;
