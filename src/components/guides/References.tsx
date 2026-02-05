import { ExternalLink } from "lucide-react";

interface Reference {
  number: number;
  text: string;
  url?: string;
}

interface ReferencesProps {
  references: Reference[];
}

export function References({ references }: ReferencesProps) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">References</h2>
      <ol className="space-y-3 text-sm text-muted-foreground">
        {references.map((ref) => (
          <li key={ref.number} id={`ref-${ref.number}`} className="flex gap-2">
            <span className="text-primary font-medium min-w-[24px]">
              {ref.number}.
            </span>
            <span className="flex-1">
              {ref.text}
              {ref.url && (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 ml-2 text-primary hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>View</span>
                </a>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
