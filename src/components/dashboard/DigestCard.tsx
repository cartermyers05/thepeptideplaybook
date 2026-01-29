import { Mail, Calendar, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import type { ResearchDigest } from "@/hooks/useDigests";

interface DigestCardProps {
  digest: ResearchDigest;
  isLatest: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function DigestCard({ digest, isLatest, isExpanded, onToggle }: DigestCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{digest.month} Digest</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {formatDate(digest.date)}
              </p>
            </div>
          </div>
          {isLatest && (
            <Badge className="bg-primary/10 text-primary">Latest</Badge>
          )}
        </div>

        <ul className="space-y-2 mb-4">
          {digest.highlights.map((highlight, j) => (
            <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              {highlight}
            </li>
          ))}
        </ul>

        <Button
          variant="ghost"
          className="text-sm text-primary hover:text-primary p-0 h-auto"
          onClick={onToggle}
        >
          {isExpanded ? (
            <>
              Hide full digest <ChevronUp className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              Read full digest <ChevronDown className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="border-t border-border bg-muted/30 p-6">
          <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
            <ReactMarkdown>{digest.full_content}</ReactMarkdown>
          </div>

          {digest.sources.length > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground mb-2">Sources</p>
              <div className="flex flex-wrap gap-2">
                {digest.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    {source.title}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
