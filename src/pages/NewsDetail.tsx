import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";
import { useNewsArticle, useRelatedNews } from "@/hooks/useNews";
import { NewsSummary } from "@/components/dashboard/NewsSummary";
import { ArticleContent } from "@/components/articles/ArticleContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const categoryStyles: Record<string, string> = {
  research: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  clinical: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  regulatory: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  industry: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
};

const categoryLabels: Record<string, string> = {
  research: "Research",
  clinical: "Clinical Trial",
  regulatory: "Regulatory",
  industry: "Industry",
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

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, error } = useNewsArticle(slug || "");
  const { data: relatedArticles } = useRelatedNews(
    slug || "",
    article?.category || "research"
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Skeleton className="h-6 w-32 mb-8" />
          <Skeleton className="h-8 w-24 mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-40 w-full mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/chat">Back to News</Link>
          </Button>
        </div>
      </div>
    );
  }

  const readTime = calculateReadTime(article.full_content);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge
              variant="outline"
              className={cn("text-xs", categoryStyles[article.category])}
            >
              {categoryLabels[article.category]}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {formatDate(article.published_at)}
            </span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>{readTime} min read</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-2">
            {article.title}
          </h1>
        </motion.header>

        {/* Summary Box */}
        <NewsSummary summary={article.summary} />

        {/* Full Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ArticleContent content={article.full_content} />
        </motion.div>

        {/* Source Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Source</p>
              <p className="font-medium">{article.source_name}</p>
            </div>
            {article.source_url && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  View Original Source
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </motion.div>

        {/* Related Stories */}
        {relatedArticles && relatedArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <h2 className="text-xl font-bold mb-6">Related Stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/news/${related.slug}`}
                  className="group p-4 rounded-lg border border-border hover:border-primary/40 transition-colors"
                >
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs mb-2",
                      categoryStyles[related.category]
                    )}
                  >
                    {categoryLabels[related.category]}
                  </Badge>
                  <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(related.published_at)}
                  </p>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
