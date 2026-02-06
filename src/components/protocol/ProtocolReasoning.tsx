import { useState } from "react";
import { MessageCircle, ChevronDown, ChevronUp, User, AlertTriangle, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { Protocol, Peptide } from "@/hooks/useProtocol";

interface ProtocolReasoningProps {
  protocol: Protocol;
}

export function ProtocolReasoning({ protocol }: ProtocolReasoningProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasPersonalization = protocol.notes || protocol.user_context || 
    protocol.secondary_goals?.length || protocol.constraints?.length ||
    protocol.peptides.some(p => p.rationale);

  if (!hasPersonalization) {
    return null;
  }

  return (
    <Card className="overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-primary/50 to-primary" />
      <CardContent className="p-5">
        {/* Main reasoning - always visible */}
        {protocol.notes && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">Why This Protocol</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {protocol.notes}
            </p>
          </div>
        )}

        {/* Expandable details */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show personalization details
              </>
            )}
          </CollapsibleTrigger>

          <CollapsibleContent className="pt-4 space-y-4">
            {/* Goals */}
            {protocol.secondary_goals && protocol.secondary_goals.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Also Targeting</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {protocol.secondary_goals.map((goal, idx) => (
                    <Badge key={idx} variant="secondary" className="rounded-full">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* User context */}
            {protocol.user_context && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Your Context</span>
                </div>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  {protocol.user_context}
                </p>
              </div>
            )}

            {/* Constraints */}
            {protocol.constraints && protocol.constraints.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-foreground">Constraints Considered</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {protocol.constraints.map((constraint, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="rounded-full bg-amber-50 text-amber-700 border-amber-200"
                    >
                      {constraint}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Peptide rationales */}
            {protocol.peptides.some(p => p.rationale) && (
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Why Each Peptide</p>
                <div className="space-y-2">
                  {protocol.peptides.filter(p => p.rationale).map((peptide, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 rounded-lg bg-primary/5 border border-primary/10"
                    >
                      <p className="font-medium text-foreground text-sm mb-1">{peptide.name}</p>
                      <p className="text-sm text-muted-foreground">{peptide.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
