import ChatList from "./ChatList/ChatList";
import Setting from "./Setting/Setting";
import Contact from "./Contact/Contact";
import { useState } from "react";

function SideBar() {
  return (
    <div className="w-[40rem]">
      <ChatList />
      <Contact />
      <Setting />
    </div>
  );
}

export default SideBar;
