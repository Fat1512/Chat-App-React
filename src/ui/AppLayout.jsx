import { Children, useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import { Outlet } from "react-router-dom";
import useSocket from "../hooks/useSocket";

function AppLayout() {
  // const { connected, stompClient } = useSocket();

  // useEffect(() => {
  //   if (connected) {
  //     console.log("Connected status: ", connected, stompClient);
  //     stompClient.subscribe(`/topic/room`, (message) => {
  //       console.log(JSON.parse(message.body));
  //     });
  //   }
  // }, [connected]);

  return <Outlet />;
}

export default AppLayout;
{
  /* <h1>Phat </h1>
      <button onClick={() => {}}>disconnect</button>
      <br />
      <button
        onClick={() => {
          stompClient.connect({}, function () {});
        }}
      >
        connect
      </button> */
}
