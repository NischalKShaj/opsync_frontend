"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";

export default function SettingsPage() {
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
                Settings
              </h2>

              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">
                  Theme settings have been moved to the sidebar
                </p>
                <p className="text-sm text-gray-500">
                  Use the theme toggle button in the sidebar to switch between
                  light and dark mode
                </p>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
