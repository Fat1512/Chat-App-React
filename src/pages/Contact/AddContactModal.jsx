import { useForm } from "react-hook-form";
import useAddContact from "../../hooks/useAddContact";
import useSubscribe from "../../hooks/useSubscribe";
import CustomModal from "../../ui/CustomModal";
import { MODAL } from "../../utils/constants";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";

function AddContactModal({ currentModal }) {
  const { addContact } = useAddContact();
  const { subscribeAllTheMessageEvent } = useSubscribe();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  async function success({ username, name }) {
    addContact(
      { username, name },
      {
        onSuccess: (data) => {
          subscribeAllTheMessageEvent(data.chatRoomId);
          dispatch(contactActions.setContactList([data]));
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
      <CustomModal
        currentModal={currentModal}
        modal={MODAL.ADDCONTACT}
        shouldCloseOnOverlayClick={true}
      >
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
              Add
            </button>
          </div>
        </Form>
      </CustomModal>
    </>
  );
}

export default AddContactModal;
