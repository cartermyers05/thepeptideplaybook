import { ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { peptideDeepDiveLibrary } from "@/lib/peptideDeepDive";
import type { Peptide } from "@/components/database/PeptideCard";

const researchToStars: Record<string, number> = {
  strong: 5,
  moderate: 3,
  limited: 2,
  emerging: 1,
};

function StarRating({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </span>
  );
}

function getSideEffectProfile(peptide: Peptide): string {
  const deepDive = peptideDeepDiveLibrary[peptide.name];
  if (deepDive) {
    const count = deepDive.safety.commonSideEffects.length;
    if (count >= 4) return "Moderate";
    if (count >= 2) return "Mild";
    return "Minimal";
  }
  return peptide.research_status === "strong" ? "Well-characterized" : "Limited data";
}

function getCostRange(peptide: Peptide): string {
  const deepDive = peptideDeepDiveLibrary[peptide.name];
  if (deepDive?.legalStatus === "fda_approved") return "$$–$$$";
  if (deepDive?.legalStatus === "compounding") return "$–$$";
  return "$";
}

interface ComparisonTableProps {
  peptides: Peptide[];
  onClose: () => void;
}

export function ComparisonTable({ peptides, onClose }: ComparisonTableProps) {
  const rows = [
    {
      label: "Evidence Rating",
      render: (p: Peptide) => <StarRating count={researchToStars[p.research_status] || 1} />,
    },
    {
      label: "Primary Use",
      render: (p: Peptide) => <span>{p.primary_use}</span>,
    },
    {
      label: "FDA Status",
      render: (p: Peptide) => {
        const colors: Record<string, string> = {
          "FDA Approved": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
          "Category 2": "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200",
          "Under Review": "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200",
          "Not Regulated": "bg-muted text-muted-foreground",
        };
        return <Badge variant="secondary" className={`text-xs ${colors[p.fda_status] || ""}`}>{p.fda_status}</Badge>;
      },
    },
    {
      label: "Side Effect Profile",
      render: (p: Peptide) => <span>{getSideEffectProfile(p)}</span>,
    },
    {
      label: "Study Count",
      render: (p: Peptide) => <span>{p.total_study_count ?? "N/A"}</span>,
    },
    {
      label: "Cost Range",
      render: (p: Peptide) => <span>{getCostRange(p)}</span>,
    },
    {
      label: "Best For",
      render: (p: Peptide) => <span>{p.primary_use}</span>,
    },
  ];

  return (
    <div>
      <Button variant="ghost" onClick={onClose} className="mb-4 gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Database
      </Button>

      <h2 className="text-xl font-semibold mb-4">Peptide Comparison</h2>

      <div className="overflow-x-auto border border-border rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[140px]" />
              {peptides.map((p) => (
                <TableHead key={p.id} className="min-w-[160px] text-center font-semibold">
                  {p.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.label}>
                <TableCell className="font-medium text-muted-foreground text-sm">
                  {row.label}
                </TableCell>
                {peptides.map((p) => (
                  <TableCell key={p.id} className="text-center text-sm">
                    <div className="flex justify-center">{row.render(p)}</div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
