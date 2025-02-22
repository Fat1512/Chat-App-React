import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGroupAPI } from "../services/chatRoomService";

function useCreateGroup() {
  const { isLoading, mutate: createGroup } = useMutation({
    mutationFn: ({ groupName, membersId }) =>
      createGroupAPI({ groupName, membersId }),
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return { isLoading, createGroup };
}

export default useCreateGroup;
