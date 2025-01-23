import { useEffect, useState } from "react";
import useSocket from "./useSocket";
import { chatListActions } from "../store/chatListSlice";
import { contactActions } from "../store/contactSlice";
import { AUTH_REQUEST } from "../utils/helper";
import { useDispatch } from "react-redux";
import useSubscribe from "./useSubscribe";

function useInit() {
  const { connected } = useSocket();
  const { subscribeAllTheMessageEvent } = useSubscribe();
  const [loaded, setLoaded] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchChatSummary() {
      const res = await AUTH_REQUEST.get("/api/v1/chatrooms");
      if (res.status != 200) throw new Error("error");
      const data = res.data.data;
      dispatch(chatListActions.setChatList(data));

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
    if (connected) {
      fetchChatSummary();
      fetchContacts();
      setLoaded(true);
    }
  }, [connected]);

  return { loaded };
}

export default useInit;
