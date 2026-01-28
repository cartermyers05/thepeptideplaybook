import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatArticleDate, estimateReadTime, CONTENT_TYPE_LABELS } from "@/lib/seo";
import type { Article } from "@/hooks/useArticles";

interface BlogCardProps {
  article: Article;
  index: number;
}

export function BlogCard({ article, index }: BlogCardProps) {
  const readTime = estimateReadTime(article.full_content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/blog/${article.slug}`}>
        <Card className="h-full group hover:border-primary/30 hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-xs">
                {CONTENT_TYPE_LABELS[article.content_type] || "Article"}
              </Badge>
              {article.updated_at && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatArticleDate(article.updated_at)}
                </span>
              )}
            </div>

            <h2 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {article.h1_question || article.title}
            </h2>

            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {article.tldr}
            </p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
              <div className="flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Read more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
