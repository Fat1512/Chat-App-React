import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiUser";

function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { isLoading, user };
}

export default useUser;
