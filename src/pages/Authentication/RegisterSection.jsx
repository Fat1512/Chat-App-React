import { NavLink } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import SwitchLoginType from "./SwitchLoginType";

function RegisterSection() {
  return (
    <>
      <div className="py-4">
        <p className="text-5xl">Register</p>
        <p className="text-gray-400 text-xl py-4">
          Don't have an account? Create your account, it takes less than a
          minute at Yum
        </p>
      </div>
      <RegisterForm />
      <SwitchLoginType>
        <p>Already have an account ?</p>
        <NavLink className="text-orange-400 px-2" to="/auth/login">
          Login
        </NavLink>
      </SwitchLoginType>
    </>
  );
}

export default RegisterSection;
