import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================
// REQUEST INTERCEPTOR
// =======================
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// =======================
// RESPONSE INTERCEPTOR
// =======================

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<any>) => {
    const originalRequest: any = error.config;

    // access token hết hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // tránh gọi nhiều lần refresh cùng lúc
        if (!isRefreshing) {
          isRefreshing = true;

          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            {},
            {
              withCredentials: true,
            },
          );

          isRefreshing = false;
        }

        // gọi lại request cũ
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      console.error("Forbidden!");
    }

    if (error.response?.status === 500) {
      console.error("Server error!");
    }

    return Promise.reject(error.response?.data || error.message);
  },
);

export default axiosInstance;
