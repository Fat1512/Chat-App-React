import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../services/userAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useRegister() {
  const navigate = useNavigate();
  const { isLoading, mutate: register } = useMutation({
    mutationFn: ({ name, username, password, repeatPassword }) =>
      registerAPI({ name, username, password, repeatPassword }),
    onSuccess: () => {
      navigate("/auth/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isLoading, register };
}

export default useRegister;
