import SideBar from "./SideBar";
import Chat from "./Chat";
import RoomProfile from "./RoomProfile";
import Spinner from "../ui/Spinner";

import useSocket from "../hooks/useSocket";
import useInit from "../hooks/useInit";
import ModalComponent from "./ModalComponent";
function MainContent() {
  const { stompClient, connected } = useSocket();
  const { loaded } = useInit();
  if (!connected || !loaded) return <Spinner />;

  return (
    <>
      <button
        className="text-2xl p-3"
        onClick={() => {
          stompClient.deactivate();
        }}
      >
        click to disconnect
      </button>
      <button
        className="text-2xl p-3"
        onClick={() => {
          stompClient.activate();
        }}
      >
        click to connect
      </button>
      <main className="flex w-full h-screen transition-all">
        <SideBar />
        <Chat />
        <RoomProfile />
      </main>
      <ModalComponent />
    </>
  );
}

export default MainContent;
