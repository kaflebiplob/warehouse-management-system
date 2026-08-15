import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `JWT ${localStorage.getItem("access_token")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    // If there's no response at all (network error, CORS block, server down,
    // timeout), don't try to read error.response — it's undefined.
    if (!error.response) {
      console.error("[axiosInstance] No response from server:", error.message);
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        console.error("[axiosInstance] Got 401 but no refresh token stored.");
        return Promise.reject(error);
      }

      return axiosInstance
        .post("/api/token/refresh", { refresh: refreshToken })
        .then((response) => {
          const newAccess = response.data.access;
          localStorage.setItem("access_token", newAccess);
          if (response.data.refresh) {
            localStorage.setItem("refresh_token", response.data.refresh);
          }

          axiosInstance.defaults.headers["Authorization"] = `JWT ${newAccess}`;
          originalRequest.headers["Authorization"] = `JWT ${newAccess}`;

          return axiosInstance(originalRequest);
        })
        .catch((err) => {
          console.error(
            "[axiosInstance] Token refresh failed:",
            err.response?.data || err.message,
          );
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          return Promise.reject(err);
        });
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
