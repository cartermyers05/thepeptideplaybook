import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { CourseFeatures } from "@/components/landing/CourseFeatures";
import { CurriculumSection } from "@/components/landing/CurriculumSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { PricingCTA } from "@/components/landing/PricingCTA";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { HomepageSchemas } from "@/components/seo/HomepageSchemas";
import { InteractiveBackground } from "@/components/landing/InteractiveBackground";

import { ExitIntentPopup } from "@/components/landing/ExitIntentPopup";
import { FloatingCTA } from "@/components/landing/FloatingCTA";

const Index = () => {
  return (
    <>
      <SEOHead
        title="The $2,000 Peptide Course for $29 | Peptide Playbook"
        description="Personalized peptide protocols, step-by-step guidance, and 24/7 AI coaching. Everything expensive courses offer, for the price of a protein tub."
        canonical="/"
      />
      <HomepageSchemas />
      <InteractiveBackground variant="hero" className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <ProblemSection />
          <CourseFeatures />
          <CurriculumSection />
          <ComparisonSection />
          <PricingCTA />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
        
        <FloatingCTA />
        <ExitIntentPopup />
      </InteractiveBackground>
    </>
  );
};

export default Index;
