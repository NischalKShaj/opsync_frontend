"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, LoginRequest, RegisterRequest, AuthResponse } from "@/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isReady: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    // Local variables hold the true state during this execution pass
    let activeUser: User | null = null;
    let activeToken: string | null = null;
    let activeRefreshToken: string | null = null;

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

    if (storedRefreshToken) {
      activeRefreshToken = storedRefreshToken;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRefreshToken(activeRefreshToken);
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

    const authData: AuthResponse = await response.json();
    const user: User = {
      id: authData.data.user.id || authData.data.user.userId || "",
      email: authData.data.user.email,
      name: authData.data.user.name,
    };
    setUser(user);
    setToken(authData.data.accessToken);
    setRefreshToken(authData.data.refreshToken);

    localStorage.setItem("token", authData.data.accessToken);
    localStorage.setItem("refreshToken", authData.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
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
    const user: User = {
      id: authData.data.user.id || authData.data.user.userId || "",
      email: authData.data.user.email,
      name: authData.data.user.name,
      organizationId: authData.data.organization?.organizationId,
    };
    setUser(user);
    setToken(authData.data.accessToken);
    setRefreshToken(authData.data.refreshToken);

    localStorage.setItem("token", authData.data.accessToken);
    localStorage.setItem("refreshToken", authData.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:4000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setToken(null);
      setRefreshToken(null);

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
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
