import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// 👉 tạo instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================
// 👉 REQUEST INTERCEPTOR
// =======================
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // ⚠️ tránh lỗi SSR
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// =======================
// 👉 RESPONSE INTERCEPTOR
// =======================
axiosInstance.interceptors.response.use(
  (response) => {
    // 👉 có thể unwrap data luôn nếu muốn
    return response;
  },
  (error: AxiosError<any>) => {
    const status = error.response?.status;

    // 🔥 handle global error
    if (status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");

        // redirect login
        window.location.href = "/login";
      }
    }

    if (status === 403) {
      console.error("Forbidden!");
    }

    if (status === 500) {
      console.error("Server error!");
    }

    return Promise.reject(error.response?.data || error.message);
  },
);

export default axiosInstance;
