import { NavLink } from "react-router-dom";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import AuthenticationHeader from "./AuthenticationHeader";
import LoginForm from "./LoginForm";
import SwitchLoginType from "./SwitchLoginType";
import useLogin from "../../hooks/useLogin";

function LoginSection() {
  return (
    <>
      <AuthenticationHeader>
        <Heading>Login</Heading>
        <p className="text-gray-400 text-xl py-4">
          Enter your credentials to access Yum
        </p>
      </AuthenticationHeader>
      <LoginForm />
      <SwitchLoginType>
        <p>Don't have an account ?</p>
        <NavLink className="text-orange-400 px-2" to="/auth/register">
          Register
        </NavLink>
      </SwitchLoginType>
    </>
  );
}

export default LoginSection;
