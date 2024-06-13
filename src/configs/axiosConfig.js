import axios from "axios";
import { getCookie } from "../utils/cookie";

const BASE_URL = "https://catapi-8mib.onrender.com/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);
