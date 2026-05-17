// services/auth.ts
import { api } from "@/utils/axios"; // ✅ đúng path

export const Auth = {
  fetchMe: async () => {
    const res = await api.get("/auth/me");
    return res.data.user;
  },

  login: async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  },

  logout: async () => {
    const res = await api.delete("/auth/logout");
    return res.data;
  },

  refresh: async () => {
    const res = await api.post("/auth/refresh");
    return res.data;
  },
};
