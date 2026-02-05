import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { GuideCardEnhanced } from "@/components/guides/GuideCardEnhanced";
import { SearchBar } from "@/components/guides/SearchBar";
import { CategoryFilter } from "@/components/guides/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const categories = [
  { id: "all", label: "All Guides" },
  { id: "recovery", label: "Recovery & Healing" },
  { id: "weight-loss", label: "Weight Loss" },
  { id: "safety", label: "Safety & Legal" },
  { id: "how-to", label: "How-To" },
];

const guides = [
  {
    title: "BPC-157: Complete Research Guide",
    description:
      "Everything you need to know about BPC-157 — research, safety, and legal status in 2026.",
    href: "/guides/bpc-157-complete-guide",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "12 min",
    lastUpdated: "Jan 28, 2026",
    featured: true,
  },
  {
    title: "FDA Peptide Regulations 2026",
    description:
      "Which peptides are legal, banned, or in regulatory limbo. Complete breakdown.",
    href: "/guides/peptides-fda-legal-status-2026",
    category: "safety",
    categoryLabel: "Safety & Legal",
    readTime: "8 min",
    lastUpdated: "Jan 25, 2026",
  },
  {
    title: "Are Peptides Safe?",
    description:
      "Honest breakdown of what the research shows and what we still don't know.",
    href: "/guides/are-peptides-safe",
    category: "safety",
    categoryLabel: "Safety & Legal",
    readTime: "10 min",
    lastUpdated: "Jan 20, 2026",
  },
  {
    title: "BPC-157 vs TB-500",
    description:
      "Different mechanisms, same regulatory status. What the evidence actually shows.",
    href: "/guides/bpc-157-vs-tb-500",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "9 min",
    lastUpdated: "Jan 18, 2026",
  },
  {
    title: "Semaglutide Complete Guide",
    description:
      "FDA-approved GLP-1 medication. Clinical trials, side effects, costs, and compounding controversy.",
    href: "/guides/semaglutide-complete-guide",
    category: "weight-loss",
    categoryLabel: "Weight Loss",
    readTime: "15 min",
    lastUpdated: "Jan 22, 2026",
  },
  {
    title: "Tirzepatide vs Semaglutide",
    description:
      "Head-to-head comparison. Which GLP-1 medication produces better weight loss results?",
    href: "/guides/tirzepatide-vs-semaglutide",
    category: "weight-loss",
    categoryLabel: "Weight Loss",
    readTime: "11 min",
    lastUpdated: "Jan 15, 2026",
  },
  {
    title: "Growth Hormone Peptides Guide",
    description:
      "Sermorelin, ipamorelin, CJC-1295, GHRP-2/6. Mechanisms, research, and regulatory status.",
    href: "/guides/growth-hormone-peptides-guide",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "14 min",
    lastUpdated: "Jan 12, 2026",
  },
  {
    title: "BPC-157 Cancer Risk",
    description:
      "Angiogenesis concerns explained. What we know and don't know about cancer risk.",
    href: "/guides/bpc-157-cancer-risk",
    category: "safety",
    categoryLabel: "Safety & Legal",
    readTime: "7 min",
    lastUpdated: "Jan 10, 2026",
  },
  {
    title: "BPC-157 Drug Test Detection",
    description:
      "WADA bans it, but employment tests don't check. Complete detection guide.",
    href: "/guides/bpc-157-drug-test",
    category: "safety",
    categoryLabel: "Safety & Legal",
    readTime: "6 min",
    lastUpdated: "Jan 8, 2026",
  },
  {
    title: "BPC-157 Injection Infections",
    description:
      "Harm reduction: signs of infection, when to seek care, and contamination risks.",
    href: "/guides/bpc-157-infection-risk",
    category: "how-to",
    categoryLabel: "How-To",
    readTime: "8 min",
    lastUpdated: "Jan 5, 2026",
  },
  {
    title: "TB-500 Side Effects",
    description:
      "Almost no human data exists. What animal studies and anecdotal reports show.",
    href: "/guides/tb-500-side-effects",
    category: "safety",
    categoryLabel: "Safety & Legal",
    readTime: "7 min",
    lastUpdated: "Jan 3, 2026",
  },
  {
    title: "CJC-1295 Safety",
    description:
      "FDA concerns about GH secretagogues. Known side effects and unknowns.",
    href: "/guides/cjc-1295-safety",
    category: "safety",
    categoryLabel: "Safety & Legal",
    readTime: "6 min",
    lastUpdated: "Dec 28, 2025",
  },
  {
    title: "Verify Peptide COA",
    description:
      "HPLC and mass spectrometry explained. Red flags and what legitimate COAs include.",
    href: "/guides/verify-peptide-coa",
    category: "how-to",
    categoryLabel: "How-To",
    readTime: "9 min",
    lastUpdated: "Dec 25, 2025",
  },
  {
    title: "Peptide Contamination Risks",
    description:
      "Why contamination is common in unregulated peptides and how to reduce risk.",
    href: "/guides/peptide-contamination",
    category: "safety",
    categoryLabel: "Safety & Legal",
    readTime: "8 min",
    lastUpdated: "Dec 22, 2025",
  },
  {
    title: "Peptide TikTok Myths",
    description:
      "Fact-checking viral claims about wolverine healing, safety, and Big Pharma conspiracies.",
    href: "/guides/peptide-tiktok-myths",
    category: "safety",
    categoryLabel: "Safety & Legal",
    readTime: "10 min",
    lastUpdated: "Dec 20, 2025",
  },
];

export default function Guides() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      const matchesSearch =
        searchQuery === "" ||
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || guide.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredGuide = guides.find((g) => g.featured);
  const regularGuides = filteredGuides.filter((g) => !g.featured);

  return (
    <>
      <SEOHead
        title="Peptide Research Guides | Evidence-Based Information"
        description="Evidence-based peptide guides. No hype. No sales pitch. Just research on BPC-157, TB-500, Semaglutide, FDA regulations, and safety."
        canonical="/guides"
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1 pt-24 pb-16">
          <div className="container px-4 max-w-5xl mx-auto">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Peptide Research Library
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {guides.length} evidence-based guides. No hype. No sales pitch. Just research.
              </p>

              {/* Search */}
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-10"
            >
              <CategoryFilter
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </motion.div>

            {/* Featured Guide */}
            {selectedCategory === "all" && searchQuery === "" && featuredGuide && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mb-8"
              >
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Featured Guide
                </p>
                <GuideCardEnhanced {...featuredGuide} featured />
              </motion.div>
            )}

            {/* Guide Cards Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6 mb-16"
            >
              {regularGuides.map((guide, index) => (
                <motion.div
                  key={guide.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                >
                  <GuideCardEnhanced {...guide} />
                </motion.div>
              ))}
            </motion.div>

            {filteredGuides.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No guides found matching your search.
                </p>
              </div>
            )}

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center py-10 px-6 content-card"
            >
              <h2 className="text-2xl font-bold mb-3">Have Specific Questions?</h2>
              <p className="text-muted-foreground mb-6">
                Try our AI assistant — it's trained on all our research.
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
