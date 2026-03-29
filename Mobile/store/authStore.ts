import { create } from 'zustand';

export type UserRole = 'buyer' | 'seller' | 'admin';

type AuthState = {
  isAuthenticated: boolean;
  role: UserRole;
  accessToken?: string;
  refreshToken?: string;
  userId?: string;
  email?: string;
  setAuthenticated: (value: boolean) => void;
  setRole: (role: UserRole) => void;
  setTokens: (accessToken?: string, refreshToken?: string) => void;
  setUser: (user: { id: string; email: string; role: UserRole }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: 'buyer',
  accessToken: undefined,
  refreshToken: undefined,
  userId: undefined,
  email: undefined,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setRole: (role) => set({ role }),
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  setUser: (user) => set({ userId: user.id, email: user.email, role: user.role }),
  clearAuth: () => set({ isAuthenticated: false, accessToken: undefined, refreshToken: undefined, userId: undefined, email: undefined, role: 'buyer' }),
}));
