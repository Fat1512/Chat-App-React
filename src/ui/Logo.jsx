import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <div className="w-64">
      <NavLink to="/app">
        <img src="/public/image/logo.png" alt="" />
      </NavLink>
    </div>
  );
}

export default Logo;
