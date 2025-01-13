import { Client, Stomp } from "@stomp/stompjs";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationHeader, getAuthToken } from "../utils/helper";

const SocketContext = createContext();

export const SocketProvider = function ({ children }) {
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState();

  useEffect(() => {
    const connectWebSocket = function () {
      const sock = new SockJS(`http://127.0.0.1:8080/ws`);
      const client = Stomp.over(sock);
      client.debug = () => {};
      client.connect(
        AuthenticationHeader,
        () => {
          setStompClient(client);
          setConnected(true);
          console.log("successfully connected");
        },
        () => {
          console.log("error occured");
        }
      );
    };
    !connected && connectWebSocket();
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
