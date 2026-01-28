import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { WhatsIncluded } from "@/components/landing/WhatsIncluded";
import { AIAssistant } from "@/components/landing/AIAssistant";
import { SocialProof } from "@/components/landing/SocialProof";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { HomepageSchemas } from "@/components/seo/HomepageSchemas";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";

const Index = () => {
  return (
    <>
      <SEOHead
        title="Peptide Playbook — The Research-Based Guide to Understanding Peptides"
        description="Stop taking peptide advice from TikTok. Get the research-based guide covering BPC-157, semaglutide, TB-500 and more. Know what's FDA-approved, what's experimental, and what to ask your doctor."
      />
      <HomepageSchemas />
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
        <FloatingChatButton />
      </div>
    </>
  );
};

export default Index;
