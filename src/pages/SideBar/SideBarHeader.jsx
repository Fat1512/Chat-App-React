import useSocket from "../../hooks/useSocket";
import { AuthenticationHeader } from "../../utils/helper";

function SideBarHeader({ children, className }) {
  return (
    <header id="sidebar-header" className={`h-[6rem] ${className}`}>
      {children}
    </header>
  );
}

export default SideBarHeader;
