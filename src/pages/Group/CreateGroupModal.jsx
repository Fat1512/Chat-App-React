import { X } from "lucide-react";
import CustomModal from "../../ui/CustomModal";
import { MODAL } from "../../utils/constants";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import useCreateGroup from "../../hooks/useCreateGroup";
import { useSelector } from "react-redux";

export default function CreateGroupModal() {
  const { register, handleSubmit, formState } = useForm();
  const [selectedAvt, setSelectedAvt] = useState();
  const { selectedContact } = useSelector((state) => state.contactReducer);
  const { createGroup } = useCreateGroup();

  const { errors } = formState;

  function handleImageChange(e) {
    const file = Object.values(e.target.files)[0];
    setSelectedAvt({
      url: URL.createObjectURL(file),
      obj: file,
    });
  }
  function success({ name }) {
    createGroup({
      groupName: name,
      membersId: selectedContact,
    });
  }
  function error() {}
  return (
    <>
      <CustomModal modal={MODAL.CREATE_GROUP} shouldCloseOnOverlayClick={true}>
        <div className="w-xl mx-auto bg-white shadow-lg rounded-xl p-8 relative">
          {/* Header */}
          <div className="flex justify-between items-center  pb-2 mb-4">
            <h2 className="text-3xl font-semibold">Create Group</h2>
            <button className="text-gray-600 hover:text-gray-800">
              <X size={20} />
            </button>
          </div>

          {/* Profile Avatar */}
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 flex items-center justify-center border border-4 rounded-full bg-blue-300 text-white overflow-hidden text-lg font-semibold">
              <span
                className="cursor-pointer w-full h-full"
                onClick={(e) =>
                  e.currentTarget.querySelector("#uploadFile")?.click()
                }
              >
                <img
                  src={selectedAvt?.url || ""}
                  alt="User Background"
                  className="w-full h-full object-cover"
                />
                <input
                  id="uploadFile"
                  onChange={handleImageChange}
                  hidden
                  multiple
                  type="file"
                  accept="image/*"
                />
              </span>
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <Form onSubmit={handleSubmit(success, error)}>
              <FormRow
                label="Group Name"
                type="name"
                name="name"
                register={register}
                option={{
                  required: "group name is required",
                }}
                error={errors?.name?.message}
              />
              <div className="flex pt-3">
                <button className="w-full text-2xl bg-white p-3 rounded-lg text-blue-700">
                  CREATE
                </button>
              </div>
            </Form>
          </div>
        </div>
      </CustomModal>
    </>
  );
}
