import { motion } from "framer-motion";
import { ExternalLink, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  url: string;
  date: string;
  category: "research" | "clinical" | "regulatory" | "industry";
  featured?: boolean;
}

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

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
  index?: number;
}

export default function NewsCard({ article, featured, index = 0 }: NewsCardProps) {
  const wordCount = article.excerpt.split(" ").length;
  const readTime = Math.max(1, Math.ceil(wordCount / 40));

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
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

        {/* Excerpt */}
        <p className={cn(
          "text-muted-foreground flex-1 mb-4",
          featured ? "text-base line-clamp-4" : "text-sm line-clamp-4"
        )}>
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{article.source}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Read Article</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
