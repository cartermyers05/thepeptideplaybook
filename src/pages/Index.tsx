import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsBar } from "@/components/landing/StatsBar";
import { GuidedDemo } from "@/components/landing/GuidedDemo";
import { WhatsInsideSection } from "@/components/landing/WhatsInsideSection";
import { ConversationPreviews } from "@/components/landing/ConversationPreviews";
import { WhoThisIsForNew } from "@/components/landing/WhoThisIsForNew";
import { PricingCTA } from "@/components/landing/PricingCTA";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { HomepageSchemas } from "@/components/seo/HomepageSchemas";

const Index = () => {
  return (
    <>
      <SEOHead
        title="Stop Guessing About Peptides | Peptide Playbook"
        description="Ask any peptide question. Get answers backed by 500+ real studies. No bro-science. No TikTok hype. $67 one-time, lifetime access."
        canonical="/"
      />
      <HomepageSchemas />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <StatsBar />
          <GuidedDemo />
          <WhatsInsideSection />
          <ConversationPreviews />
          <WhoThisIsForNew />
          <PricingCTA />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
