import axios from "@/utils/axios";

export const Auth = {
  login: async (email: string, password: string) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      email,
      password,
    });
  },

  register: async (email: string, name: string, password: string) => {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        email,
        name,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },

  logoutAuth: async () => {
    return await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
  },
  getCurrentUser: async () => {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
  },
};
