import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MessageCircle, 
  ArrowRight, 
  Play, 
  Pause, 
  Eye, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  Calendar,
  Printer,
  Download
} from "lucide-react";
import { useProtocol, Protocol, Peptide } from "@/hooks/useProtocol";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const statusConfig = {
  not_started: { label: "Not Started", variant: "secondary" as const, color: "bg-muted text-muted-foreground" },
  active: { label: "Active", variant: "default" as const, color: "bg-primary text-primary-foreground" },
  paused: { label: "Paused", variant: "outline" as const, color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" },
  completed: { label: "Completed", variant: "secondary" as const, color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
};

function ProtocolCard({ 
  protocol, 
  onStart, 
  onPause, 
  onResume,
  isStarting,
  isPausing,
  isResuming,
}: { 
  protocol: Protocol;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  isStarting: boolean;
  isPausing: boolean;
  isResuming: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = statusConfig[protocol.status] || statusConfig.not_started;
  
  const peptideNames = protocol.peptides.map(p => p.name).join(", ");
  const createdDate = protocol.created_at ? format(new Date(protocol.created_at), "MMM d, yyyy") : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-card overflow-hidden"
    >
      <div className="h-1 dashboard-gradient-purple" />
      <div className="p-5">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{protocol.protocol_name}</h3>
            <p className="text-sm text-muted-foreground">
              {protocol.status === "not_started" 
                ? `${protocol.cycle_length_weeks} week cycle`
                : `Week ${protocol.current_week} of ${protocol.cycle_length_weeks}${protocol.current_day ? ` • Day ${protocol.current_day}` : ""}`
              }
            </p>
          </div>
          <Badge className={cn("rounded-full shrink-0", status.color)}>
            {status.label}
          </Badge>
        </div>

        {/* Peptide Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {protocol.peptides.slice(0, 3).map((peptide, idx) => (
            <span 
              key={idx} 
              className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
            >
              {peptide.name}
            </span>
          ))}
          {protocol.peptides.length > 3 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
              +{protocol.peptides.length - 3} more
            </span>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Created {createdDate}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {protocol.status === "not_started" && (
            <Button 
              size="sm" 
              onClick={() => onStart(protocol.id)}
              disabled={isStarting}
              className="rounded-full"
            >
              <Play className="w-3.5 h-3.5 mr-1.5" />
              {isStarting ? "Starting..." : "Start"}
            </Button>
          )}
          {protocol.status === "active" && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onPause(protocol.id)}
              disabled={isPausing}
              className="rounded-full"
            >
              <Pause className="w-3.5 h-3.5 mr-1.5" />
              {isPausing ? "Pausing..." : "Pause"}
            </Button>
          )}
          {protocol.status === "paused" && (
            <Button 
              size="sm" 
              onClick={() => onResume(protocol.id)}
              disabled={isResuming}
              className="rounded-full"
            >
              <Play className="w-3.5 h-3.5 mr-1.5" />
              {isResuming ? "Resuming..." : "Resume"}
            </Button>
          )}
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-full"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            View
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
          </Button>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-border space-y-3">
                {/* Why This Protocol - AI Notes */}
                {protocol.notes && (
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-primary" />
                      Why This Protocol
                    </h4>
                    <p className="text-sm text-muted-foreground">{protocol.notes}</p>
                  </div>
                )}

                {/* Secondary Goals */}
                {protocol.secondary_goals && protocol.secondary_goals.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs text-muted-foreground">Also targeting:</span>
                    {protocol.secondary_goals.map((goal, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                )}

                {/* Constraints Considered */}
                {protocol.constraints && protocol.constraints.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs text-muted-foreground">Constraints:</span>
                    {protocol.constraints.map((constraint, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                      >
                        {constraint}
                      </span>
                    ))}
                  </div>
                )}

                {/* Peptides with Rationale */}
                {protocol.peptides.map((peptide, index) => (
                  <div 
                    key={index} 
                    className="p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{peptide.name}</h4>
                      <Badge variant="outline" className="text-xs">{peptide.frequency}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{peptide.purpose}</p>
                    
                    {/* Rationale - why this peptide for THIS user */}
                    {peptide.rationale && (
                      <div className="mb-2 p-2 rounded bg-primary/5 border border-primary/10">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium text-primary">Why this peptide:</span> {peptide.rationale}
                        </p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-muted-foreground">Dosage:</span> {peptide.dosage}</div>
                      <div><span className="text-muted-foreground">Timing:</span> {peptide.timing}</div>
                      {peptide.site && (
                        <div className="col-span-2"><span className="text-muted-foreground">Site:</span> {peptide.site}</div>
                      )}
                    </div>
                  </div>
                ))}

                {/* User Context */}
                {protocol.user_context && (
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Your context:</span> {protocol.user_context}
                    </p>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="p-3 rounded-lg bg-muted border border-border">
                  <p className="text-xs text-muted-foreground">
                    <AlertTriangle className="w-3.5 h-3.5 inline mr-1" />
                    <strong>Disclaimer:</strong> This protocol is for educational purposes only. Consult a healthcare provider before using any peptides.
                  </p>
                </div>

                {/* Export Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 rounded-full">
                    <Printer className="w-3.5 h-3.5 mr-1.5" />
                    Print
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 rounded-full">
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    Export
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Protocols() {
  const { 
    protocols, 
    isLoadingProtocols, 
    startProtocol, 
    pauseProtocol, 
    resumeProtocol 
  } = useProtocol();

  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Protocols</h1>
          <p className="text-muted-foreground">Personalized peptide protocols built for you</p>
        </div>

        {/* Chat CTA Card */}
        <Card className="border-dashed border-2 bg-gradient-to-br from-muted/50 to-muted">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-foreground mb-1">Build Your Custom Protocol</h2>
                <p className="text-muted-foreground mb-4">
                  Go to the Chat and talk to our AI to build a personalized protocol made just for you.
                </p>
                <Button asChild className="rounded-full">
                  <Link to="/dashboard/chat">
                    Go to Chat
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Protocols List */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Your Protocols
          </h2>

          {isLoadingProtocols ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="dashboard-card p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <Skeleton className="h-5 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <div className="flex gap-2 mb-3">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-28 mb-4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : protocols && protocols.length > 0 ? (
            <div className="space-y-4">
              {protocols.map((protocol) => (
                <ProtocolCard
                  key={protocol.id}
                  protocol={protocol}
                  onStart={(id) => startProtocol.mutate(id)}
                  onPause={(id) => pauseProtocol.mutate(id)}
                  onResume={(id) => resumeProtocol.mutate(id)}
                  isStarting={startProtocol.isPending}
                  isPausing={pauseProtocol.isPending}
                  isResuming={resumeProtocol.isPending}
                />
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No protocols yet</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Use the Chat to build your first personalized protocol!
                </p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/dashboard/chat">
                    Go to Chat
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
