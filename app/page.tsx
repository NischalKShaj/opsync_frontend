import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { WhyOpSync } from "@/components/landing/WhyOpSync";
import { AppPreview } from "@/components/landing/AppPreview";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090B]">
      <Navbar />
      <Hero />
      <Features />
      <WhyOpSync />
      <AppPreview />
      <CTA />
      <Footer />
    </div>
  );
}
