import { AUTH_REQUEST } from "../utils/axiosConfig";
import {
  MESSAGE_PADDING_OFFSET,
  MESSAGE_PAGE,
  MESSAGE_PAGE_SIZE,
} from "../utils/constants";

export async function getMessagesAPI({
  chatRoomId,
  page = MESSAGE_PAGE,
  size = MESSAGE_PAGE_SIZE,
  paddingOffset = MESSAGE_PADDING_OFFSET,
}) {
  console.log(paddingOffset);
  const res = await AUTH_REQUEST.get(
    `/api/v1/chatrooms/${chatRoomId}/messages?page=${page}&size=${size}&paddingOffset=${paddingOffset}`
  );
  if (res.status != 200) throw new Error(res.data.message);
  return res.data.data;
}

export async function getChatDetailAPI(chatRoomId) {
  const res = await AUTH_REQUEST.get(`/api/v1/chatrooms/${chatRoomId}`);
  if (res.status != 200) throw new Error(res.data.message);
  return res.data.data;
}
