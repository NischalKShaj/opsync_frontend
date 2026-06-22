"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ProtectedRoute>
      <AppLayout title="Settings">
        <div className="max-w-2xl">
          <div className="bg-[#12121a] dark:bg-[#0a0a12] rounded-lg border border-[#2a2a3e] dark:border-[#1a1a2e] p-6 shadow-[0_0_30px_rgba(0,240,255,0.1)] relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00f0ff] via-[#ff00ff] to-[#00ff88] animate-gradient-rotate" />
            </div>

            <div className="relative z-10">
              <h2 className="text-lg font-bold text-white neon-text mb-6">
                Appearance
              </h2>

              <div className="flex items-center justify-between py-4 px-4 rounded-lg bg-white/5 border border-[#2a2a3e] hover:border-[#00f0ff]/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00f0ff]/20 to-[#ff00ff]/20 flex items-center justify-center border border-[#00f0ff]/30">
                    {theme === "dark" ? (
                      <Moon className="w-6 h-6 text-[#36dfeb]" />
                    ) : (
                      <Sun className="w-6 h-6 text-[#ffaa00]" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white">Dark Mode</p>
                    <p className="text-sm text-gray-400">
                      Toggle dark theme for the application
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative w-14 h-8 rounded-full transition-all duration-300 ml-4 shrink-0 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-[#00f0ff] to-[#00ff88] shadow-[0_0_8px_rgba(0,240,255,0.4)]" // Reduced blur from 15px to 8px, opacity to 0.4
                      : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 ${
                      theme === "dark" ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
