import SideBar from "./SideBar";
import Chat from "./Chat";
import RoomProfile from "./RoomProfile";
import Spinner from "../ui/Spinner";

import useSocket from "../hooks/useSocket";
import useInit from "../hooks/useInit";
import ModalComponent from "./ModalComponent";

function MainContent() {
  const { loaded } = useInit();
  const { connected } = useSocket();
  if (!connected || !loaded) return <Spinner />;

  return (
    <>
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
