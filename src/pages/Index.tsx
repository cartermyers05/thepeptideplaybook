import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
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
  const { scrollYProgress } = useScroll();

  return (
    <>
      <SEOHead
        title="Peptide Playbook — Research-Based Peptide Protocols Matched to Your Goal"
        description="Take the free quiz and get a personalized peptide protocol backed by 500+ peer-reviewed studies. Covers semaglutide, BPC-157, tirzepatide, and more."
        canonical="/"
      />
      <HomepageSchemas />
      <div className="min-h-screen bg-background">
        {/* Scroll progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
          style={{
            scaleX: scrollYProgress,
            background: "linear-gradient(90deg, hsl(var(--primary)), #60A5FA, #34D399, #FB7185, #A78BFA)",
          }}
        />
        <Navbar />
        <main>
          <HeroSection />
          <HowItWorksSection />
          <WhatsInsideSection />
          <GuidedDemo />
          <PricingCTA />
          <WhoThisIsForNew />
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
