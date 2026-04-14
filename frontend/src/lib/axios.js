import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Attach Clerk session token to every request
// getToken is injected by the setupAxiosInterceptors helper in main.jsx
let _getToken = null;

export const setupAxiosInterceptors = (getToken) => {
  _getToken = getToken;
};

axiosInstance.interceptors.request.use(async (config) => {
  if (_getToken) {
    try {
      const token = await _getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Failed to get Clerk token:", e);
    }
  }
  return config;
});

export default axiosInstance;