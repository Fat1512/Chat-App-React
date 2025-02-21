import { useForm } from "react-hook-form";
import useAddContact from "../../hooks/useAddContact";
import useSubscribe from "../../hooks/useSubscribe";
import CustomModal from "../../ui/CustomModal";
import { MODAL } from "../../utils/constants";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import { useDispatch, useSelector } from "react-redux";
import { contactActions } from "../../store/contactSlice";
import { chatListActions } from "../../store/chatListSlice";

function AddContactModal() {
  const { addContact } = useAddContact();
  const { subscribeAllTheMessageEvent } = useSubscribe();
  const { chatList } = useSelector((state) => state.chatListReducer);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch();
  async function success({ username, name }) {
    addContact(
      { username, name },
      {
        onSuccess: (data) => {
          console.log(data);
          dispatch(contactActions.setContactList([data]));

          //In case user has been added in group by another user -> avoid duplicating the
          if (chatList[data.chatRoomId]) return;
          console.log("didn't exist");
          subscribeAllTheMessageEvent(data.chatRoomId);
          dispatch(
            chatListActions.setNewChatListFromAddedContact({
              chatRoomId: data.chatRoomId,
              roomType: "PRIVATE",
              lastestMessage: null,
              totalUnreadMessages: 0,
              roomInfo: data.roomInfo,
            })
          );
        },
      }
    );
  }
  function error() {}

  return (
    <>
      <CustomModal modal={MODAL.ADDCONTACT} shouldCloseOnOverlayClick={true}>
        <div className="p-7">
          <Form onSubmit={handleSubmit(success, error)}>
            <FormRow
              label="Name"
              type="name"
              name="name"
              register={register}
              option={{
                required: "name is required",
              }}
              error={errors?.name?.message}
            />
            <FormRow
              label="Username"
              type="username"
              name="username"
              register={register}
              option={{
                required: "username is required",
              }}
              error={errors?.username?.message}
            />
            <div className="flex">
              <button className="w-full text-2xl bg-white p-3 rounded-lg text-blue-700">
                ADD
              </button>
            </div>
          </Form>
        </div>
      </CustomModal>
    </>
  );
}

export default AddContactModal;
