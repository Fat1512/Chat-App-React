import { AUTH_REQUEST } from "../utils/axiosConfig";

export async function uploadMessageImages(FormData) {
  const res = await AUTH_REQUEST.post("/api/v1/s3/upload-images", FormData);
  if (res.status != 200) throw new Error("Error when uploading");
  return res.data.data;
}

export async function getChatDetailAPI(chatRoomId) {
  const res = await AUTH_REQUEST.get(`/api/v1/chatrooms/${chatRoomId}`);
  if (res.status != 200) throw new Error(res.data.message);
  return res.data.data;
}
