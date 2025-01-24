import { useEffect, useRef, useState } from "react";
import SideBar from "./SideBar";
import Chat from "./Chat";
import RoomProfile from "./RoomProfile";
import Spinner from "../ui/Spinner";
import Peer from "simple-peer";

import useSocket from "../hooks/useSocket";
import useInit from "../hooks/useInit";
import useVideoCall from "../hooks/useVideoCall";
import ModalComponent from "./ModalComponent";
import CustomModal from "../ui/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MainContent() {
  const { connected } = useSocket();
  const { loaded } = useInit();
  const [userStream, setUserStream] = useState();
  const localRef = useRef();
  const remoteRef = useRef();
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      // localRef.current.srcObject = stream;
      // remoteRef.current.srcObject = stream;
    });
  }, [userStream]);

  if (!connected || !loaded) return <Spinner />;

  return (
    <>
      {/* <CustomModal shouldCloseOnOverlayClick={false}>
        <div className="flex">
          <div className="p-3 flex flex-col">
            <span className="text-3xl text-center w-full">local video</span>
            <video autoPlay playsInline ref={localRef} src=""></video>
          </div>
          {acceptRequest && (
            <div className=" p-3 flex flex-col">
              <span className="text-3xl text-center w-full">remote video</span>
              <video autoPlay playsInline ref={remoteRef} src=""></video>
            </div>
          )}
        </div>
        {!acceptRequest && (
          <div className="flex text-3xl justify-around">
            {!caller && (
              <div>
                <button className="rounded-full bg-green-200 p-5">
                  Accept
                </button>
              </div>
            )}
            <div>
              <button className="rounded-full bg-red-200 p-5">Deny</button>
            </div>
          </div>
        )}
      </CustomModal> */}
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
/*

<div class="flex justify-start relative">
  <div class="w-1/6">
    <Button
      onClick={() => {
        setVisible(!visible);
      }}
    >
      Click me
    </Button>
  </div>
  <div
    class={`bg-red-300 transition-all ease-in-out rounded flex justify-center items-center text-2xl ${
      visible ? "w-3/6" : "w-5/6"
    }`}
  >
    Hi
  </div>
  <div
    class={`bg-orange-400 overflow-hidden transition-all rounded ease-in-out h-full shrink-0 absolute top-0 right-0 z-20 shadow-lg shadow-box-shadow text-2xl flex justify-center items-center ${
      visible ? "w-2/6" : "w-0 "
    }`}
  >
    Menu
  </div>
</div>

*/
