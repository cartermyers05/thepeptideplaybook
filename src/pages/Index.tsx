import { UrgencyBanner } from "@/components/landing/UrgencyBanner";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { WhatsIncluded } from "@/components/landing/WhatsIncluded";
import { WhoThisIsFor } from "@/components/landing/WhoThisIsFor";
import { SocialProof } from "@/components/landing/SocialProof";
import { WhyIMadeThis } from "@/components/landing/WhyIMadeThis";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <UrgencyBanner />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <WhatsIncluded />
        <WhoThisIsFor />
        <SocialProof />
        <WhyIMadeThis />
        <section id="faq">
          <FAQ />
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
