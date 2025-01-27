import { API, AUTH_REQUEST } from "../utils/helper";

export async function getCurrentUser() {
  const res = await AUTH_REQUEST.get("/api/v1/users/profile", {
    validateStatus: () => true,
  });

  if (res.status != 200) throw new Error("error");

  const data = res.data.data;
  data.isAuthenticated = true;
  return data;
}

export async function uploadEditAvatar(FormData) {
  const res = await AUTH_REQUEST.post("/api/v1/users/upload-avt", FormData);
  if (res.status != 200) throw new Error("Error when uploading");

  return res.data.data;
}

export async function loginApi({ username, password }) {
  const res = await API.post("api/v1/auth/login", {
    username: username,
    password: password,
  });

  if (res.status != 200) throw new Error("error");

  const data = res.data.data;
  data.isAuthenticated = true;
  return data;
}
