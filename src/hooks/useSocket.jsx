import { Client, Stomp } from "@stomp/stompjs";
import { createContext, useContext, useEffect, useState } from "react";
import {
  AuthenticationHeader,
  getAccessToken,
  setLocalStorageToken,
} from "../utils/helper";
import { refreshToken } from "../services/tokenAPI";

const SocketContext = createContext();

export const SocketProvider = function ({ children }) {
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState();
  const [reconnectCount, setReconnectCount] = useState(0);
  const [reconnecting, setReconnecting] = useState(false);
  async function refreshSocketToken() {
    // console.log(stompClient);
    // const token = await refreshToken();
    // setLocalStorageToken(token);
    // stompClient.deactivate();
    // stompClient.connectHeaders = AuthenticationHeader();
    // stompClient.activate();
    // setReconnectCount((reconnectCount) => reconnectCount + 1);
  }

  useEffect(() => {
    const modernWebSocket = function () {
      const client = new Client({
        connectHeaders: AuthenticationHeader(),
        reconnectDelay: 0,
        disconnectHeaders: AuthenticationHeader(),
        brokerURL: "ws://localhost:8080/ws",

        // heartbeatOutgoing: 6000,
        heartbeatOutgoing: 0,
        onConnect: () => {
          client.publish({
            destination: `/app/connect`,
            headers: AuthenticationHeader(),
          });
          console.log("connectt");
          setStompClient(client);
          setConnected(true);
        },
        onDisconnect: async function () {
          console.log("disconnected");
          // setStompClient(null);
          // setConnected(false);
        },
        onStompError: async function (err) {
          refreshSocketToken();
          const token = await refreshToken();
          setLocalStorageToken(token);
          setReconnectCount((reconnectCount) => reconnectCount + 1);
          setReconnecting(true);
          // setReconnectCount((reconnectCount) => reconnectCount + 1);
        },
        onWebSocketClose: () => {
          console.log("closing");
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
      setReconnecting(false);
    };

    (!connected || reconnecting) && modernWebSocket();
  }, [connected, reconnecting]);

  return (
    <SocketContext.Provider
      value={{
        reconnecting,
        reconnectCount,
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
