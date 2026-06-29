"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, LoginRequest, RegisterRequest } from "@/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isReady: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DUMMY_USER: User = {
  id: "1",
  name: "Test User",
  email: "test@example.com",
  organizationId: "org-1",
  role: "OrganizationAdmin",
  designation: "CEO",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

const DUMMY_TOKEN = "dummy-token-123";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    // Local variables hold the true state during this execution pass
    let activeUser: User | null = null;
    let activeToken: string | null = null;

    if (storedUser) {
      try {
        activeUser = JSON.parse(storedUser);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(activeUser);
      } catch {
        localStorage.removeItem("user");
      }
    }

    if (storedToken) {
      activeToken = storedToken;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(activeToken);
    }

    // Now it's safe to mark ready since we synchronized synchronous variables!
    setIsReady(true);
  }, []);

  const login = async (_credentials: LoginRequest) => {
    setUser(DUMMY_USER);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(DUMMY_TOKEN);

    localStorage.setItem("token", DUMMY_TOKEN);
    localStorage.setItem("user", JSON.stringify(DUMMY_USER));
  };

  const register = async (data: RegisterRequest) => {
    const newUser: User = {
      id: "2",
      name: data.name,
      email: data.email,
      organizationId: `org-${Date.now()}`,
      role: "OrganizationAdmin",
      designation: "CEO",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setUser(newUser);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(DUMMY_TOKEN);

    localStorage.setItem("token", DUMMY_TOKEN);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isReady,
        login,
        register,
        logout,
        // Fallback directly to storage check on the initial hydration frame
        // to prevent the state lag from tripping up route guards
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
