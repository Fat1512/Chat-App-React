import axios from "axios";
import axiosRetry from "axios-retry";

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const AuthenticationHeader = function () {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
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

export const AUTH_REQUEST = axios.create({
  baseURL: `http://localhost:8080`,
});

AUTH_REQUEST.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const API = axios.create({
  baseURL: `http://localhost:8080`,
});

export function generateUUID() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

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

export function formatSecond(second) {
  const h = Math.floor(second / 3600)
    .toString()
    .padStart(2, "0");
  second %= 3600;
  const m = Math.floor(second / 60)
    .toString()
    .padStart(2, "0");
  second %= 60;
  const s = second.toString().padStart(2, "0");

  return `${h}:${m}:${s}`;
}

export function getStartMiliOfDay() {
  return new Date().setUTCHours(0, 0, 0, 0);
}
