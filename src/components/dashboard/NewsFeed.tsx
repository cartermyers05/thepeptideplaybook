import { useState } from "react";
import { motion } from "framer-motion";
import NewsCard, { NewsArticle } from "./NewsCard";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";

// Curated static news for MVP - easy to replace with API later
const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "New Research Reveals BPC-157's Mechanism in Tissue Repair",
    excerpt: "A comprehensive study published in the Journal of Peptide Science explores how BPC-157 promotes angiogenesis and modulates growth factor expression, providing new insights into its healing properties in animal models.",
    source: "Journal of Peptide Science",
    url: "https://pubmed.ncbi.nlm.nih.gov",
    date: "Jan 25, 2025",
    category: "research",
    featured: true,
  },
  {
    id: "2",
    title: "FDA Issues Updated Guidance on Peptide Compound Regulations",
    excerpt: "The FDA has released new guidance documents clarifying the regulatory pathway for peptide-based compounds, affecting both research and clinical applications.",
    source: "FDA.gov",
    url: "https://www.fda.gov",
    date: "Jan 23, 2025",
    category: "regulatory",
  },
  {
    id: "3",
    title: "Phase 2 Trial Results for Novel GLP-1 Agonist Show Promise",
    excerpt: "Clinical trial data demonstrates significant efficacy in metabolic endpoints, with researchers noting favorable safety profiles compared to existing treatments.",
    source: "ClinicalTrials.gov",
    url: "https://clinicaltrials.gov",
    date: "Jan 22, 2025",
    category: "clinical",
  },
  {
    id: "4",
    title: "Major Peptide Manufacturer Announces Quality Control Advances",
    excerpt: "Industry leader introduces enhanced purity testing protocols, setting new standards for peptide synthesis quality assurance and batch consistency.",
    source: "BioSpace",
    url: "https://www.biospace.com",
    date: "Jan 20, 2025",
    category: "industry",
  },
  {
    id: "5",
    title: "Thymosin Beta-4 Research: New Findings on Wound Healing",
    excerpt: "Recent studies in regenerative medicine highlight TB-500's potential role in accelerating tissue regeneration, with particular focus on musculoskeletal applications.",
    source: "Regenerative Medicine Journal",
    url: "https://pubmed.ncbi.nlm.nih.gov",
    date: "Jan 18, 2025",
    category: "research",
  },
  {
    id: "6",
    title: "Growth Hormone Secretagogue Safety Review Published",
    excerpt: "A comprehensive meta-analysis examines the safety profiles of various GH secretagogues including Ipamorelin and GHRP-6, providing valuable data for researchers.",
    source: "Endocrine Reviews",
    url: "https://pubmed.ncbi.nlm.nih.gov",
    date: "Jan 15, 2025",
    category: "clinical",
  },
];

type Category = NewsArticle["category"] | "all";

export default function NewsFeed() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const filteredNews = selectedCategory === "all"
    ? mockNews
    : mockNews.filter((article) => article.category === selectedCategory);

  const featuredArticle = filteredNews.find((a) => a.featured);
  const otherArticles = filteredNews.filter((a) => !a.featured);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4 mb-8"
      >
        <motion.div 
          className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center glow-primary"
          animate={{ 
            boxShadow: [
              "0 0 20px -5px hsl(var(--glow) / 0.4)",
              "0 0 40px -5px hsl(var(--glow) / 0.6)",
              "0 0 20px -5px hsl(var(--glow) / 0.4)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Newspaper className="w-7 h-7 text-primary-foreground" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold">Peptide News & Research</h2>
          <p className="text-sm text-muted-foreground">
            Curated updates from trusted sources
          </p>
        </div>
      </motion.div>

      {/* Category Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {(["all", "research", "clinical", "regulatory", "industry"] as Category[]).map(
          (cat, index) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Button
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={`capitalize ${
                  selectedCategory === cat 
                    ? "bg-gradient-primary hover:opacity-90 glow-primary" 
                    : "glass-panel hover-glow border-0"
                }`}
              >
                {cat === "all" ? "All Stories" : cat}
              </Button>
            </motion.div>
          )
        )}
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Featured Article - spans 2 columns on larger screens */}
        {featuredArticle && (
          <div className="md:col-span-2 lg:row-span-2">
            <NewsCard article={featuredArticle} featured index={0} />
          </div>
        )}

        {/* Other Articles */}
        {otherArticles.map((article, index) => (
          <NewsCard 
            key={article.id} 
            article={article} 
            index={featuredArticle ? index + 1 : index} 
          />
        ))}
      </div>

      {/* Source Attribution */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-muted-foreground text-center mt-10 py-4 border-t border-border/30"
      >
        All articles link to original sources. PeptideGPT does not claim ownership of external content.
      </motion.p>
    </div>
  );
}
