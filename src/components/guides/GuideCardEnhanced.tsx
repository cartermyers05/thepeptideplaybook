import { Link } from "react-router-dom";
import { Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuideCardEnhancedProps {
  title: string;
  description: string;
  href: string;
  category: string;
  categoryLabel: string;
  readTime: string;
  lastUpdated: string;
  featured?: boolean;
}

export function GuideCardEnhanced({
  title,
  description,
  href,
  categoryLabel,
  readTime,
  lastUpdated,
  featured = false,
}: GuideCardEnhancedProps) {
  return (
    <Link to={href} className="block group">
      <article
        className={cn(
          "content-card p-6 h-full flex flex-col",
          featured && "md:col-span-2 md:flex-row md:gap-6"
        )}
      >
        <div className="flex-1">
          {/* Category badge */}
          <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
            {categoryLabel}
          </span>

          <h3
            className={cn(
              "font-semibold mt-3 mb-2 group-hover:text-primary transition-colors",
              featured ? "text-xl md:text-2xl" : "text-lg"
            )}
          >
            {title}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Metadata row */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} read
            </span>
            <span>Updated {lastUpdated}</span>
          </div>

          {/* Based on research label */}
          <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              Based on published research
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
