import { useState } from "react";
import Button from "../ui/Button";
import SideBar from "./SideBar";
import Chat from "./Chat";
import UserProfile from "./UserProfile";
import ChatHeader from "./Chat/ChatHeader";
import MessageInput from "./Chat/MessageInput";
import MessageList from "./Chat/MessageList";
import Sibling2 from "./Sibling2";
import Sibling1 from "./Sibling1";

function Main() {
  return (
    <main className="flex w-full h-screen transition-all">
      <SideBar />
      <Chat />
      <UserProfile />
    </main>
  );
}

export default Main;
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
