import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { GuideCard } from "@/components/guides/GuideCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const guides = [
  {
    title: "BPC-157: Complete Research Guide",
    description:
      "Everything you need to know about BPC-157 — research, safety, and legal status in 2026.",
    href: "/guides/bpc-157-complete-guide",
  },
  {
    title: "FDA Peptide Regulations 2026",
    description:
      "Which peptides are legal, banned, or in regulatory limbo. Complete breakdown.",
    href: "/guides/peptides-fda-legal-status-2026",
  },
  {
    title: "Are Peptides Safe?",
    description:
      "Honest breakdown of what the research shows and what we still don't know.",
    href: "/guides/are-peptides-safe",
  },
  {
    title: "BPC-157 vs TB-500",
    description:
      "Different mechanisms, same regulatory status. What the evidence actually shows.",
    href: "/guides/bpc-157-vs-tb-500",
  },
  {
    title: "Semaglutide Complete Guide",
    description:
      "FDA-approved GLP-1 medication. Clinical trials, side effects, costs, and compounding controversy.",
    href: "/guides/semaglutide-complete-guide",
  },
  {
    title: "Tirzepatide vs Semaglutide",
    description:
      "Head-to-head comparison. Which GLP-1 medication produces better weight loss results?",
    href: "/guides/tirzepatide-vs-semaglutide",
  },
  {
    title: "Growth Hormone Peptides Guide",
    description:
      "Sermorelin, ipamorelin, CJC-1295, GHRP-2/6. Mechanisms, research, and regulatory status.",
    href: "/guides/growth-hormone-peptides-guide",
  },
];

export default function Guides() {
  return (
    <>
      <SEOHead
        title="Peptide Guides"
        description="Evidence-based peptide guides. No hype. No sales pitch. Just research on BPC-157, TB-500, FDA regulations, and safety."
        canonical="/guides"
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1 pt-24 pb-16">
          <div className="container px-4 max-w-4xl mx-auto">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Peptide Guides
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Evidence-based information on peptides. No hype. No sales pitch.
                Just research.
              </p>
            </motion.div>

            {/* Guide Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {guides.map((guide, index) => (
                <GuideCard
                  key={guide.href}
                  title={guide.title}
                  description={guide.description}
                  href={guide.href}
                  index={index}
                />
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center py-10 px-6 glass-card-subtle rounded-xl"
            >
              <h2 className="text-2xl font-bold mb-3">Have Specific Questions?</h2>
              <p className="text-muted-foreground mb-6">
                Try our AI assistant — it's free.
              </p>
              <Link to="/">
                <Button className="btn-primary-clean gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Ask the Peptide Assistant
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
