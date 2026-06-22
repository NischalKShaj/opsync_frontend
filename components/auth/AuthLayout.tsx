import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] dark:bg-[#050508] px-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00f0ff] via-[#ff00ff] to-[#00ff88] animate-gradient-rotate" />
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div className="bg-[#12121a] dark:bg-[#0a0a12] rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.2)] border border-[#2a2a3e] dark:border-[#1a1a2e] p-8 relative overflow-hidden">
          {/* Animated gradient border */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00f0ff]/20 via-[#ff00ff]/20 to-[#00ff88]/20 animate-gradient-rotate" />
          </div>

          <div className="relative z-10 text-center mb-8">
            <h1 className="text-3xl font-bold text-white neon-text">{title}</h1>
            {subtitle && <p className="mt-2 text-gray-400">{subtitle}</p>}
          </div>
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
