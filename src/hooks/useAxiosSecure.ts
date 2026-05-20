import axios, { AxiosInstance } from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";

// Create an axios instance
export const axiosSecure: AxiosInstance = axios.create({
  baseURL: "", // Set your backend base URL here when ready
});

const useAxiosSecure = (): AxiosInstance => {
  useEffect(() => {
    // Add a request interceptor to attach the access token
    const interceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = Cookies.get("accessToken");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Eject interceptor on cleanup to prevent multiple interceptors
    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
