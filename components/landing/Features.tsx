import { Clock, MessageSquare, Calendar, LayoutGrid, Megaphone, Users } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Attendance Management",
    description: "Track employee attendance with check-in/check-out and reports.",
    color: "#3B82F6",
  },
  {
    icon: MessageSquare,
    title: "Team Chat",
    description: "Real-time communication across departments.",
    color: "#22D3EE",
  },
  {
    icon: Calendar,
    title: "Leave Management",
    description: "Apply, approve and monitor leave requests.",
    color: "#8B5CF6",
  },
  {
    icon: LayoutGrid,
    title: "Workspace Management",
    description: "Create collaborative workspaces for every department.",
    color: "#3B82F6",
  },
  {
    icon: Megaphone,
    title: "Announcements",
    description: "Share company-wide and department announcements.",
    color: "#22D3EE",
  },
  {
    icon: Users,
    title: "Employee Directory",
    description: "Manage employees, departments and organizational hierarchy.",
    color: "#8B5CF6",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Everything you need to manage your organization
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Powerful tools designed to streamline your daily operations and boost productivity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-[#0F1117]/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:translate-y-[-4px]"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}10` }}
                >
                  <Icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
