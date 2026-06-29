import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-[#8B5CF6]/10 via-[#3B82F6]/10 to-[#22D3EE]/10 rounded-3xl p-12 lg:p-16 border border-white/5 relative overflow-hidden">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 via-transparent to-[#22D3EE]/5" />
          
          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to organize your workplace?
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Join thousands of organizations already using OpSync to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] rounded-xl hover:opacity-90 transition-opacity"
              >
                Create Organization
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 text-base font-medium text-white border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
