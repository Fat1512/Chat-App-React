import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { profileActions } from "../../store/profileSlice";

function ChatHeader({ name, status }) {
  const { visible } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();

  return (
    <div
      className="flex rounded-lg w-full items-center bg-white py-3 px-4 cursor-pointer"
      onClick={() => dispatch(profileActions.setVisible(!visible))}
    >
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
        alt=""
        className="w-[5rem] object-contain"
      />
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col w-full text-xl pl-4">
          <div className="font-bold">{name}</div>
          <div>{status.online ? `online` : `offline last seen: 12h55`}</div>
        </div>
        <div className="text-2xl px-5 cursor-pointer">
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
