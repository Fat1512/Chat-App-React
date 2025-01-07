import { Outlet } from "react-router-dom";
import Logo from "../ui/Logo";

function Authentication() {
  return (
    <div className="px-52 py-5 min-h-screen	bg-orange-100">
      <Logo />
      <div className="py-20 flex-col items-start">
        <div className="w-1/3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Authentication;
