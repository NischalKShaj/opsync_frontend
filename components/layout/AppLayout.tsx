"use client";

import { ReactNode, useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Notification } from "@/types";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  notifications?: Notification[];
  onMarkAsRead?: (notificationIds: string[]) => void;
  isLoading?: boolean; // New prop to sync the single loader
}

export function AppLayout({
  children,
  title,
  notifications,
  onMarkAsRead,
  isLoading = false,
}: AppLayoutProps) {
  const [mounted, setMounted] = useState(false);

  // Mount instantly on the client to avoid layout shifting
  useEffect(() => {
    const loadMount = async () => {
      setMounted(true);
    };
    loadMount();
  }, []);

  return (
    <div className="flex h-screen bg-[#0a0a0f] dark:bg-[#050508] relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00f0ff] via-[#ff00ff] to-[#00ff88] animate-gradient-rotate" />
      </div>

      {/* The main layout frame is always persistent once mounted */}
      <div
        className={`relative z-10 flex h-screen w-full transition-opacity duration-300 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            title={title}
            notifications={notifications}
            onMarkAsRead={onMarkAsRead}
          />

          <main className="flex-1 overflow-auto relative">
            {/* If the page is fetching data, isolate the spinner inside the main container */}
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
