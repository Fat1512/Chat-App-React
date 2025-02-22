import { useState } from "react";
import { chatListActions } from "../../store/chatListSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../../utils/helper";
import { CheckCircle } from "lucide-react";

export default function CreateGroupItem({
  toggleSelection,
  selected,
  roomInfo,
}) {
  return (
    <li
      onClick={() => toggleSelection(roomInfo.id)} //user id
      className="flex items-center justify-between hover:bg-slate-300 p-2 border-b last:border-b-0"
    >
      <div className="flex rounded-lg w-full h-[7rem] items-center py-3 cursor-pointer px-4">
        <img src={roomInfo.avatar} alt="" className="w-[5rem] object-contain" />
        <div className="flex flex-col w-full text-xl pl-4">
          <div className="flex justify-between">
            <div className="font-bold">
              {roomInfo.name}
              <span>
                {roomInfo.status.online
                  ? `(online)`
                  : `(offline) last seen at ${formatTime(
                      roomInfo.status.lastSeen
                    )}`}
              </span>
            </div>
            <div>
              <span className="pl-2"></span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>{roomInfo?.mode != null && roomInfo.mode}</div>
          </div>
        </div>
      </div>
      <button className="text-gray-500">
        {selected.includes(roomInfo.id) ? (
          <CheckCircle className="text-blue-500" />
        ) : (
          <div className="w-6 h-6 border border-gray-400 rounded-full"></div>
        )}
      </button>
    </li>
  );
}
