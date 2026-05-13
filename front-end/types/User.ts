export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  password: string;
  phone: string | null;
  sessionId: number;
  role: any;
}
