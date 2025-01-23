import { useDebugValue, useState } from "react";
import { sidebarActions } from "../../store/sideBarSlice";
import ActiveSidebar from "../../ui/ActiveSidebar";
import { SIDEBAR } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import SideBarSearchInput from "../SideBar/SideBarSearchInput";
import SideBarHeader from "../SideBar/SideBarHeader";
import Spinner from "../../ui/Spinner";
import ContactItem from "./ContactItem";
import Button from "../../ui/Button";
import Modal from "react-modal";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { addContact } from "../../services/contactAPI";
import { contactActions } from "../../store/contactSlice";
import { chatListActions } from "../../store/chatListSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "orange",
  },
};

Modal.setAppElement("#root");

function Contact() {
  const dispatch = useDispatch();
  const { contactList, isLoading } = useSelector(
    (state) => state.contactReducer
  );
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const [modalIsOpen, setIsOpen] = useState(false);

  function captureName(e) {
    setName(e.target.value);
  }

  function captureUsername(e) {
    setUsername(e.target.value);
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function success() {
    const data = await addContact({ username, name });
    dispatch(contactActions.setContactList([data]));
    dispatch(
      chatListActions.setNewChatListFromAddedContact([
        {
          chatRoomId: data.chatRoomId,
          roomType: "PRIVATE",
          lastestMessage: null,
          totalUnreadMessages: 0,
          roomInfo: data.roomInfo,
        },
      ])
    );
  }
  function error() {
    alert("them khong thanh cong");
  }
  if (isLoading) return <Spinner />;
  return (
    <ActiveSidebar sidebarName={SIDEBAR.CONTACT}>
      <div
        onClick={() =>
          dispatch(sidebarActions.setCurrentSidebar(SIDEBAR.CHATLIST))
        }
        className="text-2xl p-3 full-rounded cursor-pointer bg-slate-200"
      >
        back button
      </div>
      <div
        onClick={openModal}
        className="text-2xl p-3 full-rounded cursor-pointer bg-slate-200"
      >
        add contact
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <Form onSubmit={handleSubmit(success, error)}>
          <FormRow
            label="name"
            type="name"
            name="name"
            register={register}
            option={{
              required: "name is required",
            }}
            onChange={captureName}
            error={errors?.name?.message}
          />
          <FormRow
            label="username"
            type="username"
            name="username"
            register={register}
            option={{
              required: "username is required",
            }}
            onChange={captureUsername}
            error={errors?.username?.message}
          />
          <div className="flex justify-end text-2xl my-4">
            <NavLink to="/">Forgot password</NavLink>
          </div>
          <div className="flex">
            <Button>Them</Button>
          </div>
        </Form>
      </Modal>
      <div className="px-3">
        <SideBarHeader>
          <SideBarSearchInput />
        </SideBarHeader>
        <div>
          {Object.values(contactList).map((contactItem) => (
            <ContactItem
              key={contactItem.chatRoomId}
              chatRoomId={contactItem.chatRoomId}
              roomInfo={contactItem.roomInfo}
            />
          ))}
        </div>
      </div>
    </ActiveSidebar>
  );
}

export default Contact;
