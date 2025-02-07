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
      removeLocalStorageToken();
      navigate("/auth/login");
    }
  }, [isLoading, user?.isAuthenticated]);

  if (isLoading || !user?.isAuthenticated) {
    return <Spinner />;
  }
  return children;
}

export default ProtectedRoute;
