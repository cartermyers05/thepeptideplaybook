import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useProtocol } from "@/hooks/useProtocol";
import { useCheckIn } from "@/hooks/useCheckIn";
import { useQuizResponse } from "@/hooks/useQuizResponse";
import { CheckCircle, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyProtocolState } from "@/components/protocol/EmptyProtocolState";
import { ProtocolHeader } from "@/components/protocol/ProtocolHeader";
import { TodaySchedule } from "@/components/protocol/TodaySchedule";
import { ProtocolReasoning } from "@/components/protocol/ProtocolReasoning";
import { ProtocolPeptideList } from "@/components/protocol/ProtocolPeptideList";
import { PeptideDeepDive } from "@/components/protocol/PeptideDeepDive";
import { getAllPeptideNames, getPeptideDeepDive } from "@/lib/peptideDeepDive";
import { getGoalLabel } from "@/lib/quizPersonalization";
import { toast } from "@/hooks/use-toast";

export default function MyPlan() {
  const { protocol, isLoading, startProtocol, pauseProtocol, resumeProtocol } = useProtocol();
  const { submitCheckIn, hasCheckedInToday } = useCheckIn();
  const { data: quizResponse } = useQuizResponse();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showUpdatedBanner, setShowUpdatedBanner] = useState(false);

  const userGoal = quizResponse?.primary_goal;
  const goalLabel = userGoal ? getGoalLabel(userGoal) : undefined;
  
  // Track completed doses locally (persists for today via check-in)
  const [completedDoses, setCompletedDoses] = useState<string[]>([]);

  // Detect ?updated=true param
  useEffect(() => {
    if (searchParams.get('updated') === 'true') {
      setShowUpdatedBanner(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Load completed doses from localStorage on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const stored = localStorage.getItem(`doses-${today}`);
    if (stored) {
      try {
        setCompletedDoses(JSON.parse(stored));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  const handleMarkComplete = (peptideName: string, timeSlot: string) => {
    const doseKey = `${peptideName}-${timeSlot}`;
    const today = new Date().toISOString().split('T')[0];
    
    setCompletedDoses(prev => {
      const updated = [...prev, doseKey];
      // Persist to localStorage
      localStorage.setItem(`doses-${today}`, JSON.stringify(updated));
      return updated;
    });

    toast({
      title: "Dose logged!",
      description: `${peptideName} (${timeSlot}) marked complete.`,
    });

    // Submit a check-in if all doses are complete or first dose
    if (protocol) {
      submitCheckIn.mutate({
        protocolId: protocol.id,
        data: {
          injection_done: "yes",
          energy_level: 5,
          mood: 5,
          sleep_quality: 5,
          side_effects: [],
        }
      });
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </DashboardLayout>
    );
  }

  // No protocol - show empty state with AI Coach CTA
  if (!protocol) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <EmptyProtocolState />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        {/* Blueprint Updated Banner */}
        {showUpdatedBanner && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20"
          >
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm font-medium text-foreground flex-1">
              Your Blueprint has been updated based on your quiz answers
            </p>
            <button onClick={() => setShowUpdatedBanner(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Header with progress */}
        <ProtocolHeader
          protocol={protocol}
          onStart={() => startProtocol.mutate(protocol.id)}
          onPause={() => pauseProtocol.mutate(protocol.id)}
          onResume={() => resumeProtocol.mutate(protocol.id)}
          isStarting={startProtocol.isPending}
          isPausing={pauseProtocol.isPending}
          isResuming={resumeProtocol.isPending}
        />

        {/* Today's schedule - the main value */}
        {protocol.status === "active" && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Today's Doses</h2>
            <TodaySchedule
              peptides={protocol.peptides}
              onMarkComplete={handleMarkComplete}
              completedDoses={completedDoses}
            />
          </div>
        )}

        {/* Not started prompt */}
        {protocol.status === "not_started" && (
          <div className="p-6 rounded-xl bg-muted/50 border border-dashed border-border text-center">
            <p className="text-muted-foreground mb-2">
              Your protocol is ready! Click "Start Protocol" above to begin tracking your daily doses.
            </p>
          </div>
        )}

        {/* AI reasoning - why this protocol */}
        <ProtocolReasoning protocol={protocol} />

        {/* Full peptide details (collapsible) */}
        <ProtocolPeptideList peptides={protocol.peptides} />

        {/* Peptide Research Library */}
        <PeptideResearchLibrary
          protocolPeptideNames={protocol.peptides.map(p => p.name)}
          goalLabel={goalLabel}
        />
      </motion.div>
    </DashboardLayout>
  );
}

function PeptideResearchLibrary({ 
  protocolPeptideNames, 
  goalLabel 
}: { 
  protocolPeptideNames: string[];
  goalLabel?: string;
}) {
  const allNames = getAllPeptideNames();
  
  // Find matched peptides (ones in the protocol that have deep dive data)
  const matchedNames = protocolPeptideNames.filter(name => getPeptideDeepDive(name));
  const otherNames = allNames.filter(name => !matchedNames.some(
    m => m.toLowerCase() === name.toLowerCase() || 
         name.toLowerCase().includes(m.toLowerCase()) || 
         m.toLowerCase().includes(name.toLowerCase())
  ));

  if (matchedNames.length === 0 && otherNames.length === 0) return null;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Peptide Research Library</h2>
        <p className="text-sm text-muted-foreground">Deep research profiles for your protocol peptides</p>
      </div>

      {/* Matched peptides first */}
      {matchedNames.map(name => (
        <PeptideDeepDive 
          key={name} 
          peptideName={name} 
          goal={goalLabel} 
          isMatched 
        />
      ))}

      {/* Other peptides */}
      {otherNames.length > 0 && (
        <>
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Browse Other Peptides</h3>
          </div>
          {otherNames.map(name => (
            <PeptideDeepDive 
              key={name} 
              peptideName={name} 
              goal={goalLabel} 
            />
          ))}
        </>
      )}
    </div>
  );
}
