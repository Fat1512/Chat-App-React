import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../services/userAPI";
import { setLocalStorageToken } from "../utils/helper";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ username, password }) => loginAPI({ username, password }),
    onSuccess: (user) => {
      // delete user.tokenDTO;
      queryClient.setQueryData(["user"], {
        ...user,
      });
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Wrong credential");
    },
  });
  return { isLoading, login };
}

export default useLogin;
