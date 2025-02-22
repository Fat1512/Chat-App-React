import { sidebarActions } from "../../store/sideBarSlice";
import ActiveSidebar from "../../ui/ActiveSidebar";
import { MODAL, SIDEBAR } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import SideBarSearchInput from "../SideBar/SideBarSearchInput";
import SideBarHeader from "../SideBar/SideBarHeader";
import ContactItem from "./ContactItem";
import Modal from "react-modal";
import { BiArrowBack, BiSolidAddToQueue } from "react-icons/bi";
import { modalActions } from "../../store/modalSlide";
import { ContextMenu } from "primereact/contextmenu";
import { useRef } from "react";
import { Button } from "primereact/button";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
  },
};

Modal.setAppElement("#root");

function Contact() {
  const dispatch = useDispatch();
  const { contactList } = useSelector((state) => state.contactReducer);
  return (
    <ActiveSidebar sidebarName={SIDEBAR.CONTACT}>
      <div className="px-3">
        <SideBarHeader className="flex items-center justify-around px-3 relative">
          <div
            onClick={() =>
              dispatch(sidebarActions.setCurrentSidebar(SIDEBAR.CHATLIST))
            }
            className="text-3xl p-4 full-rounded cursor-pointer"
          >
            <BiArrowBack />
          </div>
          <SideBarSearchInput />
        </SideBarHeader>
        <div>
          {Object.values(contactList).map((contactItem) => (
            <ContactItem
              key={contactItem.contactId}
              contactId={contactItem.contactId}
              chatRoomId={contactItem.chatRoomId}
              roomInfo={contactItem.roomInfo}
            />
          ))}
        </div>

        <div
          onClick={() =>
            dispatch(modalActions.setCurrentModal(MODAL.ADD_CONTACT))
          }
          className="absolute bottom-10 right-10 rounded-full cursor-pointer p-9 bg-blue-300 text-4xl"
        >
          <BiSolidAddToQueue />
        </div>
      </div>
    </ActiveSidebar>
  );
}

export default Contact;
