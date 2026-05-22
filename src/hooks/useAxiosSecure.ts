import { useEffect } from "react";
import Cookies from "js-cookie";
import { apiAxios } from "@/lib/api/axios";
import type { AxiosInstance } from "axios";

/**
 * Returns the shared apiAxios instance (withCredentials: true, 401 → auth:unauthorized event).
 * Attaches an Authorization header from the `accessToken` cookie on each request when present
 * (supports backends that accept both cookie-based and header-based JWT).
 */
const useAxiosSecure = (): AxiosInstance => {
  useEffect(() => {
    const id = apiAxios.interceptors.request.use((config) => {
      const token = Cookies.get("accessToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => apiAxios.interceptors.request.eject(id);
  }, []);

  return apiAxios;
};

export { apiAxios as axiosSecure };
export default useAxiosSecure;
