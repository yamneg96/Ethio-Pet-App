import { create } from 'zustand';

export type UserRole = 'buyer' | 'seller';

type AuthState = {
  isAuthenticated: boolean;
  role: UserRole;
  setAuthenticated: (value: boolean) => void;
  setRole: (role: UserRole) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: 'buyer',
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setRole: (role) => set({ role }),
}));
