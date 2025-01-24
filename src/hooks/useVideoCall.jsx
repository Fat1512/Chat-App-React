import { useEffect, useRef, useState } from "react";
import useSocket from "./useSocket";
import Peer from "simple-peer";
import { AuthenticationHeader } from "../utils/helper";
import { useReducedMotion } from "motion/react";
import { set } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { videoCallActions } from "../store/videoCallSlice";
import useUser from "./useUser";
import { VIDEOCALL_STATUS } from "../utils/constants";

function useVideoCall() {
  const { stompClient } = useSocket();
  const [userStream, setUserStream] = useState();
  const [acceptRequest, setAcceptRequest] = useState();
  const { isLoading, user: currentUser } = useUser();

  const { caller, signal, currentChatRoomId, remoteCallerInfo, status } =
    useSelector((state) => state.videoCallReducer);

  const dispatch = useDispatch();
  const localRef = useRef();
  const remoteRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      localRef.current.srcObject = stream;
      setUserStream(stream);
    });
  }, []);

  //Calling other user
  useEffect(() => {
    if (!userStream || !caller) return;

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: userStream,
    });

    peer.on("signal", (data) => {
      stompClient.publish({
        destination: `/app/chatRoom/${currentChatRoomId}/callRequest`,
        body: JSON.stringify({
          caller: currentUser.name,
          rtcSignal: data,
        }),
        headers: AuthenticationHeader,
      });
    });

    stompClient.subscribe(
      `/topic/chatRoom/${currentChatRoomId}/callAccepted`,
      (message) => {
        const body = JSON.parse(message.body);
        peer.signal(body.rtcSignal);

        dispatch(videoCallActions.setSignal(body.rtcSignal));
        dispatch(videoCallActions.setRemoteCallerInfo(body.caller));
        dispatch(videoCallActions.setStatus(VIDEOCALL_STATUS.CALLING));
        setAcceptRequest(true);
      },
      AuthenticationHeader
    );
    peer.on("stream", (stream) => {
      remoteRef.current.srcObject = stream;
    });
  }, [userStream, caller]);

  //Receiving other users' calling request
  useEffect(() => {
    if (!userStream || !acceptRequest || caller) return;
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: userStream,
    });

    peer.signal(signal);
    dispatch(videoCallActions.setStatus(VIDEOCALL_STATUS.CALLING));

    peer.on("signal", (data) => {
      stompClient.publish({
        destination: `/app/chatRoom/${currentChatRoomId}/callAccepted`,
        body: JSON.stringify({
          caller: currentUser.name,
          rtcSignal: data,
        }),
        headers: AuthenticationHeader,
      });
    });
    peer.on("stream", (stream) => {
      remoteRef.current.srcObject = stream;
    });
    dispatch(videoCallActions.setStatus(VIDEOCALL_STATUS.CALLING));
  }, [userStream, acceptRequest]);

  return {
    localRef,
    remoteRef,
    caller,
    acceptRequest,
    setAcceptRequest,
    status,
    remoteCallerInfo,
  };
}

export default useVideoCall;
