import { useRef, useState } from "react";
import CustomModal from "../../ui/CustomModal";
import { MODAL } from "../../utils/constants";
import { X } from "lucide-react";
import { BsFillImageFill } from "react-icons/bs";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import useUser from "../../hooks/useUser";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";
import toast from "react-hot-toast";
import useUploadAvatar from "../../hooks/useUploadAvatar";

function UserInfoModal() {
  const { user: currentUser } = useUser();
  const { register, handleSubmit, formState } = useForm();
  const [selectedAvt, setSelectedAvt] = useState();
  const { isLoading, processFormData, uploadAvatar } = useUploadAvatar();

  const { updateProfile } = useUpdateUserProfile();
  const { errors } = formState;

  async function success({ name, bio }) {
    toast.success("Uploading");

    let avt = currentUser.avt;
    if (selectedAvt) {
      const processedFormData = processFormData(selectedAvt.obj);
      uploadAvatar(processedFormData, {
        onSuccess: (data) => {
          updateProfile({
            id: currentUser.id,
            name: name,
            bio: bio,
            avt: data,
          });
        },
      });
    } else {
      updateProfile({
        id: currentUser.id,
        name: name,
        bio: bio,
        avt: avt,
      });
    }
  }
  function error(error) {}

  function handleImageChange(e) {
    const file = Object.values(e.target.files)[0];
    setSelectedAvt({
      url: URL.createObjectURL(file),
      obj: file,
    });
  }

  return (
    <>
      <CustomModal modal={MODAL.USERINFO} shouldCloseOnOverlayClick={true}>
        <div className="w-xl mx-auto bg-white shadow-lg rounded-xl p-8 relative">
          {/* Header */}
          <div className="flex justify-between items-center  pb-2 mb-4">
            <h2 className="text-3xl font-semibold">User Profile</h2>
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
                  src={selectedAvt?.url || currentUser.avt}
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
                valueInput={currentUser.name}
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
                valueInput={currentUser.bio}
                label="Bio"
                type="bio"
                name="bio"
                register={register}
                option={{
                  required: "bio is required",
                }}
                error={errors?.bio?.message}
              />
              <div className="flex pt-3">
                <button className="w-full text-2xl bg-white p-3 rounded-lg text-blue-700">
                  UPDATE
                </button>
              </div>
            </Form>
          </div>
        </div>
      </CustomModal>
    </>
  );
}

export default UserInfoModal;
