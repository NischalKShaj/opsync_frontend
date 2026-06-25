import { ReactNode } from "react";
import Image from "next/image";
import { MessageSquare, FileText, Calendar, CheckSquare } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-[#09090B] relative overflow-hidden">
      {/* Premium Radial Gradients Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top Left - Soft Cyan */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#22D3EE]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        {/* Center - Purple */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        {/* Bottom Right - Blue */}
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#3B82F6]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 flex w-full">
        {/* Left Section - Premium Hero */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-16 relative">
          <div className="max-w-xl space-y-10">
            {/* Logo and Branding */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/login_signupPageLogo.png"
                  alt="OpSync Logo"
                  width={56}
                  height={56}
                  className="object-contain"
                />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent tracking-tight">
                  OpSync
                </h1>
              </div>
              <h2 className="text-2xl font-semibold text-gray-200">
                Your team&apos;s workspace, communication hub, and people
                management platform—all in one place.
              </h2>
              <p className="text-base text-gray-400 leading-relaxed max-w-lg">
                Bring conversations, documentation, projects, attendance, leave
                management, calendars, and company updates together in a single,
                secure workspace designed for modern organizations.
              </p>
            </div>

            {/* Feature Highlight Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0F1117]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/5 hover:border-[#22D3EE]/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-[#22D3EE] mb-3" />
                <h3 className="text-white font-semibold mb-1">
                  Real-time Team Chat
                </h3>
                <p className="text-sm text-gray-400">
                  Instant messaging with your team
                </p>
              </div>
              <div className="bg-[#0F1117]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/5 hover:border-[#8B5CF6]/20 transition-colors">
                <FileText className="w-6 h-6 text-[#8B5CF6] mb-3" />
                <h3 className="text-white font-semibold mb-1">
                  Collaborative Notes
                </h3>
                <p className="text-sm text-gray-400">
                  Knowledge base & documentation
                </p>
              </div>
              <div className="bg-[#0F1117]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/5 hover:border-[#3B82F6]/20 transition-colors">
                <Calendar className="w-6 h-6 text-[#3B82F6] mb-3" />
                <h3 className="text-white font-semibold mb-1">
                  Attendance & Leave
                </h3>
                <p className="text-sm text-gray-400">
                  Company calendar management
                </p>
              </div>
              <div className="bg-[#0F1117]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/5 hover:border-[#22D3EE]/20 transition-colors">
                <CheckSquare className="w-6 h-6 text-[#22D3EE] mb-3" />
                <h3 className="text-white font-semibold mb-1">
                  Projects & Tasks
                </h3>
                <p className="text-sm text-gray-400">
                  Team collaboration tools
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Premium Glass Card */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <div className="bg-[#0F1117]/75 backdrop-blur-xl rounded-2xl border border-white/5 shadow-[0_0_40px_rgba(34,211,238,0.1)] p-8 relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-gray-400 text-base leading-relaxed">
                      {subtitle}
                    </p>
                  )}
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
