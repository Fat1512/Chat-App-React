import ChatList from "./ChatList/ChatList";
import Setting from "./Setting/Setting";
import Contact from "./Contact/Contact";
import { uploadImage } from "../services/apiUser";
import { useState } from "react";

function SideBar() {
  function change(event) {
    console.log(event.target.files, event.target.extraFileData);
    const currentFile = event.target.files[0];
    let formData = new FormData();
    formData.append("file", currentFile);
    uploadImage(formData);
  }

  return (
    <div className="w-[30rem]">
      <div>
        <input type="file" onChange={change} />
      </div>
      <ChatList />
      <Contact />
      <Setting />
    </div>
  );
}

export default SideBar;
