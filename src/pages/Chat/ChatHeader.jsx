import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function ChatHeader({ visible, setVisible }) {
  return (
    <div
      className="flex rounded-lg w-full items-center bg-white py-3 px-4 cursor-pointer"
      // onClick={() => setVisible(!visible)}
    >
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
        alt=""
        className="w-[5rem] object-contain"
      />
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col w-full text-xl pl-4">
          <div className="font-bold">Phat</div>
          <div>status</div>
        </div>
        <div className="text-2xl px-5 cursor-pointer">
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
