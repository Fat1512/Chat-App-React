import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/apiUser";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ username, password }) => loginApi({ username, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], {
        ...user,
        isAuthenticated: true,
      });
      navigate("/");
      alert("Successfully logged in");
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  return { isLoading, login };
}

export default useLogin;
