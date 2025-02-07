import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUser from "../hooks/useUser";
import Spinner from "../ui/Spinner";
import { removeLocalStorageToken } from "../utils/helper";
function ProtectedRoute({ children }) {
  const { isLoading, user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !user?.isAuthenticated) {
      console.log("redirect to login", user);
      removeLocalStorageToken();
      navigate("/auth/login");
    }
  }, [isLoading, user?.isAuthenticated]);

  if (isLoading || !user?.isAuthenticated) {
    return <Spinner />;
  }
  console.log("already fetched user");
  return children;
}

export default ProtectedRoute;
