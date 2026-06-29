import { BarChart3, Clock, MessageSquare, Calendar } from "lucide-react";

const previews = [
  {
    icon: BarChart3,
    title: "Dashboard",
    color: "#8B5CF6",
    description: "Overview of all organizational metrics",
  },
  {
    icon: Clock,
    title: "Attendance",
    color: "#3B82F6",
    description: "Track employee check-in/check-out",
  },
  {
    icon: MessageSquare,
    title: "Chat",
    color: "#22D3EE",
    description: "Real-time team communication",
  },
  {
    icon: Calendar,
    title: "Leave Management",
    color: "#8B5CF6",
    description: "Manage leave requests and approvals",
  },
];

export function AppPreview() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            See OpSync in action
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A glimpse into the powerful features that transform how organizations operate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {previews.map((preview, index) => {
            const Icon = preview.icon;
            return (
              <div
                key={index}
                className="group relative bg-[#0F1117]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:translate-y-[-8px]"
              >
                {/* Floating glass effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#8B5CF6]/5 via-[#3B82F6]/5 to-[#22D3EE]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${preview.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: preview.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {preview.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {preview.description}
                  </p>
                  
                  {/* Mockup preview */}
                  <div className="mt-4 h-32 bg-[#09090B]/50 rounded-lg border border-white/5 p-3">
                    <div className="space-y-2">
                      <div className="h-2 bg-white/5 rounded w-3/4" />
                      <div className="h-2 bg-white/5 rounded w-1/2" />
                      <div className="h-2 bg-white/5 rounded w-2/3" />
                      <div className="h-2 bg-white/5 rounded w-1/3" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
