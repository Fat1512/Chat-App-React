import { API, AUTH_REQUEST, setLocalStorageToken } from "../utils/helper";

export async function getCurrentUserAPI() {
  const res = await AUTH_REQUEST.get("/api/v1/users/profile", {
    validateStatus: () => true,
  });

  if (res.status != 200) throw new Error("error");

  const data = res.data.data;
  data.isAuthenticated = true;
  return data;
}

export async function uploadEditAvatarAPI(FormData) {
  const res = await AUTH_REQUEST.post("/api/v1/users/upload-avt", FormData);
  if (res.status != 200) throw new Error("Error when uploading");

  return res.data.data;
}

export async function loginAPI({ username, password }) {
  const res = await API.post("api/v1/auth/login", {
    username: username,
    password: password,
  });

  if (res.status != 200) throw new Error(res.data.message);

  const data = res.data.data;
  data.isAuthenticated = true;
  setLocalStorageToken(data.tokenDTO.accessToken);

  return data;
}

export async function registerAPI({
  name,
  username,
  password,
  repeatPassword,
}) {
  const res = await API.post("api/v1/auth/register", {
    name: name,
    username: username,
    password: password,
    confirmedPassword: repeatPassword,
  });
  if (res.status != 200 && res.status != 201) throw new Error(res.data.message);
}

export async function logoutAPI() {
  const res = await AUTH_REQUEST.post("api/v1/auth/logout");
  if (res.status != 200 && res.status != 201) throw new Error(res.data.message);
}
