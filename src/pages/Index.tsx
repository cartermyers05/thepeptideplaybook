import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { AgitationSection } from "@/components/landing/AgitationSection";
import { ChatbotDemo } from "@/components/landing/ChatbotDemo";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SocialProof } from "@/components/landing/SocialProof";
import { WhoThisIsFor } from "@/components/landing/WhoThisIsFor";
import { FAQ } from "@/components/landing/FAQ";
import { PricingCTA } from "@/components/landing/PricingCTA";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { HomepageSchemas } from "@/components/seo/HomepageSchemas";

import { ExitIntentPopup } from "@/components/landing/ExitIntentPopup";
import { FloatingCTA } from "@/components/landing/FloatingCTA";

const Index = () => {
  return (
    <>
      <SEOHead
        title="Peptide Playbook AI | The #1 AI Research Assistant for Peptides"
        description="Ask anything about peptides. Get instant, research-backed answers from an AI trained on 41+ peptides and 500+ studies. Know FDA status, compare peptides, and understand the science."
        canonical="/"
      />
      <HomepageSchemas />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <ProblemSection />
          <AgitationSection />
          <ChatbotDemo />
          <SolutionSection />
          <ProductPreview />
          <HowItWorks />
          <SocialProof />
          <WhoThisIsFor />
          <FAQ />
          <PricingCTA />
        </main>
        <Footer />
        
        <FloatingCTA />
        <ExitIntentPopup />
      </div>
    </>
  );
};

export default Index;
