import { AUTH_REQUEST } from "../utils/axiosConfig";
export async function uploadMessageImages(FormData) {
  const res = await AUTH_REQUEST.post("/api/v1/s3/upload-images", FormData);
  if (res.status != 200) throw new Error("Error when uploading");
  return res.data.data;
}
