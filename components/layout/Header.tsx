"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { NotificationBadge } from "@/components/notification/NotificationBadge";
import { NotificationList } from "@/components/notification/NotificationList";
import { Notification } from "@/types";

interface HeaderProps {
  title: string;
  notifications?: Notification[];
  onMarkAsRead?: (notificationIds: string[]) => void;
}

export function Header({
  title,
  notifications = [],
  onMarkAsRead,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (notificationIds: string[]) => {
    onMarkAsRead?.(notificationIds);
    setIsOpen(false);
  };

  return (
    <header className="relative z-40 bg-[#0f0f1a] dark:bg-[#080810] border-b border-[#2a2a3e] dark:border-[#1a1a2e] py-4 overflow-visible">
      {/* CRITICAL CHANGE ABOVE: 
      1. Added `z-40` to elevate the header layer.
      2. Changed `overflow-hidden` to `overflow-visible`. 
         If the header is set to overflow-hidden, any dropdown hanging out 
         of the bottom boundary will be physically cut off or invisible!
    */}

      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {/* Added pointer-events-none so the background layer never blocks clicks */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00f0ff] via-[#ff00ff] to-[#00ff88] animate-gradient-rotate" />
      </div>

      <div className="relative z-10 flex items-center justify-between px-6">
        <h2 className="text-xl font-bold text-white neon-text">{title}</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <NotificationBadge
              count={unreadCount}
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
              <>
                {/* Overlay Backdrop */}
                <div
                  className="fixed inset-0 z-50"
                  onClick={() => setIsOpen(false)}
                />
                {/* Dropdown Card - Using Tailwind standard z-index classes */}
                <div className="absolute right-0 top-full mt-3 w-80 bg-[#12121a] dark:bg-[#0a0a12] rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.25)] border border-[#2a2a3e] dark:border-[#1a1a2e] z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-[#2a2a3e] dark:border-[#1a1a2e] flex items-center justify-between bg-gradient-to-r from-[#00f0ff]/10 to-[#ff00ff]/10">
                    <h3 className="font-semibold text-white">Notifications</h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-[#00f0ff] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-2">
                    {" "}
                    {/* Marginally reduced padding for nicer scrolling space */}
                    <NotificationList
                      notifications={notifications}
                      onMarkAsRead={handleMarkAsRead}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
