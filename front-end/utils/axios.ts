import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(null);
  });
  failedQueue = [];
};

const SKIP_RETRY_URLS = ["/auth/refresh", "/auth/login", "/auth/logout"];

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<any>) => {
    const originalRequest: any = error.config;

    const isSkipped = SKIP_RETRY_URLS.some((url) =>
      originalRequest?.url?.includes(url),
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isSkipped
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        await axiosInstance.post("/auth/refresh");
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // ← không redirect, không reload, chỉ reject
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 403) console.error("Forbidden!");
    if (error.response?.status === 500) console.error("Server error!");

    return Promise.reject(error.response?.data || error.message);
  },
);

export default axiosInstance;
