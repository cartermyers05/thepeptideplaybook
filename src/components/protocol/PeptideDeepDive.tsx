import { useState } from "react";
import { ChevronDown, Star, Shield, Beaker, Stethoscope, Scale, FlaskConical, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getPeptideDeepDive, type PeptideDeepDiveData, type LegalStatus } from "@/lib/peptideDeepDive";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PeptideDeepDiveProps {
  peptideName: string;
  goal?: string;
  isMatched?: boolean;
}

function CollapsibleSection({ 
  title, 
  icon: Icon, 
  children, 
  defaultOpen = false 
}: { 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          {title}
        </span>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("w-3.5 h-3.5", i < rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30")} />
      ))}
    </span>
  );
}

function LegalBadge({ status }: { status: LegalStatus }) {
  const config = {
    fda_approved: { label: "FDA Approved", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800" },
    compounding: { label: "Compounding", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800" },
    research_only: { label: "Research Only", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800" },
  };
  const c = config[status];
  return <Badge className={cn("rounded-full border", c.className)}>{c.label}</Badge>;
}

export function PeptideDeepDive({ peptideName, goal, isMatched }: PeptideDeepDiveProps) {
  const data = getPeptideDeepDive(peptideName);
  if (!data) return null;

  const goalText = goal || "your wellness goals";
  const openingLine = data.doctorScript.opening.replace("{goal}", goalText);

  return (
    <Card className="overflow-hidden">
      {/* Overview - always visible */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-foreground">{data.name}</h3>
              {isMatched && (
                <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 border">Your Match</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{data.summary}</p>
          </div>
          <LegalBadge status={data.legalStatus} />
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Evidence:</span>
            <StarRating rating={data.evidenceRating} />
          </div>
          {isMatched && goal && (
            <span className="text-xs text-primary">Matched to your {goalText} goal</span>
          )}
        </div>
      </div>

      {/* How It Works */}
      <CollapsibleSection title="How It Works" icon={Beaker} defaultOpen>
        <p className="text-sm text-muted-foreground leading-relaxed">{data.mechanism}</p>
      </CollapsibleSection>

      {/* Evidence Summary */}
      <CollapsibleSection title="Evidence Summary" icon={FlaskConical}>
        <p className="text-xs font-medium text-foreground mb-2">What the research shows:</p>
        <div className="space-y-2">
          {data.evidence.map((e, i) => (
            <div key={i} className="text-sm">
              <span className="text-primary mr-1">→</span>
              <span className="text-foreground">{e.finding}</span>
              <span className="text-muted-foreground"> — {e.source}</span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Dosing Reference */}
      <CollapsibleSection title="Dosing Reference" icon={Beaker}>
        <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-3">
          <p className="text-xs text-amber-800 dark:text-amber-300">
            <AlertTriangle className="w-3 h-3 inline mr-1" />
            These are dosages reported in published research. Your healthcare provider should determine your specific protocol.
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Phase</TableHead>
                <TableHead className="text-xs">Dose</TableHead>
                <TableHead className="text-xs">Duration</TableHead>
                <TableHead className="text-xs">Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.dosing.phases.map((p, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs font-medium">{p.phase}</TableCell>
                  <TableCell className="text-xs">{p.dose}</TableCell>
                  <TableCell className="text-xs">{p.duration}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.source}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {data.dosing.notes && (
          <p className="text-xs text-muted-foreground mt-2 italic">{data.dosing.notes}</p>
        )}
      </CollapsibleSection>

      {/* Safety Profile */}
      <CollapsibleSection title="Safety & Side Effects" icon={Shield}>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-foreground mb-1">Common side effects reported in studies:</p>
            <ul className="space-y-0.5">
              {data.safety.commonSideEffects.map((s, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-muted-foreground/50 mt-0.5">•</span>{s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-foreground mb-1">Serious concerns to discuss with your doctor:</p>
            <ul className="space-y-0.5">
              {data.safety.seriousConcerns.map((s, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-red-400 mt-0.5">•</span>{s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-foreground mb-1">Known interactions:</p>
            <ul className="space-y-0.5">
              {data.safety.interactions.map((s, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-muted-foreground/50 mt-0.5">•</span>{s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-foreground mb-1">Who should NOT use this:</p>
            <ul className="space-y-0.5">
              {data.safety.contraindications.map((s, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-red-400 mt-0.5">•</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* Legal Status */}
      <CollapsibleSection title="Legal Status (2026)" icon={Scale}>
        <div className="space-y-2 text-xs">
          <div><span className="font-medium text-foreground">FDA Status:</span> <span className="text-muted-foreground">{data.legal2026.fdaStatus}</span></div>
          <div><span className="font-medium text-foreground">Prescription:</span> <span className="text-muted-foreground">{data.legal2026.prescriptionRequired}</span></div>
          <div><span className="font-medium text-foreground">Compounding:</span> <span className="text-muted-foreground">{data.legal2026.compoundingAvailability}</span></div>
          <div className="text-muted-foreground/70 italic">Last updated: {data.legal2026.lastUpdated}</div>
        </div>
      </CollapsibleSection>

      {/* Doctor Conversation Script */}
      <CollapsibleSection title="What to Say to Your Doctor" icon={Stethoscope}>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-xs font-medium text-foreground mb-1">Opening:</p>
            <p className="text-xs text-muted-foreground italic bg-muted/50 p-2 rounded">"{openingLine}"</p>
          </div>
          <div>
            <p className="text-xs font-medium text-foreground mb-1">Key studies to reference:</p>
            <ul className="space-y-0.5">
              {data.doctorScript.studiesToReference.map((s, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">•</span>{s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-foreground mb-1">Questions to ask:</p>
            <ul className="space-y-0.5">
              {data.doctorScript.questionsToAsk.map((q, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">•</span>"{q}"
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-foreground mb-1">If your doctor isn't familiar:</p>
            <p className="text-xs text-muted-foreground italic bg-muted/50 p-2 rounded">"{data.doctorScript.ifDoctorNotFamiliar}"</p>
          </div>
        </div>
      </CollapsibleSection>
    </Card>
  );
}
