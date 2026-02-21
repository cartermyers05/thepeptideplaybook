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
  { id: "other", label: "Other" },
];

const guides = [
  {
    title: "What Are Peptides? Complete Guide",
    description:
      "Comprehensive guide: how peptides work, all major categories, safety, legal status, and clinical research.",
    href: "/guides/what-are-peptides",
    category: "how-to",
    categoryLabel: "How-To",
    readTime: "25 min",
    lastUpdated: "Feb 6, 2026",
    featured: true,
  },
  {
    title: "BPC-157: Complete Research Guide",
    description:
      "Everything you need to know about BPC-157 — research, safety, and legal status in 2026.",
    href: "/guides/bpc-157-complete-guide",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "12 min",
    lastUpdated: "Jan 28, 2026",
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
  {
    title: "GHK-Cu Peptide: Copper Peptide Research Guide",
    description: "30+ years of research on skin rejuvenation, wound healing, and gene modulation.",
    href: "/guides/ghk-cu-complete-guide",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "18 min",
    lastUpdated: "Feb 6, 2026",
    featured: true,
  },
  {
    title: "GHK-Cu: Topical vs Injectable",
    description: "Comparing local skin benefits vs systemic regenerative effects.",
    href: "/guides/ghk-cu-topical-vs-injectable",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "8 min",
    lastUpdated: "Feb 5, 2026",
  },
  {
    title: "SS-31: Mitochondrial Peptide",
    description: "Elamipretide research for age-related mitochondrial dysfunction and heart failure.",
    href: "/guides/ss-31-peptide",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "10 min",
    lastUpdated: "Feb 5, 2026",
  },
  {
    title: "Melanotan 2 Research Guide",
    description: "Skin pigmentation and photoprotection research. Risks, legality, and alternatives.",
    href: "/guides/melanotan-2",
    category: "other",
    categoryLabel: "Other",
    readTime: "12 min",
    lastUpdated: "Feb 5, 2026",
  },
  {
    title: "HGH Peptides: Complete Breakdown",
    description: "CJC-1295, Ipamorelin, GHRP-6, Sermorelin — mechanisms and stacking protocols.",
    href: "/guides/hgh-peptides",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "15 min",
    lastUpdated: "Feb 5, 2026",
  },
  {
    title: "Epitalon: The Telomere Peptide",
    description: "Telomerase activation research by Dr. Khavinson. Longevity claims vs evidence.",
    href: "/guides/epitalon-peptide",
    category: "other",
    categoryLabel: "Other",
    readTime: "10 min",
    lastUpdated: "Feb 5, 2026",
  },
  {
    title: "Best Peptides for Weight Loss (2026)",
    description: "Semaglutide, Tirzepatide, AOD-9604, MOTS-c — efficacy comparison.",
    href: "/guides/best-peptides-weight-loss",
    category: "weight-loss",
    categoryLabel: "Weight Loss",
    readTime: "13 min",
    lastUpdated: "Feb 5, 2026",
  },
  {
    title: "Best Peptides for Muscle Growth & Muscle Building",
    description: "GH secretagogues, IGF-1 variants, and muscle building peptides for body composition.",
    href: "/guides/best-peptides-muscle-growth",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "12 min",
    lastUpdated: "Feb 6, 2026",
  },
  {
    title: "TB-500: Complete Research Guide",
    description: "Thymosin Beta-4 for wound healing, tissue repair, and cardiac research.",
    href: "/guides/tb-500-research-guide",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "11 min",
    lastUpdated: "Feb 5, 2026",
  },
  {
    title: "NAD Peptides Explained",
    description: "NAD+ precursors and peptides for cellular energy and longevity research.",
    href: "/guides/nad-peptides",
    category: "other",
    categoryLabel: "Other",
    readTime: "9 min",
    lastUpdated: "Feb 5, 2026",
  },
  {
    title: "VIP Peptide Research Guide",
    description: "Vasoactive Intestinal Peptide for CIRS, mold illness, and immune regulation.",
    href: "/guides/vip-peptide",
    category: "other",
    categoryLabel: "Other",
    readTime: "8 min",
    lastUpdated: "Feb 5, 2026",
  },
  {
    title: "Peptide Reconstitution Guide",
    description: "Step-by-step: BAC water, dosing calculations, storage, and common mistakes.",
    href: "/guides/peptide-reconstitution",
    category: "how-to",
    categoryLabel: "How-To",
    readTime: "10 min",
    lastUpdated: "Feb 5, 2026",
  },
  {
    title: "Peptides for Beginners",
    description: "What peptides are, categories, safety basics, and how to evaluate research.",
    href: "/guides/peptides-for-beginners",
    category: "how-to",
    categoryLabel: "How-To",
    readTime: "14 min",
    lastUpdated: "Feb 5, 2026",
  },
  {
    title: "IGF-1 Peptide Research Guide",
    description: "IGF-1 LR3, DES, and MGF — muscle growth mechanisms and safety concerns.",
    href: "/guides/igf-1-peptide",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "11 min",
    lastUpdated: "Feb 5, 2026",
  },
  {
    title: "HGH Fragment 176-191 Guide",
    description: "AOD-9604 for targeted fat loss without HGH's metabolic side effects.",
    href: "/guides/hgh-fragment",
    category: "weight-loss",
    categoryLabel: "Weight Loss",
    readTime: "10 min",
    lastUpdated: "Feb 5, 2026",
  },
  {
    title: "Are Peptides Legal?",
    description: "Legal status of peptides in the US, UK, and Australia. Research use vs prescription.",
    href: "/guides/are-peptides-legal",
    category: "safety",
    categoryLabel: "Safety & Legal",
    readTime: "8 min",
    lastUpdated: "Feb 12, 2026",
  },
  {
    title: "BPC-157 for Gut Healing",
    description: "Research on BPC-157's gastroprotective effects and gut barrier repair.",
    href: "/guides/bpc-157-gut-healing",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "10 min",
    lastUpdated: "Feb 12, 2026",
  },
  {
    title: "BPC-157 Side Effects",
    description: "Known and reported side effects from animal studies and anecdotal human reports.",
    href: "/guides/bpc-157-side-effects",
    category: "safety",
    categoryLabel: "Safety & Legal",
    readTime: "7 min",
    lastUpdated: "Feb 12, 2026",
  },
  {
    title: "BPC-157 for Tendonitis",
    description: "Research on tendon repair, collagen synthesis, and recovery timelines.",
    href: "/guides/bpc-157-tendonitis",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "9 min",
    lastUpdated: "Feb 12, 2026",
  },
  {
    title: "Is BPC-157 WADA Banned?",
    description: "WADA prohibited list status, detection windows, and athlete implications.",
    href: "/guides/bpc-157-wada-banned",
    category: "safety",
    categoryLabel: "Safety & Legal",
    readTime: "6 min",
    lastUpdated: "Feb 12, 2026",
  },
  {
    title: "How to Find a Peptide Clinic",
    description: "What to look for in a peptide clinic, red flags, and questions to ask.",
    href: "/guides/find-peptide-clinic",
    category: "how-to",
    categoryLabel: "How-To",
    readTime: "8 min",
    lastUpdated: "Feb 12, 2026",
  },
  {
    title: "GHK-Cu for Hair Loss",
    description: "Copper peptide research for hair follicle stimulation and scalp health.",
    href: "/guides/ghk-cu-hair-loss",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "9 min",
    lastUpdated: "Feb 12, 2026",
  },
  {
    title: "Ipamorelin + CJC-1295 Stack",
    description: "Growth hormone secretagogue stack: synergy, dosing, and timing protocols.",
    href: "/guides/ipamorelin-cjc-1295",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "11 min",
    lastUpdated: "Feb 12, 2026",
  },
  {
    title: "Oral vs Injectable BPC-157",
    description: "Bioavailability comparison, research on oral peptide delivery, and practical considerations.",
    href: "/guides/oral-vs-injectable-bpc-157",
    category: "how-to",
    categoryLabel: "How-To",
    readTime: "8 min",
    lastUpdated: "Feb 12, 2026",
  },
  {
    title: "Peptide Cycling Guide",
    description: "When to cycle peptides, receptor desensitization, and protocol scheduling.",
    href: "/guides/peptide-cycling",
    category: "how-to",
    categoryLabel: "How-To",
    readTime: "9 min",
    lastUpdated: "Feb 12, 2026",
  },
  {
    title: "Peptide Injection Sites Guide",
    description: "Subcutaneous injection sites, rotation schedules, and technique best practices.",
    href: "/guides/peptide-injection-sites",
    category: "how-to",
    categoryLabel: "How-To",
    readTime: "8 min",
    lastUpdated: "Feb 12, 2026",
  },
  {
    title: "Peptide Quality Testing",
    description: "HPLC, mass spec, and third-party testing. How to verify peptide purity.",
    href: "/guides/peptide-quality-testing",
    category: "how-to",
    categoryLabel: "How-To",
    readTime: "10 min",
    lastUpdated: "Feb 12, 2026",
  },
  {
    title: "Semaglutide vs Tirzepatide for Weight Loss",
    description: "Head-to-head clinical trial data on weight loss outcomes, side effects, and cost.",
    href: "/guides/semaglutide-vs-tirzepatide-weight-loss",
    category: "weight-loss",
    categoryLabel: "Weight Loss",
    readTime: "12 min",
    lastUpdated: "Feb 12, 2026",
  },
  {
    title: "TB-500 for Tendon Repair",
    description: "Thymosin Beta-4 research on tendon healing, collagen remodeling, and recovery.",
    href: "/guides/tb-500-tendon-repair",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "9 min",
    lastUpdated: "Feb 12, 2026",
  },
  {
    title: "TB-500 vs BPC-157: Which Is Better?",
    description: "Mechanism comparison, stacking considerations, and when to use each peptide.",
    href: "/guides/tb-500-vs-bpc-157",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    readTime: "10 min",
    lastUpdated: "Feb 12, 2026",
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
        title="Peptide Research Library — Evidence-Based Guides | Peptide Playbook"
        description="Browse 50+ evidence-based peptide guides. Research ratings, dosing data, and legal status for semaglutide, BPC-157, tirzepatide, GHK-Cu, and more."
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
