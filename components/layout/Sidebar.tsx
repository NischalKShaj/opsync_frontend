"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  MessageSquare,
  Settings,
  LogOut,
  Moon,
  Sun,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: "/dashboard", icon: Building2, label: "Workspaces" },
    { href: "/chat", icon: MessageSquare, label: "Chat" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-72 h-screen bg-[#07070c] border-r border-[#1e1e2f] relative flex flex-col overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(191,0,255,0.12),transparent_40%),radial-gradient(circle_at_bottom,rgba(0,240,255,0.08),transparent_40%)]" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div className="pt-8 pb-6 flex justify-center relative">
          <div className="absolute w-40 h-20 bg-[#ff00ff]/20 blur-3xl" />

          <h1
            className="
      relative
      text-5xl
      font-extrabold
      bg-gradient-to-b
      from-white
      via-[#ff9cff]
      to-[#ff00ff]
      bg-clip-text
      text-transparent
      drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]
    "
          >
            OpSync
          </h1>
        </div>

        {/* Navigation */}
        <nav className="px-4">
          <ul className="space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Card */}
        <div className="px-4 mt-8">
          <div className="bg-white/5 border border-[#2a2a3e] rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-white font-semibold text-sm">{user?.name}</p>

                <p className="text-gray-400 text-xs">{user?.email}</p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Support */}
        {/* Bottom Section */}
        <div className="mt-auto px-5 pb-5">
          {/* Help */}
          <button
            type="button"
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors mb-6 cursor-pointer"
          >
            <HelpCircle className="w-5 h-5" />
            <span>Help & Support</span>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors mb-8 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>

          {/* Theme Card */}
          <div className="border border-[#2a2a3e] rounded-2xl p-3 flex items-center justify-between bg-[#0d0d14]/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-gray-300">
              {theme === "dark" ? (
                <Moon className="w-5 h-5 text-cyan-400" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
              <span>Theme</span>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`
        relative
        w-16
        h-8
        rounded-full
        transition-all
        duration-300
        border
        ${
          theme === "dark"
            ? "bg-[#12121a] border-cyan-400"
            : "bg-[#e5e7eb] border-purple-400"
        }
      `}
            >
              <div
                className={`
          absolute
          top-1
          w-6
          h-6
          rounded-full
          bg-white
          transition-all
          duration-300
          ${
            theme === "dark"
              ? "left-[34px] shadow-[0_0_12px_rgba(0,240,255,0.8)]"
              : "left-1 shadow-[0_0_12px_rgba(191,0,255,0.5)]"
          }
        `}
              />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
