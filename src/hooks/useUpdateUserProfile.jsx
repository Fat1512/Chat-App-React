import { useMutation } from "@tanstack/react-query";
import {
  updateUserProfile,
  uploadEditAvatarAPI,
} from "../services/userService";
import toast from "react-hot-toast";
import { IMAGE_LIMIT_SIZE } from "../utils/constants";
import useUser from "./useUser";

function useUpdateUserProfile() {
  const { isLoading, mutate: updateProfile } = useMutation({
    mutationFn: (profileInfo) => updateUserProfile(profileInfo),
    onSuccess: (data) => {
      toast.success("Updated profile successfully");
      return data;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, updateProfile };
}

export default useUpdateUserProfile;
