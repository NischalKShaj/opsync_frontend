import Link from "next/link";
import { BarChart3, Users, Clock, Megaphone, LayoutGrid } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8B5CF6]/3 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/3 rounded-full blur-3xl translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Run your entire organization from{" "}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
                one place
              </span>
              .
            </h1>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl">
              Manage employees, attendance, chat, announcements, leave requests,
              projects and workspaces through a single intelligent platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] rounded-xl hover:opacity-90 transition-opacity text-center"
              >
                Create Organization
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 text-base font-medium text-white border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-center"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="relative order-1 lg:order-2">
            <div className="bg-[#0F1117]/80 backdrop-blur-xl rounded-2xl border border-white/5 p-4 sm:p-6 shadow-2xl">
              {/* Analytics Cards */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-[#09090B]/50 rounded-xl p-3 sm:p-4 border border-white/5">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6] mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    94%
                  </div>
                  <div className="text-xs text-gray-400">Attendance</div>
                </div>
                <div className="bg-[#09090B]/50 rounded-xl p-3 sm:p-4 border border-white/5">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5CF6] mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    247
                  </div>
                  <div className="text-xs text-gray-400">Employees</div>
                </div>
                <div className="bg-[#09090B]/50 rounded-xl p-3 sm:p-4 border border-white/5">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#22D3EE] mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    12
                  </div>
                  <div className="text-xs text-gray-400">Pending</div>
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-[#09090B]/50 rounded-xl p-3 sm:p-4 border border-white/5 mb-3 sm:mb-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-xs sm:text-sm font-medium text-white">
                    Team Members
                  </h3>
                  <span className="text-xs text-gray-400">Online: 89</span>
                </div>
                <div className="flex -space-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] border-2 border-[#0F1117]"
                    />
                  ))}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#09090B] border-2 border-[#0F1117] flex items-center justify-center">
                    <span className="text-xs text-gray-400">+42</span>
                  </div>
                </div>
              </div>

              {/* Recent Announcements */}
              <div className="bg-[#09090B]/50 rounded-xl p-3 sm:p-4 border border-white/5 mb-3 sm:mb-4">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <Megaphone className="w-3 h-3 sm:w-4 sm:h-4 text-[#22D3EE]" />
                  <h3 className="text-xs sm:text-sm font-medium text-white">
                    Announcements
                  </h3>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <div className="text-xs text-gray-400">
                    • Q4 Goals announced
                  </div>
                  <div className="text-xs text-gray-400">
                    • New office opening
                  </div>
                </div>
              </div>

              {/* Workspace Overview */}
              <div className="bg-[#09090B]/50 rounded-xl p-3 sm:p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <LayoutGrid className="w-3 h-3 sm:w-4 sm:h-4 text-[#8B5CF6]" />
                  <h3 className="text-xs sm:text-sm font-medium text-white">
                    Workspaces
                  </h3>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["Engineering", "Design", "Marketing"].map((workspace) => (
                    <span
                      key={workspace}
                      className="px-2 py-1 text-xs text-gray-300 bg-white/5 rounded-md"
                    >
                      {workspace}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#8B5CF6]/10 via-[#3B82F6]/10 to-[#22D3EE]/10 rounded-3xl blur-2xl -z-10 opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}
