import axios from "axios";
import axiosRetry from "axios-retry";
import { getAccessToken, setLocalStorageToken } from "./helper";
import { refreshToken } from "../services/tokenAPI";
import { BASE_URL } from "./APIUrl";

let retryQueue = [];
let isRefresh = false;

axiosRetry(axios, {
  retries: 0, // Number of retries (Defaults to 3)
  retryCondition(err) {
    return false;
  },
});

export const API = axios.create({
  baseURL: BASE_URL,
});

export const AUTH_REQUEST = axios.create({
  baseURL: BASE_URL,
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
    const { response, config } = error;
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

          config.headers["Authorization"] = `Bearer ${token.accessToken}`;

          retryQueue.length = 0;

          return AUTH_REQUEST(config);
          /**
           * 2 types of error:
           *  + Already Existed by fetching by socket: 400
           *  + Already Expired refresh token: 401, 500
           */
        } catch (err) {
          return Promise.reject(error);
        } finally {
          isRefresh = false;
        }
      }

      return new Promise((resolve, reject) => {
        retryQueue.push({ config: config, resolve, reject });
      });
    }
    return Promise.reject(error);
  }
);
