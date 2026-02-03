import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { SocialProof } from "@/components/landing/SocialProof";
import { ChatbotDemo } from "@/components/landing/ChatbotDemo";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhoThisIsFor } from "@/components/landing/WhoThisIsFor";
import { FAQ } from "@/components/landing/FAQ";
import { PricingCTA } from "@/components/landing/PricingCTA";
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
        title="Peptide Playbook | Evidence-Based Peptide Research Library"
        description="Ask anything about peptides. Get instant, research-backed answers from an AI trained on 41+ peptides and 200+ studies. Know FDA status, compare peptides, and understand the science."
        canonical="/"
      />
      <HomepageSchemas />
      <InteractiveBackground variant="hero" className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <SocialProof />
          <ChatbotDemo />
          <ProblemSection />
          <ProductPreview />
          <HowItWorks />
          <WhoThisIsFor />
          <FAQ />
          <PricingCTA />
        </main>
        <Footer />
        
        <FloatingCTA />
        <ExitIntentPopup />
      </InteractiveBackground>
    </>
  );
};

export default Index;
