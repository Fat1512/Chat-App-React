import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUser from "../hooks/useUser";
import Spinner from "../ui/Spinner";
function ProtectedRoute({ children }) {
  const { isLoading, user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !user?.isAuthenticated) {
      console.log("redirect to login", user);
      navigate("/auth/login");
    }
  }, [isLoading, navigate, user?.isAuthenticated]);

  if (isLoading || !user?.isAuthenticated) {
    return <Spinner />;
  }
  return children;
}

export default ProtectedRoute;
