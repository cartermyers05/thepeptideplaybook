import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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

const categoryColors: Record<NewsArticle["category"], string> = {
  research: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  clinical: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  regulatory: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
  industry: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
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
}

export default function NewsCard({ article, featured }: NewsCardProps) {
  return (
    <Card className={`group transition-all hover:shadow-md ${featured ? "col-span-full" : ""}`}>
      <CardContent className={`p-5 ${featured ? "md:p-6" : ""}`}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={categoryColors[article.category]}>
              {categoryLabels[article.category]}
            </Badge>
            <span className="text-xs text-muted-foreground">{article.date}</span>
          </div>

          <h3 className={`font-semibold leading-tight ${featured ? "text-xl md:text-2xl" : "text-base"}`}>
            {article.title}
          </h3>

          <p className={`text-muted-foreground ${featured ? "text-base" : "text-sm"} line-clamp-3`}>
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">
              Source: <span className="font-medium">{article.source}</span>
            </span>
            
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Read full article
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
