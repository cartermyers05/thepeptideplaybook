import { useState } from "react";
import { ChevronDown, Pill, Clock, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { Peptide } from "@/hooks/useProtocol";

interface ProtocolPeptideListProps {
  peptides: Peptide[];
}

export function ProtocolPeptideList({ peptides }: ProtocolPeptideListProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (peptides.length === 0) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <div className="p-4 cursor-pointer hover:bg-muted/50 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Full Protocol Details</p>
                <p className="text-sm text-muted-foreground">
                  {peptides.length} peptide{peptides.length !== 1 ? 's' : ''} in your protocol
                </p>
              </div>
            </div>
            <ChevronDown className={cn(
              "w-5 h-5 text-muted-foreground transition-transform",
              isOpen && "rotate-180"
            )} />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            {peptides.map((peptide, index) => (
              <PeptideDetailCard key={index} peptide={peptide} />
            ))}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

function PeptideDetailCard({ peptide }: { peptide: Peptide }) {
  return (
    <div className="p-4 rounded-xl bg-muted/50 border border-border">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{peptide.name}</h3>
          <p className="text-sm text-muted-foreground">{peptide.purpose}</p>
        </div>
        <Badge variant="outline" className="rounded-full shrink-0">
          {peptide.frequency}
        </Badge>
      </div>

      {/* Rationale if available */}
      {peptide.rationale && (
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 mb-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-primary">Why this peptide: </span>
            {peptide.rationale}
          </p>
        </div>
      )}

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <Pill className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Dosage</p>
            <p className="font-medium text-foreground">{peptide.dosage}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Timing</p>
            <p className="font-medium text-foreground">{peptide.timing}</p>
          </div>
        </div>
        {peptide.site && (
          <div className="flex items-center gap-2 col-span-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Injection Site</p>
              <p className="font-medium text-foreground">{peptide.site}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
