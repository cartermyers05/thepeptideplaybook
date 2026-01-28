import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { NewsArticle } from "@/hooks/useNews";

const categoryStyles: Record<NewsArticle["category"], string> = {
  research: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  clinical: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  regulatory: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  industry: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
};

const categoryLabels: Record<NewsArticle["category"], string> = {
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

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
  index?: number;
}

export default function NewsCard({ article, featured, index = 0 }: NewsCardProps) {
  const readTime = calculateReadTime(article.full_content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        to={`/news/${article.slug}`}
        className={cn(
          "group block h-full card-clean hover-lift overflow-hidden",
          featured && "lg:flex lg:flex-col"
        )}
      >
        <div className={cn(
          "p-6 flex flex-col h-full",
          featured && "lg:p-8"
        )}>
          {/* Top row: Badge + Read time */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <Badge 
              variant="outline" 
              className={cn("text-xs", categoryStyles[article.category])}
            >
              {categoryLabels[article.category]}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{readTime} min</span>
            </div>
          </div>

          {/* Title */}
          <h3 className={cn(
            "font-semibold leading-snug mb-3 group-hover:text-primary transition-colors",
            featured ? "text-xl lg:text-2xl" : "text-lg"
          )}>
            {article.title}
          </h3>

          {/* Summary */}
          <p className={cn(
            "text-muted-foreground flex-1 mb-4",
            featured ? "text-base line-clamp-3" : "text-sm line-clamp-3"
          )}>
            {article.summary}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{article.source_name}</span>
              <span>•</span>
              <span>{formatDate(article.published_at)}</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Read Full Story</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
