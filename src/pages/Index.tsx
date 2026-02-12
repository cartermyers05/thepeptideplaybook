import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { GuidedDemo } from "@/components/landing/GuidedDemo";
import { WhatsInsideSection } from "@/components/landing/WhatsInsideSection";
import { WhoThisIsForNew } from "@/components/landing/WhoThisIsForNew";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PricingCTA } from "@/components/landing/PricingCTA";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { FloatingCTA } from "@/components/landing/FloatingCTA";
import { SEOHead } from "@/components/seo/SEOHead";
import { HomepageSchemas } from "@/components/seo/HomepageSchemas";

const Index = () => {
  return (
    <>
      <SEOHead
        title="Peptide Playbook — Personalized, Research-Backed Peptide Protocols"
        description="Stop guessing about peptides. Take a 60-second quiz and get a personalized, research-backed protocol matched to your goals. Based on 500+ peer-reviewed studies."
        canonical="/"
      />
      <HomepageSchemas />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <GuidedDemo />
          <WhatsInsideSection />
          <WhoThisIsForNew />
          <HowItWorksSection />
          <PricingCTA />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </>
  );
};

export default Index;
