import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useUserProtocol, Compound } from "@/hooks/useUserProtocol";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ArrowRight, FlaskConical, Calendar, Beaker, Syringe, TrendingUp, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReconCalculator } from "@/components/protocol/ReconCalculator";
import { InjectionSiteGuide } from "@/components/protocol/InjectionSiteGuide";

export default function Protocol() {
  const navigate = useNavigate();
  const { protocol, isLoading, currentWeek } = useUserProtocol();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6 py-6">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </DashboardLayout>
    );
  }

  if (!protocol) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <FlaskConical className="w-16 h-16 mb-4" style={{ color: "#9CA3AF" }} />
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#111827" }}>No Active Protocol</h1>
          <p className="mb-6 max-w-md" style={{ color: "#6B7280" }}>
            Chat with your AI coach to build a personalized protocol.
          </p>
          <button
            onClick={() => navigate("/dashboard/coach")}
            className="px-8 py-3 rounded-full text-white font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: "#F97316", minHeight: 48 }}
          >
            Build My Protocol <ArrowRight className="w-4 h-4 inline ml-1" />
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="py-4 md:py-6 space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold" style={{ color: "#111827" }}>
            🎯 {protocol.protocol_name}
          </h1>
          <p className="text-sm font-mono mt-1" style={{ color: "#6B7280" }}>
            Cycle {protocol.cycle_number} — Week {currentWeek} of {protocol.cycle_length_weeks}
          </p>
          <span
            className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: protocol.status === "active" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
              color: protocol.status === "active" ? "#10B981" : "#F59E0B",
              border: `1px solid ${protocol.status === "active" ? "rgba(16,185,129,0.25)" : "rgba(245,158,11,0.25)"}`,
            }}
          >
            {protocol.status === "active" ? "Active" : protocol.status}
          </span>
        </div>

        {/* Section 1: Your Stack (always expanded) */}
        <Section title="Your Stack" icon={<FlaskConical className="w-5 h-5" />} defaultOpen>
          <div className="space-y-3">
            {(protocol.compounds as Compound[]).map((compound, i) => (
              <CompoundCard key={i} compound={compound} />
            ))}
          </div>
        </Section>

        {/* Section 2: Weekly Schedule */}
        <Section title="Weekly Schedule" icon={<Calendar className="w-5 h-5" />}>
          <WeeklyScheduleGrid schedule={protocol.schedule as Record<string, string[]>} />
        </Section>

        {/* Section 3: Mixing Calculator */}
        <Section title="Mixing Calculator" icon={<Beaker className="w-5 h-5" />}>
          <ReconCalculator compounds={protocol.compounds as Compound[]} />
        </Section>

        {/* Section 4: Injection Guide */}
        <Section title="Injection Guide" icon={<Syringe className="w-5 h-5" />}>
          <InjectionSiteGuide />
        </Section>

        {/* Section 5: Week-by-Week Timeline */}
        {protocol.weekly_expectations && (
          <Section title="Week-by-Week Timeline" icon={<TrendingUp className="w-5 h-5" />}>
            <WeeklyTimeline
              expectations={protocol.weekly_expectations as { week: number; description: string }[]}
              currentWeek={currentWeek || 1}
            />
          </Section>
        )}

        {/* Section 6: Safety & Monitoring */}
        <Section title="Safety & Monitoring" icon={<Shield className="w-5 h-5" />}>
          {protocol.risk_assessment && (
            <p className="text-sm mb-4" style={{ color: "#374151" }}>{protocol.risk_assessment}</p>
          )}
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            <p className="font-semibold text-sm mb-2" style={{ color: "#EF4444" }}>
              When to stop and seek medical attention
            </p>
            <p className="text-sm" style={{ color: "#374151" }}>
              Stop all compounds and contact a healthcare provider or call 911 if you experience:
              severe allergic reaction (swelling, difficulty breathing, hives), chest pain or heart palpitations,
              severe headache with vision changes, signs of infection at injection site (spreading redness, warmth, pus, fever),
              or any symptom that feels like a medical emergency.
            </p>
          </div>
        </Section>

        {/* Bottom CTAs */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => navigate("/dashboard/coach")}
            className="w-full px-8 py-3 rounded-full font-semibold text-[15px] transition-all hover:opacity-90"
            style={{ backgroundColor: "#F97316", color: "white", minHeight: 48 }}
          >
            Ask Coach About This Protocol
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full px-8 py-3 rounded-full font-semibold text-[15px] border transition-all hover:bg-secondary"
            style={{ borderColor: "#E5E7EB", color: "#374151", minHeight: 48 }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Section({ title, icon, children, defaultOpen = false }: {
  title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-secondary/30 transition-colors">
            <div className="flex items-center gap-3">
              <div style={{ color: "#F97316" }}>{icon}</div>
              <span className="font-semibold text-[15px] md:text-base" style={{ color: "#111827" }}>{title}</span>
            </div>
            <ChevronDown className={cn("w-5 h-5 transition-transform", open && "rotate-180")} style={{ color: "#9CA3AF" }} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 md:px-5 pb-4 md:pb-5">
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

function CompoundCard({ compound }: { compound: Compound }) {
  const categoryColors: Record<string, string> = {
    "weight-loss": "#F97316",
    recovery: "#8B5CF6",
    performance: "#10B981",
    longevity: "#3B82F6",
  };
  const color = categoryColors[compound.category || ""] || "#6B7280";

  return (
    <div className="rounded-xl border p-4" style={{ borderColor: "#E5E7EB" }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold" style={{ color: "#111827" }}>{compound.name}</span>
        {compound.category && (
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {compound.category}
          </span>
        )}
      </div>
      {compound.description && (
        <p className="text-sm mb-2" style={{ color: "#6B7280" }}>{compound.description}</p>
      )}
      <p className="text-sm font-mono" style={{ color: "#374151" }}>
        {compound.dose} · {compound.frequency} · {compound.route}
      </p>
      {compound.timing && (
        <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{compound.timing}</p>
      )}
      {compound.rationale && (
        <p className="text-sm mt-2" style={{ color: "#374151" }}>
          <strong>Why chosen:</strong> {compound.rationale}
        </p>
      )}
    </div>
  );
}

function WeeklyScheduleGrid({ schedule }: { schedule: Record<string, string[]> }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="grid grid-cols-7 gap-1 text-center">
      {days.map((day) => {
        const compounds = schedule[day] || [];
        return (
          <div key={day} className="space-y-1">
            <p className="text-xs font-medium" style={{ color: "#6B7280" }}>
              {day.slice(0, 3)}
            </p>
            {compounds.length > 0 ? (
              compounds.map((name) => (
                <div key={name} className="w-2 h-2 rounded-full mx-auto" style={{ backgroundColor: "#F97316" }} title={name} />
              ))
            ) : (
              <p className="text-[10px]" style={{ color: "#D1D5DB" }}>—</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function WeeklyTimeline({ expectations, currentWeek }: {
  expectations: { week: number; description: string }[];
  currentWeek: number;
}) {
  return (
    <div className="space-y-3">
      {expectations.map((item) => {
        const isCurrent = item.week === currentWeek;
        return (
          <div key={item.week} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono flex-shrink-0"
                style={{
                  backgroundColor: isCurrent ? "#F97316" : "transparent",
                  border: `2px solid ${isCurrent ? "#F97316" : "#E5E7EB"}`,
                  color: isCurrent ? "white" : "#9CA3AF",
                }}
              >
                {item.week}
              </div>
              <div className="w-0.5 flex-1 mt-1" style={{ backgroundColor: "#E5E7EB" }} />
            </div>
            <p className="text-sm pb-3" style={{ color: isCurrent ? "#111827" : "#6B7280", fontWeight: isCurrent ? 600 : 400 }}>
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
