import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRelatedArticles, type Article } from "@/hooks/useArticles";
import { CONTENT_TYPE_LABELS } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";

interface RelatedArticlesProps {
  articleIds: string[];
}

export function RelatedArticles({ articleIds }: RelatedArticlesProps) {
  const { data: articles, isLoading } = useRelatedArticles(articleIds);

  if (isLoading || !articles || articles.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Quote className="w-6 h-6 text-primary" />
        Related Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <Link key={article.id} to={`/articles/${article.slug}`}>
            <Card className="h-full group hover:border-primary/30 transition-colors">
              <CardContent className="p-5">
                <Badge variant="outline" className="mb-3 text-xs">
                  {CONTENT_TYPE_LABELS[article.content_type] || "Article"}
                </Badge>
                <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {article.tldr}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{article.author_name}</span>
                  <div className="flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
