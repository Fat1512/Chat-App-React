import SideBar from "./SideBar";
import RoomProfile from "./RoomProfile";
import Spinner from "../ui/Spinner";

import useSocket from "../hooks/useSocket";
import useInit from "../hooks/useInit";
import ModalComponent from "./ModalComponent";
import Chat from "./Chat/Chat";
import CustomModal from "../ui/CustomModal";
import FullPage from "../ui/FullPage";
import UserInfoCard from "./UserInfoCard";

function MainContent() {
  const { loaded } = useInit();
  const { connected } = useSocket();
  if (!connected || !loaded) {
    return (
      <>
        <FullPage>
          <Spinner />
        </FullPage>
      </>
    );
  }

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
