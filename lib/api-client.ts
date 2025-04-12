// Create a reusable API client instance
import axios, {
  AxiosError,
  AxiosInstance,
  // AxiosResponse,
  // AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
// import { clearUserData, getAuthToken } from "./utils/auth-utils";
// import { getSession } from "next-auth/react";
// import type { Session } from "next-auth";

// Define a type for the API error response
interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

// interface CustomSession extends Session {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     section?: {
//       token?: string;
//     };
//   };
//   googleAccessToken?: string;
// }

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.FINART_API_URL + "/api" || "http://localhost:3000",
  timeout: 10000,
  paramsSerializer: (params) => {
    return Object.keys(params)
      .map((key) => key + "=" + encodeURIComponent(params[key]))
      .join("&");
  },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  async (config) => {
    // Get token from localStorage or other storage mechanism
    // const session = await getSession() as CustomSession | null;

    // console.log({ session });
    // const token = session?.user?.section?.token || null;
    // if (token) {
    //   config.headers["session"] = token;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for global error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError<ApiErrorResponse>) => {
    // Extract error message from response or use default message
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred";

    // Handle specific status codes
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // clearUserData();
      }
    }

    return Promise.reject(new Error(errorMessage));
  }
);

// Helper methods for common API operations
export const api = {
  get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    apiClient.get<T, T>(url, { params, ...config }),
  post: <T>(url: string, data: object, config?: AxiosRequestConfig) =>
    apiClient.post<T, T>(url, data, config),
  put: <T>(url: string, data: object) => apiClient.put<T, T>(url, data),
  delete: <T>(url: string) => apiClient.delete<T, T>(url),
  patch: <T>(url: string, data: object) => apiClient.patch<T, T>(url, data),
  // New method for posting URL-encoded form data
  postFormUrlEncoded: <T>(
    url: string,
    data: Record<string, string | number | boolean>
  ) => {
    // Convert data object to URLSearchParams format
    const params = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      params.append(key, String(data[key]));
    });

    // Use a custom config to set the content type header for this specific request
    return apiClient.post<T, T>(url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
};

export default apiClient;
