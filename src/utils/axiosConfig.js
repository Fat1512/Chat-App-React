import axios from "axios";
import axiosRetry from "axios-retry";
import { getAccessToken, setLocalStorageToken } from "./helper";
import { refreshToken } from "../services/tokenAPI";
import { useNavigate } from "react-router-dom";

let retryQueue = [];
let isRefresh = false;

axiosRetry(axios, {
  retries: 0, // Number of retries (Defaults to 3)
  retryCondition(err) {
    return false;
  },
});

export const API = axios.create({
  baseURL: `http://localhost:8080`,
});

export const AUTH_REQUEST = axios.create({
  baseURL: `http://localhost:8080`,
});

AUTH_REQUEST.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AUTH_REQUEST.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response, config: originalRequest } = error;
    if (response.status == 401 || response.status == 403) {
      if (!isRefresh) {
        isRefresh = true;
        try {
          const token = await refreshToken();
          setLocalStorageToken(token);

          retryQueue.forEach((req) => {
            AUTH_REQUEST.request(req.config)
              .then((res) => req.resolve(res))
              .catch((err) => req.reject(err));
          });
          retryQueue.length = 0;

          return AUTH_REQUEST(originalRequest);
        } catch (err) {
          window.location.href = "http://localhost:5173/auth/login";
        } finally {
          isRefresh = false;
        }
      }

      return new Promise((resolve, reject) => {
        retryQueue.push({ config: originalRequest, resolve, reject });
      });
    }
    return Promise.reject(error);
  }
);
