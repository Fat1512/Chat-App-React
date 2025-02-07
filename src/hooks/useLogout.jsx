import { useNavigate } from "react-router-dom";
import { AuthenticationHeader, removeLocalStorageToken } from "../utils/helper";
import { useScrollTrigger } from "@mui/material";
import useSocket from "./useSocket";
import { useMutation } from "@tanstack/react-query";
import { loginAPI, logoutAPI } from "../services/userAPI";
function useLogout() {
  const { stompClient } = useSocket();
  const navigate = useNavigate();
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
        stompClient.deactivate();
        removeLocalStorageToken();
        navigate("/auth/login");
      }
    },
    onSuccess: () => {
      toast.success("logged out !");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { logout };
}

export default useLogout;
