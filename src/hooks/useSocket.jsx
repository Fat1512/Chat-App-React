import { Client, Stomp } from "@stomp/stompjs";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationHeader, getAuthToken } from "../utils/helper";

const SocketContext = createContext();

export const SocketProvider = function ({ children }) {
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState();

  useEffect(() => {
    // const connectWebSocket = function () {
    //   const sock = new SockJS(`http://127.0.0.1:8080/ws`);
    //   const client = Stomp.over(sock);
    //   client.heartbeat.outgoing = 6000;

    //   client.connect(
    //     AuthenticationHeader,
    //     () => {
    //       setStompClient(client);
    //       setConnected(true);
    //       console.log("successfully connected");
    //     },
    //     () => {
    //       console.log("error occured");
    //     }
    //   );
    // };
    // !connected && connectWebSocket();

    const modernWebSocket = function () {
      const client = new Client({
        connectHeaders: AuthenticationHeader,
        brokerURL: "ws://localhost:8080/ws",
        heartbeatOutgoing: 6000,
        onConnect: () => {
          setStompClient(client);
          setConnected(true);
        },
        onDisconnect: () => {
          client.publish({ destination: "/app/test" });
        },
      });
      client.activate();
    };
    !connected && modernWebSocket();
    // connected && disconnectWebSocket();
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
