import axios from "axios";
import axiosRetry from "axios-retry";

axios.defaults.validateStatus = (status) => status >= 200 && status <= 500;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      return Promise.reject("Unauthorized");
    }
    // Handle other errors here
    return Promise.reject(error);
  }
);
axiosRetry(axios, {
  retries: 0, // Number of retries (Defaults to 3)
  retryCondition(err) {
    return false;
  },
});
export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const setLocalStorageToken = (token) => {
  if (token !== null) {
    window.localStorage.setItem("auth_token", token);
  } else {
    window.localStorage.removeItem("auth_token");
  }
};

export const removeLocalStorageToken = () => {
  window.localStorage.removeItem("auth_token");
};

export const AUTH_REQUEST = axios.create({
  baseURL: `http://localhost:8080`,
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
  timeout: 2000,
});

export const API = axios.create({
  baseURL: `http://localhost:8080`,
});

export function formatTime(timestamp) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Set timezone
  };

  return new Intl.DateTimeFormat("en-US", options).format(new Date(timestamp));
}

export function formatDate(timestamp) {
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(timestamp));
}
