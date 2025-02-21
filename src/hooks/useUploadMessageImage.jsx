import { useMutation } from "@tanstack/react-query";
import { uploadMessageImages } from "../services/chatRoomService";
import { IMAGE_LIMIT_SIZE, MESSAGE_TYPE } from "../utils/constants";
import toast from "react-hot-toast";

function useUploadMessageImage() {
  const { isLoading, mutate: uploadImages } = useMutation({
    mutationFn: (formData) => uploadMessageImages(formData),
    onSuccess: () => {
      toast.success("Uploaded successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function processFormData(files, chatRoomId) {
    const formData = new FormData();
    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image is allowed !");
        return;
      }

      if (file.size > IMAGE_LIMIT_SIZE) {
        toast.error("Image's size must not be over 20MB");
        return;
      }

      formData.append("files", file);
    });
    formData.append("chatRoomId", chatRoomId);
    return formData;
  }

  return { isLoading, processFormData, uploadImages };
}

export default useUploadMessageImage;
