import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/userAPI";

function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: 0,
  });
  return { isLoading, user };
}

export default useUser;
