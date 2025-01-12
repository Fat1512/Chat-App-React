import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUser from "../hooks/useUser";

function ProtectedRoute({ children }) {
  // const { isLoading, user } = useUser();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isLoading && !user?.isAuthenticated) {
  //     console.log("redirect to login", user);
  //     navigate("/auth/login");
  //   }
  // }, [isLoading, navigate, user?.isAuthenticated]);

  // if (isLoading || !user?.isAuthenticated) {
  //   return <div>Đang đăng nhập</div>;
  // }
  return children;
}

export default ProtectedRoute;
