import { useState } from "react";
import { Search, Filter, BookOpen, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import { SEOHead } from "@/components/seo/SEOHead";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { ArticleCard } from "@/components/articles/ArticleCard";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useArticles } from "@/hooks/useArticles";
import { CONTENT_TYPE_LABELS } from "@/lib/seo";

const contentTypes = [
  { value: "all", label: "All Types" },
  { value: "citation-magnet", label: "Research Overview" },
  { value: "question-answer", label: "Q&A" },
  { value: "comparison", label: "Comparison" },
  { value: "guide", label: "Guide" },
];

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contentType, setContentType] = useState("all");

  const { data: articles, isLoading } = useArticles({ status: "published" });

  // Filter articles based on search and content type
  const filteredArticles = articles?.filter((article) => {
    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tldr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.h1_question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.target_keywords.some((k) =>
        k.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesType =
      contentType === "all" || article.content_type === contentType;

    return matchesSearch && matchesType;
  });

  // Separate featured (top cited) and regular articles
  const featuredArticle = filteredArticles?.[0];
  const regularArticles = filteredArticles?.slice(1);

  return (
    <>
      <SEOHead
        title="Research Articles"
        description="Expert peptide research articles, protocols, and evidence-based guides. AI-optimized content with research citations."
        canonical="/articles"
      />
      <OrganizationSchema />

      <div className="min-h-screen bg-background">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          {/* Page Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Research Articles</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Expert peptide research, protocols, and evidence-based guides.
              Each article is backed by peer-reviewed studies and citations.
            </p>
          </motion.header>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-lg" />
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && filteredArticles?.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No articles found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setContentType("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Featured Article */}
          {featuredArticle && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Featured Article</h2>
              </div>
              <ArticleCard article={featuredArticle} featured />
            </motion.section>
          )}

          {/* Articles Grid */}
          {regularArticles && regularArticles.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-semibold mb-4">All Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ArticleCard article={article} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Stats */}
          {articles && articles.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <div className="flex flex-wrap items-center justify-center gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {articles.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Articles</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {articles.reduce((sum, a) => sum + a.citation_count, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">AI Citations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {articles.reduce(
                      (sum, a) => sum + (a.citations?.length || 0),
                      0
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Research Sources
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
