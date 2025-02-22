import { useEffect, useState } from "react";
import useSocket from "./useSocket";
import { chatListActions } from "../store/chatListSlice";
import { contactActions } from "../store/contactSlice";
import { AuthenticationHeader, removeLocalStorageToken } from "../utils/helper";
import { AUTH_REQUEST } from "../utils/axiosConfig";
import { useDispatch } from "react-redux";
import useSubscribe from "./useSubscribe";
import useUser from "./useUser";

function useInit() {
  const { reconnectCount, stompClient, connected } = useSocket();
  const { resubscribeAllTheMessageEvent, subscribeAllTheMessageEvent } =
    useSubscribe();
  const { user: currentUser } = useUser();
  const [loaded, setLoaded] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchChatSummary() {
      const res = await AUTH_REQUEST.get("/api/v1/chatrooms");
      if (res.status != 200) throw new Error("error");
      const data = res.data.data;

      // Add chatBot room
      // data.unshift(INIT_CHATBOT_CHATLIST_INFO);
      dispatch(chatListActions.setChatList(data));
      // dispatch(profileActions.setProfile(INIT_CHATBOT_CHATLIST_INFO));
      // dispatch(chatActions.setChatHistory(INIT_CHATBOT_CHAT_INFO));
      data.forEach((chatRoomItem) => {
        const id = chatRoomItem.chatRoomId;
        subscribeAllTheMessageEvent(id);
      });
    }

    async function fetchContacts() {
      const res = await AUTH_REQUEST.get("/api/v1/contacts");
      if (res.status != 200) throw new Error("error");
      dispatch(contactActions.setContactList(res.data.data));
    }
    function subscribeLoginEvent() {
      stompClient.subscribe(
        `/topic/login/${currentUser.id}/send`,
        (message) => {
          const token = JSON.parse(message.body);

          if (token.authentication != AuthenticationHeader().Authorization) {
            removeLocalStorageToken();
            window.location.reload();
          }
        },
        AuthenticationHeader()
      );
    }
    if (connected) {
      subscribeLoginEvent();
      fetchChatSummary();
      fetchContacts();
      setLoaded(true);
    }
  }, [connected]);

  // useEffect(() => {
  //   if (stompClient?._stompHandler || reconnectCount == 0) return;
  //   currentUser.chatRoomIds.forEach((id) => resubscribeAllTheMessageEvent(id));
  // }, [stompClient, reconnectCount]);

  return { loaded };
}

export default useInit;
