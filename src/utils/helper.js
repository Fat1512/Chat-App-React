export const getAccessToken = () => {
  const token = window.localStorage.getItem("auth_token");
  if (token == null) return null;
  return JSON.parse(token).accessToken;
};

export const getRefreshToken = () => {
  const token = window.localStorage.getItem("auth_token");
  if (token == null) return null;
  return JSON.parse(token).refreshToken;
};

export const AuthenticationHeader = function () {
  return {
    Authorization: `Bearer ${getAccessToken()}`,
  };
};

export const setLocalStorageToken = (token) => {
  window.localStorage.setItem("auth_token", JSON.stringify(token));
};

export const removeLocalStorageToken = () => {
  window.localStorage.removeItem("auth_token");
};

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
