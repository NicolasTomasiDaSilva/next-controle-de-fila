import axios from "axios";
import Cookies from "js-cookie";

export function axiosInstance(
  headers: Record<string, string> = {}
): Axios.AxiosInstance {
  const token = Cookies.get("access_token");

  const instance = axios.create({
    baseURL: process.env.API_BASE_URL || "http://localhost:3000/api",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      if (config && config.headers) {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
}
