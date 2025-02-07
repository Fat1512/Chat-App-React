import { useQuery } from "@tanstack/react-query";
import { getCurrentUserAPI } from "../services/userAPI";
import { getAccessToken } from "../utils/helper";

function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserAPI,
    retry: 1,
  });
  return { isLoading, user };
}

export default useUser;
