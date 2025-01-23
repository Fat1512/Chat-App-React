import { useDispatch } from "react-redux";
import { chatListActions } from "../store/chatListSlice";
import { profileActions } from "../store/profileSlice";
import { AuthenticationHeader, getStartMiliOfDay } from "../utils/helper";
import useSocket from "./useSocket";
import useUser from "./useUser";
import { chatActions } from "../store/chatSlice";

let currentTimeOut;
function useSubscribe() {
  const { stompClient } = useSocket();
  const { user: currentUser } = useUser();
  const dispatch = useDispatch();
  function subscribeAllTheMessageEvent(id) {
    stompClient.subscribe(
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
      AuthenticationHeader
    );

    //Tracking message status
    stompClient.subscribe(
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
      AuthenticationHeader
    );

    //Tracking new upcomming messages
    stompClient.subscribe(
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
          chatActions.updateMessageHistory({
            chatRoomId: id,
            today: today,
            message: body,
          })
        );
      },
      AuthenticationHeader
    );

    //Tracking new online status
    stompClient.subscribe(
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
      AuthenticationHeader
    );

    //Tracking typing event
    stompClient.subscribe(
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
      AuthenticationHeader
    );
  }
  return { subscribeAllTheMessageEvent };
}

export default useSubscribe;
