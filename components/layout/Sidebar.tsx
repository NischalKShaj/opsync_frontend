"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, MessageSquare, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { href: "/dashboard", icon: Building2, label: "Workspaces" },
    { href: "/chat", icon: MessageSquare, label: "Chat" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 bg-[#0f0f1a] dark:bg-[#080810] border-r border-[#2a2a3e] dark:border-[#1a1a2e] h-screen flex flex-col relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00f0ff] via-[#ff00ff] to-[#00ff88] animate-gradient-rotate" />
      </div>

      <div className="relative z-10">
        <div className="p-6 border-b border-[#2a2a3e] dark:border-[#1a1a2e]">
          <h1 className="text-2xl font-bold text-white neon-text">OpSync</h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#00f0ff]/20 to-[#ff00ff]/20 text-[#00f0ff] border border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                        : "text-gray-400 hover:text-white hover:bg-white/5 hover:border hover:border-[#00f0ff]/30"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-[#2a2a3e] dark:border-[#1a1a2e]">
          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-white/5 border border-[#2a2a3e]">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00f0ff] to-[#ff00ff] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.5)]">
              <span className="text-black font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 hover:border hover:border-[#ff0055]/50 rounded-lg w-full transition-all duration-300 border border-transparent"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
