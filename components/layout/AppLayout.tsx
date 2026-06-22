"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Notification } from "@/types";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  notifications?: Notification[];
  onMarkAsRead?: (notificationIds: string[]) => void;
  isLoading?: boolean;
}

export function AppLayout({
  children,
  title,
  notifications,
  onMarkAsRead,
  isLoading = false,
}: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-[#0a0a0f] dark:bg-[#050508] relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00f0ff] via-[#ff00ff] to-[#00ff88] animate-gradient-rotate" />
      </div>

      <div className="relative z-10 flex h-screen w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            title={title}
            notifications={notifications}
            onMarkAsRead={onMarkAsRead}
          />

          <main className="flex-1 overflow-auto relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-transparent z-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00f0ff]"></div>
              </div>
            ) : (
              children
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
