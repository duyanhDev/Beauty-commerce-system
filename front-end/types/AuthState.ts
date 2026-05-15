export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
  hydrated: boolean;

  setUser: (user: AuthUser | null) => void;

  logout: () => void;

  setHydrated: (hydrated: boolean) => void;
}
