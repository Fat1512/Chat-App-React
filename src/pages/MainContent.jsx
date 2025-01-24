import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Chat from "./Chat";
import RoomProfile from "./RoomProfile";
import Spinner from "../ui/Spinner";
import Peer from "simple-peer";

import useSocket from "../hooks/useSocket";
import useInit from "../hooks/useInit";
import useVideoCall from "../hooks/useVideoCall";
import ModalComponent from "./ModalComponent";

function MainContent() {
  const { connected } = useSocket();
  const { loaded } = useInit();

  if (!connected || !loaded) return <Spinner />;

  return (
    <>
      <main className="flex w-full h-screen transition-all">
        <SideBar />
        <Chat />
        <RoomProfile />
      </main>
      <ModalComponent />
    </>
  );
}

export default MainContent;
/*

<div class="flex justify-start relative">
  <div class="w-1/6">
    <Button
      onClick={() => {
        setVisible(!visible);
      }}
    >
      Click me
    </Button>
  </div>
  <div
    class={`bg-red-300 transition-all ease-in-out rounded flex justify-center items-center text-2xl ${
      visible ? "w-3/6" : "w-5/6"
    }`}
  >
    Hi
  </div>
  <div
    class={`bg-orange-400 overflow-hidden transition-all rounded ease-in-out h-full shrink-0 absolute top-0 right-0 z-20 shadow-lg shadow-box-shadow text-2xl flex justify-center items-center ${
      visible ? "w-2/6" : "w-0 "
    }`}
  >
    Menu
  </div>
</div>

*/
