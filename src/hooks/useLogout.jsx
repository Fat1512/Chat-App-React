import { useNavigate } from "react-router-dom";
import { AuthenticationHeader, removeLocalStorageToken } from "../utils/helper";
import { useScrollTrigger } from "@mui/material";
import useSocket from "./useSocket";
import { useMutation } from "@tanstack/react-query";
import { loginAPI, logoutAPI } from "../services/userAPI";
function useLogout() {
  const { stompClient } = useSocket();

  const { mutate: logout } = useMutation({
    mutationFn: async function () {
      try {
        await logoutAPI();
      } catch (err) {
      } finally {
        stompClient.publish({
          destination: `/app/disconnect`,
          headers: AuthenticationHeader(),
        });
        stompClient.deactivate();
        removeLocalStorageToken();
        window.location.reload();
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
