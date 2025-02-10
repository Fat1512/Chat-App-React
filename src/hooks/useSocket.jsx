import { Client, Stomp } from "@stomp/stompjs";
import { createContext, useContext, useEffect, useState } from "react";
import {
  AuthenticationHeader,
  getAccessToken,
  removeLocalStorageToken,
  setLocalStorageToken,
} from "../utils/helper";
import { refreshToken } from "../services/tokenAPI";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/APIUrl";

const SocketContext = createContext();

export const SocketProvider = function ({ children }) {
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState();
  const [reconnecting, setReconnecting] = useState(false);
  const [reconnectCount, setReconnectCount] = useState(0);

  useEffect(() => {
    const modernWebSocket = function () {
      const client = new Client({
        connectHeaders: AuthenticationHeader(),
        reconnectDelay: 2000,
        disconnectHeaders: AuthenticationHeader(),
        brokerURL: `${BASE_URL}/ws`,
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
        onStompError: async function (err) {
          window.location.reload();
          // try {
          //   if (document.readyState == "loading") {
          //     window.localStorage.setItem("loading", true);
          //   }
          //   window.localStorage.setItem("loading", document.readyState);

          //   window.localStorage.setItem("reload", JSON.stringify(err));
          // const token = await refreshToken();
          // setLocalStorageToken(token);
          // setReconnecting(true);
          // setReconnectCount((reconnectCnt) => reconnectCnt + 1);
          // } catch (err) {
          //   toast.err(err.message);
          // }
        },
        onDisconnect: async function () {},
        onWebSocketClose: () => {},
      });

      client.activate();
      window.addEventListener("beforeunload", function () {
        client.publish({
          destination: `/app/disconnect`,
          headers: AuthenticationHeader(),
        });
      });
      setReconnecting(false);
    };

    (!connected || reconnecting) && modernWebSocket();
  }, [connected, reconnecting, setLocalStorageToken]);

  return (
    <SocketContext.Provider
      value={{
        reconnectCount,
        reconnecting,
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
