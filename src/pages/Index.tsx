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
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { SEOHead } from "@/components/seo/SEOHead";
import { HomepageSchemas } from "@/components/seo/HomepageSchemas";
import { ExitIntentPopup } from "@/components/landing/ExitIntentPopup";
import { TestimonialStrip } from "@/components/landing/TestimonialStrip";
import { RecentJoinToast } from "@/components/landing/RecentJoinToast";

const Index = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <SEOHead
        title="Peptide Playbook — AI-Powered Peptide Research Education"
        description="Understand peptides with an AI research coach trained on 500+ peer-reviewed studies. Evidence ratings, safety profiles, doctor conversation scripts for 41+ peptides. $67 one-time."
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
          <TestimonialStrip />
          <WhoThisIsForNew />
          <PricingCTA />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
        <p className="text-center text-xs text-muted-foreground py-4">QA audit completed 2026-02-23</p>
        <MobileStickyBar />
        <ExitIntentPopup />
        <RecentJoinToast />
      </div>
    </>
  );
};

export default Index;
