import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../services/userService";
import { setLocalStorageToken } from "../utils/helper";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ usernameOrEmail, password }) =>
      loginAPI({ usernameOrEmail, password }),
    onSuccess: (user) => {
      setLocalStorageToken(user.tokenDTO);

      queryClient.setQueryData(["user"], {
        ...user,
      });
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.response.data.message);
    },
  });
  return { isLoading, login };
}

export default useLogin;
