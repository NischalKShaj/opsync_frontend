"use client";

import { useState, useRef, useEffect } from "react";
import { X, Plus, Bell, Search } from "lucide-react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (notificationIds: string[]) => {
    onMarkAsRead?.(notificationIds);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // Updated background and border to seamlessly blend into your deep layout dashboard canvas
    <header className="relative z-50 bg-[#0f0f1a] border-b border-[#1a1a2e] py-3 overflow-visible font-sans w-full">
      <div className="relative z-10 flex items-center justify-between px-8 h-14">
        {/* Left Side: Empty or breadcrumbs because your main page body handles the "Dashboard" h1 view */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-white">{title}</h1>

          <p className="text-gray-400 text-sm">Welcome back, Test User 👋</p>
        </div>
        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Search Box Input with Keyboard Shortcut Asset */}
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search workspaces..."
              className="
                w-64
                h-10
                rounded-lg
                bg-[#0d0d14]/80
                border
                border-[#1b1b26]
                pl-10
                pr-12
                text-xs
                text-gray-200
                placeholder:text-gray-500
                focus:outline-none
                focus:border-[#00f0ff]/50
                transition-all
              "
            />
            {/* ⌘K Shortcut Indicator Box */}
            <div className="absolute right-2.5 px-1.5 py-0.5 rounded border border-[#222230] bg-[#11111a] text-[10px] text-gray-500 font-mono pointer-events-none select-none">
              ⌘K
            </div>
          </div>

          {/* Notification Bell wrapper button */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                relative
                w-10
                h-10
                rounded-xl
                bg-[#0d0d14]/80
                border
                flex
                items-center
                justify-center
                transition-all]
                cursor-pointer
                ${isOpen ? "border-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.2)]" : "border-[#1b1b26] hover:border-[#bf00ff]"}
              `}
            >
              <Bell className="w-4 h-4 text-gray-400" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-4.5 px-1 rounded-full bg-[#ec4899] text-[9px] font-bold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Overlay panel */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-[#1e1e2f] bg-[#07070c] shadow-[0_10px_30px_rgba(0,0,0,0.6)] p-4 z-50 filter drop-shadow-[0_0_15px_rgba(191,0,255,0.1)]">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1e1e2f]">
                  <span className="text-sm font-semibold text-white">
                    Notifications
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <NotificationList
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                />
              </div>
            )}
          </div>

          {/* Action Button: Matches the gradient neon border style layout from Image 1 */}
          <button
            className="
    flex
    items-center
    gap-2
    h-12
    px-7
    rounded-xl
    bg-gradient-to-r
    from-[#c026d3]
    via-[#9333ea]
    to-[#00f0ff]
    text-white
    font-medium
    shadow-[0_0_20px_rgba(0,240,255,0.25)]
    hover:shadow-[0_0_30px_rgba(191,0,255,0.4)]
    transition-all
    duration-300
    cursor-pointer
  "
          >
            <Plus className="w-4 h-4" />
            Create {title}
          </button>
        </div>
      </div>
    </header>
  );
}
