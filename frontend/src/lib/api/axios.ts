import axios from "axios";

// Browser → proxy (same origin). Server → backend directly.
const isBrowser = typeof window !== "undefined";

const AUTH_BASE = isBrowser
  ? "/api/auth"
  : (process.env.NEXT_PUBLIC_API_BACKEND_AUTH_URL ?? "");

const API_BASE = isBrowser
  ? "/api/backend"
  : (process.env.NEXT_PUBLIC_API_BACKEND_URL ?? "");

function attach401Interceptor(instance: ReturnType<typeof axios.create>) {
  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error?.response?.status === 401 && typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth:unauthorized"));
      }
      return Promise.reject(error);
    }
  );
}

/** For /auth/* endpoints */
export const authAxios = axios.create({
  baseURL: AUTH_BASE,
  // Proxy is same-origin in browser; use include for direct server calls
  withCredentials: !isBrowser,
  headers: { "Content-Type": "application/json" },
});
attach401Interceptor(authAxios);

/** For /api/* endpoints (dashboard data, protected resources) */
export const apiAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: !isBrowser,
  headers: { "Content-Type": "application/json" },
});
attach401Interceptor(apiAxios);
