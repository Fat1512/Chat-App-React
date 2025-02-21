import { useQuery } from "@tanstack/react-query";
import { getCurrentuserService } from "../services/userService";
import { getAccessToken } from "../utils/helper";

function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentuserService,
    retry: 1,
  });
  return { isLoading, user };
}

export default useUser;
