import { ExternalLink, FileText, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Citation {
  source: string;
  url: string;
  study_name: string;
  year: number;
}

interface CitationsSectionProps {
  citations: Citation[];
}

export function CitationsSection({ citations }: CitationsSectionProps) {
  if (!citations || citations.length === 0) return null;

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <FileText className="w-5 h-5 text-primary" />
          Research Citations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-3">
          {citations.map((citation, index) => (
            <li key={index} className="flex items-start gap-3 group">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-muted rounded-full text-xs font-medium">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium flex items-start gap-1.5"
                >
                  <span className="line-clamp-2">{citation.study_name}</span>
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="font-medium">{citation.source}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{citation.year}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
