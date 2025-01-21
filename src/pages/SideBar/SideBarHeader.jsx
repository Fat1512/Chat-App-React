import useSocket from "../../hooks/useSocket";
import { AuthenticationHeader } from "../../utils/helper";

function SideBarHeader({ children, className }) {
  const { stompClient } = useSocket();

  return (
    <header id="sidebar-header" className={`h-[6rem] ${className}`}>
      <button
        onClick={() => {
          stompClient.publish({
            destination: `/app/disconnect`,
            headers: AuthenticationHeader,
          });
          stompClient.deactivate();
        }}
      >
        press to disconnect
      </button>
      {children}
    </header>
  );
}

export default SideBarHeader;
