import { Link } from "react-router-dom";
import { Calendar, User, ExternalLink, Eye, Quote, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CONTENT_TYPE_LABELS, formatArticleDate, estimateReadTime } from "@/lib/seo";
import type { Article } from "@/hooks/useArticles";

interface ArticleCardProps {
  article: Partial<Article>;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const readTime = article.full_content ? estimateReadTime(article.full_content) : 5;

  return (
    <Link to={`/articles/${article.slug}`}>
      <Card
        className={`group h-full transition-all duration-200 hover:shadow-lg hover:border-primary/30 ${
          featured ? "border-primary/20 bg-gradient-to-br from-primary/5 to-transparent" : ""
        }`}
      >
        <CardContent className={`flex flex-col h-full ${featured ? "p-8" : "p-6"}`}>
          {/* Top row: Content type + Read time */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <Badge variant="secondary" className="text-xs">
              {CONTENT_TYPE_LABELS[article.content_type || "guide"] || "Article"}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{readTime} min read</span>
            </div>
          </div>

          {/* Title as question (H2 for SEO) */}
          <h2
            className={`font-bold leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-3 ${
              featured ? "text-xl lg:text-2xl" : "text-lg"
            }`}
          >
            {article.h1_question || article.title}
          </h2>

          {/* TL;DR excerpt */}
          <p
            className={`text-muted-foreground mb-4 flex-grow ${
              featured ? "text-base line-clamp-4" : "text-sm line-clamp-3"
            }`}
          >
            {article.tldr}
          </p>

          {/* Author + Date */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>{article.author_name}</span>
            </div>
            {article.published_at && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatArticleDate(article.published_at)}</span>
              </div>
            )}
          </div>

          {/* Stats + CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{article.page_views?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Quote className="w-3.5 h-3.5" />
                <span>{article.citation_count || 0} citations</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Read More</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
