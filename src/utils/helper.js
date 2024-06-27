import axios from "axios";

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const setAuthHeader = (token) => {
  if (token !== null) {
    window.localStorage.setItem("auth_token", token);
  } else {
    window.localStorage.removeItem("auth_token");
  }
};

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

export async function request(url) {
  let headers = {};
  // if (getAuthToken() !== null && getAuthToken() !== "null") {
  //   headers = { Authorization: `Bearer ${getAuthToken()}` };
  // }

  return axios.get(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaGF0MTUxMkAiLCJpYXQiOjE3MTk0ODc2NDgsImV4cCI6MTcxOTU3NDA0OH0.-bIYug8wkV89PrBW3n_yuEnfz9UQgM9BDnUItIRiN9o",
    },
  });
}
