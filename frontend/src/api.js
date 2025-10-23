import axios from "axios"
import {ACCESS_TOKEN, REFRESH_TOKEN} from "./constants";

const api = axios.create({baseURL: process.env.REACT_APP_API_URL});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        console.log("api", error.response.data)
        return Promise.reject(error)
    }
)

// ---- Response Interceptor (handles 401 auto-refresh) ----
let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newToken) {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

api.interceptors.response.use(
  (response) => response, // simply return successful responses
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // If we got a 401 Unauthorized from the backend
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) {
        // No refresh token → user must log in again
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        console.log("api 401", error.response.data)
        return Promise.reject(error);
      }

      // If a refresh is already in progress, wait for it
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest)); // retry with new token
          });
        });
      }

      // Otherwise, start a new refresh request
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/token/refresh/`,
          { refresh: refreshToken }
        );
        const newAccessToken = res.data.access;

        // Save new token & update header
        localStorage.setItem(ACCESS_TOKEN, newAccessToken);
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        // Notify any waiting requests
        onRefreshed(newAccessToken);
        isRefreshing = false;

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed → force logout
        isRefreshing = false;
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        //console.log("api logout", error.response.data)
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api