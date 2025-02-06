import { Client, Stomp } from "@stomp/stompjs";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationHeader, getAccessToken } from "../utils/helper";

const SocketContext = createContext();

export const SocketProvider = function ({ children }) {
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState();
  useEffect(() => {
    const modernWebSocket = function () {
      const client = new Client({
        connectHeaders: AuthenticationHeader(),
        disconnectHeaders: AuthenticationHeader(),
        brokerURL: "ws://localhost:8080/ws",
        // heartbeatOutgoing: 6000,
        heartbeatOutgoing: 0,
        onConnect: () => {
          client.publish({
            destination: `/app/connect`,
            headers: AuthenticationHeader(),
          });

          setStompClient(client);
          setConnected(true);
        },
        onDisconnect: () => {
          console.log("disconnected");
          // setStompClient(null);
          // setConnected(false);
        },
        onStompError: (err) => {
          console.log(err);
        },
      });
      client.activate();
      window.addEventListener("beforeunload", function () {
        console.log("disconnection");
        client.publish({
          destination: `/app/disconnect`,
          headers: AuthenticationHeader(),
        });
      });
    };
    !connected && modernWebSocket();
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
