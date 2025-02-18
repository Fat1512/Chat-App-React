import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import SwitchLoginType from "./SwitchLoginType";
import { BiLogoGooglePlus } from "react-icons/bi";

function LoginSection() {
  return (
    <>
      <div className="py-4">
        <p className="text-5xl">Login</p>
        <p className="text-gray-700 text-3xl py-4">
          Enter your credentials to chat
        </p>
      </div>
      <LoginForm />
      <SwitchLoginType>
        <p>Don't have an account ?</p>
        <NavLink
          className="text-blue-400 px-2 font-semibold"
          to="/auth/register"
        >
          Register
        </NavLink>
      </SwitchLoginType>
    </>
  );
}

export default LoginSection;
