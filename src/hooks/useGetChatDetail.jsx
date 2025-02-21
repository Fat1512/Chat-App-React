import { useDispatch, useSelector } from "react-redux";
import { AUTH_REQUEST } from "../utils/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import { getChatDetailAPI } from "../services/chatRoomService";
import { chatActions } from "../store/chatSlice";

function useGetChatDetail() {
  const { isLoading, mutate: getChatDetail } = useMutation({
    mutationFn: (chatRoomId) => getChatDetailAPI(chatRoomId),
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, getChatDetail };
}

export default useGetChatDetail;
