import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { formControlClasses } from "@mui/material";
import { getOauthURLAPI, loginOauthAPI } from "../services/oauthAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { setLocalStorageToken } from "../utils/helper";

function useGoogleLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: googleLogin } = useMutation({
    mutationFn: (authorizationCode) => loginOauthAPI(authorizationCode),
    onSuccess: (user) => {
      setLocalStorageToken(user.tokenDTO);

      queryClient.setQueryData(["user"], {
        ...user,
      });
      navigate("/");
    },
    onError: (err) => {
      navigate("/auth/login");
      console.log(err);
      toast.error(err.response.data.message);
    },
  });

  async function getOauthAuthorizationCode() {
    const hashParams = new URLSearchParams(window.location.search);
    console.log(hashParams.get("code"));
    return hashParams.get("code");
  }

  async function redirectGoogleLogin() {
    try {
      const oauthUrl = await getOauthURLAPI();
      window.location.assign(oauthUrl);
    } catch (err) {
      toast.error(err.message);
    }
  }
  return { redirectGoogleLogin, googleLogin, getOauthAuthorizationCode };
}

export default useGoogleLogin;
