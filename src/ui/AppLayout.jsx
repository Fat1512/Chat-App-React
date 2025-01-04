import { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import { Outlet } from "react-router-dom";
import useSocket from "../hooks/useSocket";

function AppLayout() {
  const { connected, stompClient } = useSocket();

  useEffect(() => {
    if (connected) {
      console.log("Connected status: ", connected, stompClient);
      stompClient.subscribe(`/topic/room`, (message) => {
        console.log(JSON.parse(message.body));
      });
    }
  }, [connected]);

  return (
    <main className=" bg-gray-800 pb-7 text-white ">
      <h1>Phat </h1>
      <button onClick={() => {}}>disconnect</button>
      <br />
      <button
        onClick={() => {
          stompClient.connect({}, function () {});
        }}
      >
        connect
      </button>
      <Outlet />
    </main>
  );
}

export default AppLayout;
