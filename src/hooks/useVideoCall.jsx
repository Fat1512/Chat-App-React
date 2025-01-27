import { useEffect, useRef, useState } from "react";
import useSocket from "./useSocket";
import Peer from "simple-peer";
import { AuthenticationHeader } from "../utils/helper";
import { useReducedMotion } from "motion/react";
import { set } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { videoCallActions } from "../store/videoCallSlice";
import useUser from "./useUser";
import {
  MESSAGE_TYPE,
  REJECT_REASON,
  VIDEOCALL_STATUS,
} from "../utils/constants";
import { modalActions } from "../store/modalSlide";
import useCallingTimer from "./useCallingTimer";

function useVideoCall() {
  const { stompClient } = useSocket();
  const { user: currentUser } = useUser();

  const [userStream, setUserStream] = useState();
  const [acceptRequest, setAcceptRequest] = useState();
  const { startTimer, stopTimer, time } = useCallingTimer();

  const {
    caller,
    signal,
    currentChatRoomId,
    remoteCallerInfo,
    currentRequestCaller,
    status,
  } = useSelector((state) => state.videoCallReducer);

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
          callerId: currentUser.id,
          callerName: currentUser.name,
          rtcSignal: data,
        }),
        headers: AuthenticationHeader(),
      });
    });

    peer.on("stream", (stream) => {
      remoteRef.current.srcObject = stream;
    });

    const subObj = stompClient.subscribe(
      `/topic/chatRoom/${currentChatRoomId}/callAccepted`,
      (message) => {
        const body = JSON.parse(message.body);
        peer.signal(body.rtcSignal);

        dispatch(
          videoCallActions.setRemoteCallerInfo({
            callerId: body.callerId,
            callerName: body.callerName,
            peer: peer,
          })
        );

        dispatch(videoCallActions.setStatus(VIDEOCALL_STATUS.CALLING));
        setAcceptRequest(true);

        startTimer();
      },
      AuthenticationHeader()
    );

    peer.on("close", () => {
      userStream.getTracks().forEach(function (track) {
        track.stop();
      });
      dispatch(modalActions.resetState());
      dispatch(videoCallActions.resetState());
      stopTimer();
    });
    return () => {
      peer.destroy();
      stompClient.unsubscribe(subObj.id, {
        ...AuthenticationHeader(),
      });
    };
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
    peer.on("signal", (data) => {
      stompClient.publish({
        destination: `/app/chatRoom/${currentChatRoomId}/callAccepted`,
        body: JSON.stringify({
          callerId: currentUser.id,
          callerName: currentUser.name,
          rtcSignal: data,
        }),
        headers: AuthenticationHeader(),
      });
    });
    startTimer();

    peer.on("stream", (stream) => {
      remoteRef.current.srcObject = stream;
    });

    peer.on("close", () => {
      userStream.getTracks().forEach(function (track) {
        track.stop();
      });
      dispatch(modalActions.resetState());
      dispatch(videoCallActions.resetState());
      stopTimer();
    });

    dispatch(
      videoCallActions.setRemoteCallerInfo({
        ...remoteCallerInfo[currentRequestCaller],
        peer: peer,
      })
    );
    dispatch(videoCallActions.setStatus(VIDEOCALL_STATUS.CALLING));
    return () => {
      peer.destroy();
    };
  }, [userStream, acceptRequest]);

  //Listen to Ended calling
  useEffect(() => {
    if (!userStream || !Object.keys(remoteCallerInfo).length) return;
    const subObj = stompClient.subscribe(
      `/topic/chatRoom/${currentChatRoomId}/callEnded`,
      (message) => {
        const body = JSON.parse(message.body);
        // const id = body.id;
        // if (!remoteCallerInfo[id] || !remoteCallerInfo[id].peer) return;
        // remoteCallerInfo[id].peer.destroy();
        // dispatch(videoCallActions.removePeerConnecton(id));
        Object.values(remoteCallerInfo)[0]?.peer?.destroy();
        if (caller) {
          stompClient.publish({
            destination: `/app/chatRoom/${currentChatRoomId}/sendMessage`,
            body: JSON.stringify({
              messageType: MESSAGE_TYPE.VIDEOCALL,
              callDetails: {
                callType: MESSAGE_TYPE.VIDEOCALL,
                callDuration: body.duration,
              },
            }),
            headers: AuthenticationHeader(),
          });
        }
      },
      AuthenticationHeader()
    );
    return () =>
      stompClient.unsubscribe(subObj.id, {
        ...AuthenticationHeader(),
      });
  }, [userStream, remoteCallerInfo]);

  useEffect(() => {
    if (!userStream) return;

    const subObj = stompClient.subscribe(
      `/topic/chatRoom/${currentChatRoomId}/callDenied`,
      (message) => {
        userStream.getTracks().forEach(function (track) {
          track.stop();
        });
        dispatch(modalActions.resetState());
        dispatch(videoCallActions.resetState());
        if (caller) {
          stompClient.publish({
            destination: `/app/chatRoom/${currentChatRoomId}/sendMessage`,
            body: JSON.stringify({
              messageType: MESSAGE_TYPE.VIDEOCALL,
              callDetails: {
                callType: MESSAGE_TYPE.VIDEOCALL,
                callRejectReason: REJECT_REASON.BUSY,
              },
            }),
            headers: AuthenticationHeader(),
          });
        }
      },
      AuthenticationHeader()
    );

    return () =>
      stompClient.unsubscribe(subObj.id, {
        ...AuthenticationHeader(),
      });
  }, [userStream]);

  return {
    time,

    currentChatRoomId,
    currentUser,

    stompClient,
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
