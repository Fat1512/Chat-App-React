import useSocket from "../../hooks/useSocket";

function SideBarHeader({ children, className }) {
  const { stompClient } = useSocket();

  return (
    <header className={`h-[6rem] ${className}`}>
      <button
        onClick={() => {
          stompClient.disconnect(() => {});
        }}
      >
        press to disconnect
      </button>
      {children}
    </header>
  );
}

export default SideBarHeader;
