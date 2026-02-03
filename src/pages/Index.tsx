import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { WhatsInsideSection } from "@/components/landing/WhatsInsideSection";
import { GoalSelectionSection } from "@/components/landing/GoalSelectionSection";
import { PricingCTA } from "@/components/landing/PricingCTA";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { HomepageSchemas } from "@/components/seo/HomepageSchemas";

const Index = () => {
  return (
    <>
      <SEOHead
        title="The First AI-Powered Peptide Course | Peptide Playbook"
        description="Not a generic course. Not a chatbot. A complete program built around YOUR goal — with day-by-day guidance through your first peptide cycle. $99 one-time."
        canonical="/"
      />
      <HomepageSchemas />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <HowItWorksSection />
          <WhatsInsideSection />
          <GoalSelectionSection />
          <PricingCTA />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
