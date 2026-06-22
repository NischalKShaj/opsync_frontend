"use client";

import { Bell } from "lucide-react";

interface NotificationBadgeProps {
  count: number;
  onClick: () => void;
}

export function NotificationBadge({ count, onClick }: NotificationBadgeProps) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 group"
    >
      <Bell className="w-5 h-5 text-gray-300 group-hover:text-[#00f0ff] transition-colors" />
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-linear-to-r from-[#ff0055] to-[#ff0088] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-[0_0_10px_rgba(255,0,85,0.5)] animate-pulse">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
