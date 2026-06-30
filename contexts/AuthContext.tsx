"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, LoginRequest, RegisterRequest, AuthResponse } from "@/types";

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

  const login = async (credentials: LoginRequest) => {
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data: AuthResponse = await response.json();
    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const register = async (data: RegisterRequest) => {
    const response = await fetch(
      "http://localhost:4000/auth/create-organization",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("Organization creation failed");
    }

    const authData: AuthResponse = await response.json();
    setUser(authData.user);
    setToken(authData.token);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
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
