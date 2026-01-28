import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { WhatsIncluded } from "@/components/landing/WhatsIncluded";
import { AIAssistant } from "@/components/landing/AIAssistant";
import { SocialProof } from "@/components/landing/SocialProof";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <WhatsIncluded />
        <AIAssistant />
        <SocialProof />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
