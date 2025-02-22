import { useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import ActiveSidebar from "../../ui/ActiveSidebar";
import { MODAL, SIDEBAR } from "../../utils/constants";
import SideBarHeader from "../SideBar/SideBarHeader";
import SideBarSearchInput from "../SideBar/SideBarSearchInput";
import { sidebarActions } from "../../store/sideBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack, BiSolidAddToQueue } from "react-icons/bi";
import ContactItem from "../Contact/ContactItem";
import CreateGroupItem from "./CreateGroupItem";
import { modalActions } from "../../store/modalSlide";
import { BsArrowRight } from "react-icons/bs";
import toast from "react-hot-toast";
import { contactActions } from "../../store/contactSlice";

export default function CreateGroup() {
  // const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const { contactList, selectedContact } = useSelector(
    (state) => state.contactReducer
  );

  const toggleSelection = (userId) => {
    dispatch(contactActions.setSelectedContact(userId));
    // setSelected((prev) =>
    //   prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    // );
  };

  function openCreateGroupModal() {
    if (!selectedContact.length) {
      toast.error("No contact selected");
      return;
    }
    dispatch(modalActions.setCurrentModal(MODAL.CREATE_GROUP));
  }
  console.log(selectedContact);
  return (
    <ActiveSidebar sidebarName={SIDEBAR.CREATEGROUP}>
      <div className="px-3 h-full">
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
        <h2 className="text-3xl font-semibold py-4">Add Members</h2>
        <ul className="mt-4 space-y-3">
          <div>
            {Object.values(contactList).map((contactItem) => (
              <CreateGroupItem
                selected={selectedContact}
                toggleSelection={toggleSelection}
                key={contactItem.contactId}
                roomInfo={contactItem.roomInfo}
              />
            ))}
          </div>
        </ul>
        <button className="fixed bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg text-white hover:bg-blue-600">
          <ArrowRight size={24} />
        </button>
      </div>
      <div
        onClick={openCreateGroupModal}
        className="absolute bottom-10 right-10 rounded-full cursor-pointer p-9 bg-blue-300 text-4xl"
      >
        <BsArrowRight />
      </div>
    </ActiveSidebar>
  );
}
