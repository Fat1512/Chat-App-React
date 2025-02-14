import { AuthenticationHeader } from "../utils/helper";
import { AUTH_REQUEST } from "../utils/axiosConfig";

export async function addContactAPI({ username, name }) {
  const res = await AUTH_REQUEST.post(
    "/api/v1/contacts/create-contact",
    {
      username: username,
      name: name,
    },
    AuthenticationHeader()
  );
  if (res.status != 200) throw new Error(res.response.data.message);

  return res.data.data;
}
