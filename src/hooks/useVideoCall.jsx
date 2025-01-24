import { useEffect, useRef, useState } from "react";
import useSocket from "./useSocket";
import Peer from "simple-peer";
import { AuthenticationHeader } from "../utils/helper";
import { useReducedMotion } from "motion/react";
import { set } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { videoCallActions } from "../store/videoCallSlice";

function useVideoCall() {
  const { stompClient } = useSocket();
  const [userStream, setUserStream] = useState();
  const [acceptRequest, setAcceptRequest] = useState(true);
  const { caller, signal, currentChatRoomId } = useSelector(
    (state) => state.videoCallReducer
  );

  const dispatch = useDispatch();
  const localRef = useRef();
  const remoteRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
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
        body: JSON.stringify(data),
        headers: AuthenticationHeader,
      });
    });

    stompClient.subscribe(
      `/topic/chatRoom/${currentChatRoomId}/callAccepted`,
      (message) => {
        const signal = JSON.parse(message.body);
        dispatch(videoCallActions.setSignal(signal));
        peer.signal(signal);
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
    console.log("receiving call");
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: userStream,
    });
    console.log(signal);
    peer.signal(signal);
    peer.on("signal", (data) => {
      stompClient.publish({
        destination: `/app/chatRoom/${currentChatRoomId}/callAccepted`,
        body: JSON.stringify(data),
        headers: AuthenticationHeader,
      });
    });

    peer.on("stream", (stream) => {
      remoteRef.current.srcObject = stream;
    });
  }, [userStream, acceptRequest]);

  return { localRef, remoteRef, setAcceptRequest };
}

export default useVideoCall;
