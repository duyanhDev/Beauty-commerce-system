// types/User.ts
export default interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  phone: string | null;
  role: {
    id: number;
    name: string;
    description: string;
    created_at: string;
  };
  created_at: string;
}
