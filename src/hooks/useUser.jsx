import { useQuery } from "@tanstack/react-query";
import { getCurrentUserAPI } from "../services/userAPI";
import { getAuthToken } from "../utils/helper";

function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserAPI,
    retry: 0,
  });
  return { isLoading, user };
}

export default useUser;
