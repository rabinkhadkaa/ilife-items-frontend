import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// Request Interceptor (optional logs)
api.interceptors.request.use(
  (config) => {
    console.log(`API Request → ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (global error handler)
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.statusText ||
      "Something went wrong";

    console.error("API Error:", message);
    return Promise.reject(message);
  }
);

export default api;
