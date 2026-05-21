const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
const AUTH_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_AUTH_URL;

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    message?: string,
    public readonly data?: unknown,
  ) {
    super(message ?? `HTTP ${status}: ${statusText}`);
    this.name = "ApiError";
  }
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let data: unknown;
    try {
      data = await response.json();
    } catch {
      // response body is not JSON
    }
    throw new ApiError(response.status, response.statusText, undefined, data);
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestInit): Promise<T> =>
    request<T>(`${API_BASE_URL}${path}`, { method: "GET", ...options }),

  post: <T>(path: string, body: unknown, options?: RequestInit): Promise<T> =>
    request<T>(`${API_BASE_URL}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    }),

  patch: <T>(path: string, body: unknown, options?: RequestInit): Promise<T> =>
    request<T>(`${API_BASE_URL}${path}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...options,
    }),

  delete: <T>(path: string, options?: RequestInit): Promise<T> =>
    request<T>(`${API_BASE_URL}${path}`, { method: "DELETE", ...options }),

  auth: {
    get: <T>(path: string, options?: RequestInit): Promise<T> =>
      request<T>(`${AUTH_BASE_URL}${path}`, { method: "GET", ...options }),

    post: <T>(path: string, body: unknown, options?: RequestInit): Promise<T> =>
      request<T>(`${AUTH_BASE_URL}${path}`, {
        method: "POST",
        body: JSON.stringify(body),
        ...options,
      }),

    patch: <T>(path: string, body: unknown, options?: RequestInit): Promise<T> =>
      request<T>(`${AUTH_BASE_URL}${path}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        ...options,
      }),
  },
};
