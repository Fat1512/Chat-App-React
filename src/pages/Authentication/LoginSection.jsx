import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import SwitchLoginType from "./SwitchLoginType";

function LoginSection() {
  return (
    <>
      <div className="py-4">
        <p className="text-5xl">Login</p>
        <p className="text-gray-400 text-xl py-4">
          Enter your credentials to access Yum
        </p>
      </div>
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
