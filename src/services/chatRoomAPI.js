import { AUTH_REQUEST } from "../utils/helper";

export async function uploadMessageImages(FormData) {
  const res = await AUTH_REQUEST.post("/api/v1/s3/upload-images", FormData);
  if (res.status != 200) throw new Error("Error when uploading");
  console.log(res.data.data);
  return res.data.data;
}
