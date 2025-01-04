export async function getCurrentUser() {
  const login = JSON.parse(localStorage.getItem("loggedIn"));
  const data = {
    username: "username",
    password: "password",
    isAuthenticated: login,
  };
  return data;
}

export async function loginApi({ username, password }) {
  //   let { data, error } = await fetch("/asd");
  //   console.log(data);
  //   if (error) throw new Error("Wrong password or email");

  //Set JWT Token
  localStorage.setItem("loggedIn", JSON.stringify(true));

  return {
    username: "username",
    password: "password",
  };
}
