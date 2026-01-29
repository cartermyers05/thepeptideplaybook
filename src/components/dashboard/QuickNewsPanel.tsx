import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Newspaper, ArrowRight, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNewsArticles, type NewsArticle } from "@/hooks/useNews";
import { cn } from "@/lib/utils";

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
  });
}

function calculateReadTime(content: string): number {
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

interface CompactNewsCardProps {
  article: NewsArticle;
  index: number;
}

function CompactNewsCard({ article, index }: CompactNewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
    >
      <Link
        to={`/news/${article.slug}`}
        className="group block p-3 rounded-lg hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge 
                variant="outline" 
                className={cn("text-[10px] px-1.5 py-0", categoryStyles[article.category])}
              >
                {article.category}
              </Badge>
              <span className="text-[10px] text-muted-foreground">
                {calculateReadTime(article.full_content)} min
              </span>
            </div>
            <h4 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              {article.source_name} • {formatDate(article.published_at)}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
        </div>
      </Link>
    </motion.div>
  );
}

interface FeaturedNewsCardProps {
  article: NewsArticle;
}

function FeaturedNewsCard({ article }: FeaturedNewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/news/${article.slug}`}
        className="group block p-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/40 transition-all"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Top Story
          </div>
          <Badge
            variant="outline"
            className={cn("text-[10px] px-1.5 py-0", categoryStyles[article.category])}
          >
            {article.category}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{calculateReadTime(article.full_content)} min read</span>
            <span>•</span>
            <span>{formatDate(article.published_at)}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function QuickNewsPanel() {
  const { data: articles, isLoading, error } = useNewsArticles({ limit: 5 });

  if (isLoading) {
    return (
      <div className="h-full flex flex-col rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="p-4 space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    );
  }

  if (error || !articles?.length) {
    return (
      <div className="h-full flex flex-col rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Latest News</h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <p className="text-sm text-muted-foreground text-center">
            No news articles available.
          </p>
        </div>
      </div>
    );
  }

  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  const otherArticles = articles.filter((a) => a.id !== featuredArticle.id).slice(0, 3);

  return (
    <div className="h-full flex flex-col rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Latest News</h3>
        </div>
        <Link 
          to="/dashboard/digest" 
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          View all
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {/* Featured Story */}
          <FeaturedNewsCard article={featuredArticle} />

          {/* Divider */}
          {otherArticles.length > 0 && (
            <div className="border-t border-border pt-2 mt-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2 px-1">
                More Stories
              </p>
            </div>
          )}

          {/* Other Stories */}
          {otherArticles.map((article, index) => (
            <CompactNewsCard 
              key={article.id} 
              article={article} 
              index={index} 
            />
          ))}
        </div>
      </ScrollArea>

      {/* Footer CTA */}
      <div className="p-3 border-t border-border">
        <Button asChild variant="ghost" size="sm" className="w-full text-xs">
          <Link to="/dashboard/digest">
            <Newspaper className="w-3 h-3 mr-1.5" />
            Browse All News
          </Link>
        </Button>
      </div>
    </div>
  );
}
