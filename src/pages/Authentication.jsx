import { Outlet } from "react-router-dom";
import Logo from "../ui/Logo";
import Row from "../ui/Row";

function Authentication() {
  return (
    <div className="px-52 py-5 min-h-screen	bg-orange-100">
      <Logo />
      <Row addedStyle="py-20 flex-col items-start">
        <div className="w-1/3">
          <Outlet />
        </div>
      </Row>
    </div>
  );
}

export default Authentication;
