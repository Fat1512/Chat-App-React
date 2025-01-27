import { AUTH_REQUEST, AuthenticationHeader } from "../utils/helper";

export async function addContact({ username, name }) {
  const res = await AUTH_REQUEST.post(
    "/api/v1/contacts/create-contact",
    {
      username: username,
      name: name,
    },
    AuthenticationHeader()
  ).catch((err) => {
    console.log(err);
  });

  if (res.status != 200) throw new Error("error");

  return res.data.data;
}
