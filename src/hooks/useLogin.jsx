import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/apiUser";
import { setLocalStorageToken } from "../utils/helper";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ username, password }) => loginApi({ username, password }),
    onSuccess: (user) => {
      setLocalStorageToken(user.tokenDTO.accessToken);
      delete user.tokenDTO;
      queryClient.setQueryData(["user"], {
        ...user,
      });
      navigate("/");
    },
    onError: (err) => {
      alert(err);
    },
  });
  return { isLoading, login };
}

export default useLogin;
