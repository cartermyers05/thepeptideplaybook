import { useState } from "react";
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
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
          <Newspaper className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Peptide News & Research</h2>
          <p className="text-sm text-muted-foreground">
            Curated updates from trusted sources
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "research", "clinical", "regulatory", "industry"] as Category[]).map(
          (cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="capitalize"
            >
              {cat === "all" ? "All Stories" : cat}
            </Button>
          )
        )}
      </div>

      {/* Featured Article */}
      {featuredArticle && (
        <div className="mb-6">
          <NewsCard article={featuredArticle} featured />
        </div>
      )}

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {otherArticles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {/* Source Attribution */}
      <p className="text-xs text-muted-foreground text-center mt-8">
        All articles link to original sources. PeptideGPT does not claim ownership of external content.
      </p>
    </div>
  );
}
