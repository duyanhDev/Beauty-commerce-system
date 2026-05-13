import { User } from "./User";

export interface AuthState {
  user: User | null;
  sessionId: number | null;
  setUser: (user: User, sessionId: number | null) => void;
  logout?: () => void;
}
