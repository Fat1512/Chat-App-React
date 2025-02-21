import { API } from "../utils/axiosConfig";

export async function getOauthURLAPI() {
  const res = await API.get("/api/v1/auth/oauth-url");
  if (res.status != 200) throw new Error(res.response.data.message);
  return res.data.data;
}

export async function loginoauthService(authorizationCode) {
  const res = await API.post("/api/v1/auth/oauth/login", {
    authorizationCode: authorizationCode,
  });
  if (res.status != 200) throw new Error(res.response.data.message);
  return res.data.data;
}
