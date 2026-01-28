import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NewsCard from "./NewsCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Newspaper, TrendingUp, ArrowRight, Clock } from "lucide-react";
import { useNewsArticles, type NewsArticle } from "@/hooks/useNews";
import { cn } from "@/lib/utils";

type Category = NewsArticle["category"] | "all";

const categoryStyles: Record<NewsArticle["category"], string> = {
  research: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  clinical: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  regulatory: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  industry: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function calculateReadTime(content: string): number {
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export default function NewsFeed() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const { data: articles, isLoading, error } = useNewsArticles();

  const filteredArticles = selectedCategory === "all"
    ? articles || []
    : (articles || []).filter((article) => article.category === selectedCategory);

  const featuredArticle = filteredArticles.find((a) => a.featured);
  const otherArticles = filteredArticles.filter((a) => !a.featured);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div>
            <Skeleton className="h-6 w-48 mb-1" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-48 w-full mb-8 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Failed to load news articles. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Newspaper className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Peptide News & Research</h2>
          <p className="text-sm text-muted-foreground">
            Curated updates from trusted sources
          </p>
        </div>
      </motion.div>

      {/* Category Filters */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-6"
      >
        {(["all", "research", "clinical", "regulatory", "industry"] as Category[]).map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="capitalize"
          >
            {cat === "all" ? "All Stories" : cat}
          </Button>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No news articles found.</p>
        </div>
      )}

      {/* Top Story Hero */}
      {featuredArticle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            to={`/news/${featuredArticle.slug}`}
            className="block card-clean border-primary/20 hover:border-primary/40 transition-colors group"
          >
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Top Story Today
                </div>
                <Badge
                  variant="outline"
                  className={cn("text-xs", categoryStyles[featuredArticle.category])}
                >
                  {featuredArticle.category}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                  <Clock className="w-3 h-3" />
                  <span>{calculateReadTime(featuredArticle.full_content)} min read</span>
                </div>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                {featuredArticle.title}
              </h2>
              <p className="text-muted-foreground text-base mb-6 line-clamp-3">
                {featuredArticle.summary}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {featuredArticle.source_name} • {formatDate(featuredArticle.published_at)}
                </span>
                <div className="flex items-center gap-2 text-primary font-medium">
                  Read Full Story
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Grid Layout */}
      {otherArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {otherArticles.map((article, index) => (
            <NewsCard 
              key={article.id} 
              article={article} 
              index={index} 
            />
          ))}
        </div>
      )}

      {/* Source Attribution */}
      {filteredArticles.length > 0 && (
        <p className="text-xs text-muted-foreground text-center mt-10 pt-6 border-t border-border">
          News summaries curated by Peptide Playbook. Original sources are attributed for each article.
        </p>
      )}
    </div>
  );
}
