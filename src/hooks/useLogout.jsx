import { useNavigate } from "react-router-dom";
import { AuthenticationHeader, removeLocalStorageToken } from "../utils/helper";
import { useScrollTrigger } from "@mui/material";
import useSocket from "./useSocket";
function useLogout() {
  const navigate = useNavigate();
  const { stompClient } = useSocket();

  function logout() {
    stompClient.publish({
      destination: `/app/disconnect`,
      headers: AuthenticationHeader(),
    });
    stompClient.deactivate();
    removeLocalStorageToken();
    window.location.reload();
  }
  return { logout };
}

export default useLogout;
