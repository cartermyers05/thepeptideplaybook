import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useProtocol } from "@/hooks/useProtocol";
import { useCheckIn } from "@/hooks/useCheckIn";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyProtocolState } from "@/components/protocol/EmptyProtocolState";
import { ProtocolHeader } from "@/components/protocol/ProtocolHeader";
import { TodaySchedule } from "@/components/protocol/TodaySchedule";
import { ProtocolReasoning } from "@/components/protocol/ProtocolReasoning";
import { ProtocolPeptideList } from "@/components/protocol/ProtocolPeptideList";
import { toast } from "@/hooks/use-toast";

export default function MyPlan() {
  const { protocol, isLoading, startProtocol, pauseProtocol, resumeProtocol } = useProtocol();
  const { submitCheckIn, hasCheckedInToday } = useCheckIn();
  
  // Track completed doses locally (persists for today via check-in)
  const [completedDoses, setCompletedDoses] = useState<string[]>([]);

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
      </motion.div>
    </DashboardLayout>
  );
}
