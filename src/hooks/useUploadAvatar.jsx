import { useMutation } from "@tanstack/react-query";
import { uploadEditAvatar } from "../services/userAPI";
import toast from "react-hot-toast";
import { IMAGE_LIMIT_SIZE } from "../utils/constants";
import useUser from "./useUser";

function useUploadAvatar() {
  //   const { currentUser } = useUser();
  const { isLoading, mutate: uploadAvatar } = useMutation({
    mutationFn: (formData) => uploadEditAvatar(formData),
    onSuccess: () => {
      toast.success("Uploaded successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function processFormData(file) {
    const formData = new FormData();

    if (!file.type.startsWith("image/")) {
      toast.error("Only image is allowed !");
      return;
    }

    if (file.size > IMAGE_LIMIT_SIZE) {
      toast.error("Avatar's size must not be over 20MB");
      return;
    }

    formData.append("file", file);
    return formData;
  }

  return { isLoading, processFormData, uploadAvatar };
}

export default useUploadAvatar;
