import { useNavigate } from "react-router-dom";
import { AuthenticationHeader, removeLocalStorageToken } from "../utils/helper";
import { useScrollTrigger } from "@mui/material";
import useSocket from "./useSocket";
import { useMutation } from "@tanstack/react-query";
import { loginAPI, logoutAPI } from "../services/userService";
import { useDispatch } from "react-redux";
import { chatActions } from "../store/chatSlice";
import { chatListActions } from "../store/chatListSlice";
import { contactActions } from "../store/contactSlice";
import { modalActions } from "../store/modalSlide";
import { profileActions } from "../store/profileSlice";
import { sidebarActions } from "../store/sideBarSlice";
import { videoCallActions } from "../store/videoCallSlice";
function useLogout() {
  const { stompClient } = useSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: logout } = useMutation({
    mutationFn: async function () {
      try {
        stompClient.publish({
          destination: `/app/disconnect`,
          headers: AuthenticationHeader(),
        });
        await logoutAPI();
      } catch (err) {
      } finally {
      }
    },
    onSuccess: () => {
      dispatch(chatActions.resetState());
      dispatch(chatListActions.resetState());
      dispatch(contactActions.resetState());
      dispatch(modalActions.resetState());
      dispatch(profileActions.resetState());
      dispatch(sidebarActions.resetState());
      dispatch(videoCallActions.resetState());
      navigate("/auth/login");
      removeLocalStorageToken();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { logout };
}

export default useLogout;
