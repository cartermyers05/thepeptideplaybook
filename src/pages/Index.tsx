import { motion, useScroll } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { SEOHead } from "@/components/seo/SEOHead";
import { HomepageSchemas } from "@/components/seo/HomepageSchemas";
import { HomepageHero } from "@/components/landing/HomepageHero";
import { ProblemAgitation } from "@/components/landing/ProblemAgitation";
import { HomepageFeatures } from "@/components/landing/HomepageFeatures";
import { MidPageCTA } from "@/components/landing/MidPageCTA";
import { TrustBar } from "@/components/landing/TrustBar";
import { HomepageComparison } from "@/components/landing/HomepageComparison";
import { HomepageFAQ } from "@/components/landing/HomepageFAQ";
import { HomepageFinalCTA } from "@/components/landing/HomepageFinalCTA";

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
      <div className="min-h-screen bg-[#0a0a0f] pb-20 md:pb-0">
        {/* Scroll progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
          style={{
            scaleX: scrollYProgress,
            background: "linear-gradient(90deg, #06D6A0, #60A5FA, #34D399, #FB7185, #A78BFA)",
          }}
        />
        <Navbar />
        <main>
          <HomepageHero />
          <ProblemAgitation />
          <HomepageFeatures />
          <MidPageCTA />
          <TrustBar />
          <HomepageComparison />
          <HomepageFAQ />
          <HomepageFinalCTA />
        </main>
        <Footer />
        <MobileStickyBar />
      </div>
    </>
  );
};

export default Index;
