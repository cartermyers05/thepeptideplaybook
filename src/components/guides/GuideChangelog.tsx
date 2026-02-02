import { useState } from "react";
import { ChevronDown, ChevronUp, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface ChangelogEntry {
  date: string;
  change: string;
}

interface GuideChangelogProps {
  entries: ChangelogEntry[];
  defaultCollapsed?: boolean;
}

export function GuideChangelog({ entries, defaultCollapsed = true }: GuideChangelogProps) {
  const [isOpen, setIsOpen] = useState(!defaultCollapsed || entries.length <= 3);

  if (!entries || entries.length === 0) {
    return null;
  }

  const visibleEntries = isOpen ? entries : entries.slice(0, 3);
  const hasMore = entries.length > 3;

  return (
    <section className="my-8 p-4 bg-muted/30 rounded-lg border border-border">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Update History</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-4 font-medium text-muted-foreground w-32">Date</th>
              <th className="text-left py-2 font-medium text-muted-foreground">Change</th>
            </tr>
          </thead>
          <tbody>
            {visibleEntries.map((entry, index) => (
              <tr key={index} className="border-b border-border/50 last:border-0">
                <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">{entry.date}</td>
                <td className="py-2 text-foreground">{entry.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && !isOpen && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="mt-2 text-primary hover:text-primary/80"
        >
          Show {entries.length - 3} more updates <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      )}

      {hasMore && isOpen && entries.length > 3 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="mt-2 text-muted-foreground hover:text-foreground"
        >
          Show less <ChevronUp className="w-4 h-4 ml-1" />
        </Button>
      )}
    </section>
  );
}
