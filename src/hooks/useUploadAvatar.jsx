import { useMutation } from "@tanstack/react-query";
import { uploadEditAvatar } from "../services/userAPI";
import toast from "react-hot-toast";
import { IMAGE_LIMIT_SIZE } from "../utils/constants";
import useUser from "./useUser";

function useUploadAvatar() {
  //   const { currentUser } = useUser();
  const { isLoading, mutate: updateAvatarFn } = useMutation({
    mutationFn: (formData) => uploadEditAvatar(formData),
    onSuccess: () => {
      toast.success("Uploaded successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function uploadAvatar(file) {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image is allowed !");
      return;
    }

    if (file.size > IMAGE_LIMIT_SIZE) {
      toast.error("Avatar's size must not be over 20MB");
      return;
    }

    let formData = new FormData();
    formData.append("file", file);
    updateAvatarFn(formData);
  }

  return { isLoading, uploadAvatar };
}

export default useUploadAvatar;
