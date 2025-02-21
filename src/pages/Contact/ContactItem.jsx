import { useDispatch } from "react-redux";
import { formatTime } from "../../utils/helper";
import { chatListActions } from "../../store/chatListSlice";
import { ContextMenu } from "primereact/contextmenu";
import { useRef } from "react";
import useDeleteContact from "../../hooks/useDeleteContact.";
import { contactActions } from "../../store/contactSlice";

function ContactItem({ chatRoomId, contactId, roomInfo }) {
  const dispatch = useDispatch();
  const menu = useRef(null);
  const selectedItemRef = useRef(null);
  const { deleteContact } = useDeleteContact();

  const items = [
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: function () {
        console.log("phat dep trai", contactId);
        deleteContact(contactId, {
          onSuccess: () => {
            console.log(chatRoomId);
            dispatch(contactActions.removeContact({ chatRoomId }));
          },
        });
      },
    },
  ];
  const handleRightClick = (event, chatRoomId) => {
    event.preventDefault(); // Prevent default context menu
    selectedItemRef.current = chatRoomId; // Store selected item
    menu.current.show(event); // Show PrimeReact ContextMenu
  };

  return (
    <div
      onContextMenu={(e) => handleRightClick(e, chatRoomId)}
      onClick={() => dispatch(chatListActions.setCurrentChatRoomId(chatRoomId))}
      className="flex rounded-lg w-full h-[7rem] items-center py-3 cursor-pointer hover:bg-slate-300 px-4"
    >
      <ContextMenu className="custom-menu" model={items} ref={menu} />
      <img
        // src="https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
        src={roomInfo.avatar}
        alt=""
        className="w-[5rem] object-contain"
      />
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
  );
}

export default ContactItem;
