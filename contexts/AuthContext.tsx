"use client";

import React, { createContext, useContext, useState } from "react";
import { User, LoginRequest, RegisterRequest, AuthResponse } from "@/types";
import { authApi } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });

  const DUMMY_USER: User = {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const DUMMY_USER_2: User = {
    id: "2",
    name: "Test User 2",
    email: "test2@example.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const DUMMY_TOKEN = "dummy-token-123";

  // const login = async (credentials: LoginRequest) => {
  //   const response = await authApi.post<AuthResponse>(
  //     "/auth/login",
  //     credentials,
  //   );
  //   setUser(response.user);
  //   setToken(response.token);
  //   localStorage.setItem("token", response.token);
  //   localStorage.setItem("user", JSON.stringify(response.user));
  // };

  const login = async () => {
    setUser(DUMMY_USER);
    setToken(DUMMY_TOKEN);

    localStorage.setItem("token", DUMMY_TOKEN);
    localStorage.setItem("user", JSON.stringify(DUMMY_USER));
  };

  // const register = async (data: RegisterRequest) => {
  //   const response = await authApi.post<AuthResponse>("/auth/register", data);
  //   setUser(response.user);
  //   setToken(response.token);
  //   localStorage.setItem("token", response.token);
  //   localStorage.setItem("user", JSON.stringify(response.user));
  // };

  const register = async () => {
    setUser(DUMMY_USER_2);
    setToken(DUMMY_TOKEN);

    localStorage.setItem("token", DUMMY_TOKEN);
    localStorage.setItem("user", JSON.stringify(DUMMY_USER_2));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
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
