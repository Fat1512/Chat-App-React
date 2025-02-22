import ChatList from "./ChatList/ChatList";
import Setting from "./Setting/Setting";
import Contact from "./Contact/Contact";
import { useState } from "react";
import CreateGroup from "./Group/CreateGroup";

function SideBar() {
  return (
    <div className="w-[40rem] h-screen flex">
      <ChatList />
      <Contact />
      <Setting />
      <CreateGroup />
    </div>
  );
}

export default SideBar;
