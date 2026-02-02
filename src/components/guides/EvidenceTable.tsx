import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export interface Study {
  studyType: "Cell" | "Animal" | "Human";
  species?: string;
  sampleSize?: string;
  condition: string;
  outcome: string;
  result: string;
  pubmedLink?: string;
}

interface EvidenceTableProps {
  studies: Study[];
  title?: string;
}

const studyTypeConfig = {
  Cell: {
    icon: "🧫",
    label: "Cell",
    className: "bg-muted text-muted-foreground border-muted",
  },
  Animal: {
    icon: "🐀",
    label: "Animal",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  },
  Human: {
    icon: "👤",
    label: "Human",
    className: "bg-green-500/10 text-green-600 border-green-500/30",
  },
};

export function EvidenceTable({ studies, title = "Research Evidence Summary" }: EvidenceTableProps) {
  if (!studies || studies.length === 0) {
    return null;
  }

  return (
    <section className="my-8">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 font-semibold">Type</th>
              <th className="text-left p-3 font-semibold">Species/N</th>
              <th className="text-left p-3 font-semibold">Condition</th>
              <th className="text-left p-3 font-semibold">Outcome</th>
              <th className="text-left p-3 font-semibold">Result</th>
              <th className="text-left p-3 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody>
            {studies.map((study, index) => {
              const config = studyTypeConfig[study.studyType];
              return (
                <tr key={index} className={index % 2 === 0 ? "" : "bg-muted/30"}>
                  <td className="p-3">
                    <Badge variant="outline" className={config.className}>
                      {config.icon} {config.label}
                    </Badge>
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {study.species && study.sampleSize 
                      ? `${study.species} / n=${study.sampleSize}`
                      : study.species || study.sampleSize || "-"}
                  </td>
                  <td className="p-3 text-muted-foreground">{study.condition}</td>
                  <td className="p-3 text-muted-foreground">{study.outcome}</td>
                  <td className="p-3 text-muted-foreground">{study.result}</td>
                  <td className="p-3">
                    {study.pubmedLink ? (
                      <a
                        href={study.pubmedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        PubMed <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {studies.map((study, index) => {
          const config = studyTypeConfig[study.studyType];
          return (
            <div key={index} className="glass-card-subtle p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={config.className}>
                  {config.icon} {config.label}
                </Badge>
                {study.pubmedLink && (
                  <a
                    href={study.pubmedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                  >
                    PubMed <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              
              <div className="space-y-2 text-sm">
                {(study.species || study.sampleSize) && (
                  <div>
                    <span className="font-medium">Species/N: </span>
                    <span className="text-muted-foreground">
                      {study.species && study.sampleSize 
                        ? `${study.species} / n=${study.sampleSize}`
                        : study.species || study.sampleSize}
                    </span>
                  </div>
                )}
                <div>
                  <span className="font-medium">Condition: </span>
                  <span className="text-muted-foreground">{study.condition}</span>
                </div>
                <div>
                  <span className="font-medium">Outcome: </span>
                  <span className="text-muted-foreground">{study.outcome}</span>
                </div>
                <div>
                  <span className="font-medium">Result: </span>
                  <span className="text-muted-foreground">{study.result}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Note: Animal and cell studies do not prove effectiveness in humans. This table summarizes available research, not proven treatments.
      </p>
    </section>
  );
}
