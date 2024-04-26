// import { LocalStorageService } from "@/lib/utils";
import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://chatapp-backend-alpha.vercel.app",
  baseURL: "http://chatty-backend.evileyedev.in:5000/api/v1/",
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(
  async function (config) {
    // Retrieve user token from local storage
    const accessToken = localStorage.getItem("accessToken");
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
