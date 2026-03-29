"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { logoutAction } from "@/lib/actions/auth";

interface AuthContextType {
  user: any;
  login: (userData: any) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, initialUser }: { children: React.ReactNode, initialUser: any }) {
  const [user, setUser] = useState<any>(initialUser);
  const [loading, setLoading] = useState(false);

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = async () => {
    await logoutAction();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
