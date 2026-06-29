import { Layers, Shield, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Layers,
    title: "One Platform",
    description: "Everything needed for an organization in one application.",
    color: "#8B5CF6",
  },
  {
    icon: Shield,
    title: "Role Based Access",
    description: "Different experiences for executives, managers and employees.",
    color: "#3B82F6",
  },
  {
    icon: TrendingUp,
    title: "Built for Scale",
    description: "Designed to support startups as well as large organizations.",
    color: "#22D3EE",
  },
];

export function WhyOpSync() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#0F1117]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Why OpSync?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Built for modern organizations that need efficiency, security, and scalability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-[#0F1117]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${benefit.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: benefit.color }} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
