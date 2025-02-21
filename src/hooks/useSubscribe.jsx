import { useDispatch } from "react-redux";
import { chatListActions } from "../store/chatListSlice";
import { profileActions } from "../store/profileSlice";
import {
  AuthenticationHeader,
  getAccessToken,
  getStartMiliOfDay,
} from "../utils/helper";
import useSocket from "./useSocket";
import useUser from "./useUser";
import { chatActions } from "../store/chatSlice";
import { videoCallActions } from "../store/videoCallSlice";
import { modalActions } from "../store/modalSlide";
import { MODAL, VIDEOCALL_STATUS } from "../utils/constants";
import { useState } from "react";

let currentTimeOut;
function useSubscribe() {
  const { stompClient } = useSocket();
  const { user: currentUser } = useUser();
  const [currentSubscribedEvents, setCurrentSubscribedEvents] = useState([]);
  const dispatch = useDispatch();

  function subscribeAllTheMessageEvent(id) {
    const s1 = stompClient.subscribe(
      `/topic/chatRoom/${id}/callRequest`,
      (message) => {
        const body = JSON.parse(message.body);
        dispatch(
          videoCallActions.setRequestCaller({ ...body, chatRoomId: id })
        );
        dispatch(modalActions.setCurrentModal(MODAL.VIDEOCALL));
      },
      AuthenticationHeader()
    );

    const s2 = stompClient.subscribe(
      `/topic/chatRoom/${id}/message/deliveredStatus`,
      (message) => {
        const body = JSON.parse(message.body);
        body.forEach((item) => {
          dispatch(
            chatActions.markAsDeliveredMessages({
              chatRoomId: id,
              senderId: item.senderId,
            })
          );
        });
      },
      AuthenticationHeader()
    );

    //Tracking message status
    const s3 = stompClient.subscribe(
      `/topic/chatRoom/${id}/message/readStatus`,
      (message) => {
        const body = JSON.parse(message.body);
        body.forEach((item) => {
          dispatch(
            chatActions.markAsReadMessages({
              chatRoomId: id,
              senderId: item.senderId,
            })
          );
        });
      },
      AuthenticationHeader()
    );

    //Tracking new upcomming messages
    const s4 = stompClient.subscribe(
      `/topic/chatRoom/${id}/newMessages`,
      (message) => {
        const today = getStartMiliOfDay();
        const body = JSON.parse(message.body);
        dispatch(
          chatListActions.setLatestMessage({
            chatRoomId: id,
            latestMessage: body,
          })
        );
        dispatch(
          chatListActions.increaseUnreadMessageCount({
            chatRoomId: id,
          })
        );
        dispatch(
          chatActions.appendMessageHistory({
            chatRoomId: id,
            today: today,
            message: body,
          })
        );
      },
      AuthenticationHeader()
    );

    //Tracking new online status
    const s5 = stompClient.subscribe(
      `/topic/chatRoom/${id}/onlineStatus`,
      (message) => {
        const body = JSON.parse(message.body);
        if (!body) return;
        dispatch(
          profileActions.setOnlineStatus({
            chatRoomId: body.chatRoomId,
            status: {
              online: body.status,
              lastSeen: body.lastSeen,
            },
          })
        );
        dispatch(
          chatListActions.setOnlineStatus({
            chatRoomId: body.chatRoomId,
            status: {
              online: body.status,
              lastSeen: body.lastSeen,
            },
          })
        );
      },
      AuthenticationHeader()
    );

    //Tracking typing event
    const s6 = stompClient.subscribe(
      `/topic/chatRoom/${id}/typing`,
      (message) => {
        const body = JSON.parse(message.body);
        if (body.senderId == currentUser.id) return;
        currentTimeOut && clearTimeout(currentTimeOut);

        currentTimeOut = setTimeout(() => {
          dispatch(
            profileActions.setMode({
              chatRoomId: id,
              mode: null,
            })
          );
          dispatch(
            chatListActions.setMode({
              chatRoomId: id,
              mode: null,
            })
          );
        }, 1000);
        dispatch(
          profileActions.setMode({
            chatRoomId: id,
            mode: body.mode,
          })
        );
        dispatch(
          chatListActions.setMode({
            chatRoomId: id,
            mode: body.mode,
          })
        );
      },
      AuthenticationHeader()
    );
    setCurrentSubscribedEvents(Array.of(s1, s2, s3, s4, s5, s6));
  }

  // function resubscribeAllTheMessageEvent(id) {
  //   currentSubscribedEvents.forEach((event) => {
  //     stompClient.unsubscribe(event.id, {
  //       ...AuthenticationHeader(),
  //     });
  //   });
  //   subscribeAllTheMessageEvent(id);
  // }

  return { subscribeAllTheMessageEvent };
}

export default useSubscribe;
