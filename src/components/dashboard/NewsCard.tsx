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
  research: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  clinical: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  regulatory: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  industry: "bg-purple-500/10 text-purple-400 border-purple-500/20",
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
  // Estimate read time (rough: 200 words per minute)
  const wordCount = article.excerpt.split(" ").length;
  const readTime = Math.max(1, Math.ceil(wordCount / 40));

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.08,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      whileHover={{ 
        y: -6,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={cn(
        "group block h-full glass-panel border-glow overflow-hidden",
        featured && "lg:flex lg:flex-col"
      )}
    >
      <div className={cn(
        "p-5 flex flex-col h-full",
        featured && "lg:p-6"
      )}>
        {/* Top row: Badge + Read time */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge 
            variant="outline" 
            className={cn(
              "border glass-panel backdrop-blur-sm",
              categoryStyles[article.category]
            )}
          >
            {categoryLabels[article.category]}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{readTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-semibold leading-tight mb-3 group-hover:text-primary transition-colors duration-200",
          featured ? "text-xl lg:text-2xl" : "text-base"
        )}>
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className={cn(
          "text-muted-foreground flex-1 mb-4",
          featured ? "text-base line-clamp-4" : "text-sm line-clamp-3"
        )}>
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {article.source}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              {article.date}
            </span>
          </div>
          
          <motion.div 
            className="flex items-center gap-1 text-xs font-medium text-primary"
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ x: 0 }}
            animate={{ opacity: 0 }}
            whileInView={{ opacity: 0 }}
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Read more
            </span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
}
