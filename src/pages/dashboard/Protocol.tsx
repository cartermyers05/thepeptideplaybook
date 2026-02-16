import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useUserProtocol, Compound, DoctorScript } from "@/hooks/useUserProtocol";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ArrowRight, FlaskConical, Calendar, Beaker, Syringe, TrendingUp, Shield, Stethoscope, Copy, Check, AlertTriangle, Thermometer, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReconCalculator } from "@/components/protocol/ReconCalculator";
import { InjectionSiteGuide } from "@/components/protocol/InjectionSiteGuide";
import { toast } from "sonner";

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

        {/* Section 3: Doctor Conversation Script */}
        {protocol.doctor_script && (
          <Section title="Doctor Conversation Script" icon={<Stethoscope className="w-5 h-5" />}>
            <DoctorScriptSection script={protocol.doctor_script as DoctorScript} />
          </Section>
        )}

        {/* Section 4: Mixing Calculator */}
        <Section title="Mixing Calculator" icon={<Beaker className="w-5 h-5" />}>
          <ReconCalculator compounds={protocol.compounds as Compound[]} />
        </Section>

        {/* Section 5: Injection Guide */}
        <Section title="Injection Guide" icon={<Syringe className="w-5 h-5" />}>
          <InjectionSiteGuide />
        </Section>

        {/* Section 6: Week-by-Week Timeline */}
        {protocol.weekly_expectations && (
          <Section title="Week-by-Week Timeline" icon={<TrendingUp className="w-5 h-5" />}>
            <WeeklyTimeline
              expectations={protocol.weekly_expectations as { week: number; description: string }[]}
              currentWeek={currentWeek || 1}
            />
          </Section>
        )}

        {/* Section 7: Safety & Monitoring */}
        <Section title="Safety & Monitoring" icon={<Shield className="w-5 h-5" />}>
          {protocol.risk_assessment && (
            <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
              <p className="font-semibold text-sm mb-2 flex items-center gap-2" style={{ color: "#F59E0B" }}>
                <AlertTriangle className="w-4 h-4" /> Personalized Risk Assessment
              </p>
              <p className="text-sm" style={{ color: "#374151" }}>{protocol.risk_assessment}</p>
            </div>
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

      {/* Rich data fields */}
      {compound.mechanism && (
        <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)" }}>
          <p className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: "#3B82F6" }}>
            <Brain className="w-3.5 h-3.5" /> How it works
          </p>
          <p className="text-sm" style={{ color: "#374151" }}>{compound.mechanism}</p>
        </div>
      )}
      {compound.side_effects && (
        <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}>
          <p className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: "#F59E0B" }}>
            <AlertTriangle className="w-3.5 h-3.5" /> Side effects
          </p>
          <p className="text-sm" style={{ color: "#374151" }}>{compound.side_effects}</p>
        </div>
      )}
      {compound.storage && (
        <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
          <p className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: "#10B981" }}>
            <Thermometer className="w-3.5 h-3.5" /> Storage & handling
          </p>
          <p className="text-sm" style={{ color: "#374151" }}>{compound.storage}</p>
        </div>
      )}
    </div>
  );
}

function DoctorScriptSection({ script }: { script: DoctorScript }) {
  const [copied, setCopied] = useState(false);

  const fullScript = [
    `Opening: "${script.opening_line}"`,
    "",
    "Studies to reference:",
    ...(script.studies_to_reference || []).map((s, i) => `${i + 1}. ${s.title} (${s.journal}, ${s.year}) — ${s.key_finding}`),
    "",
    "Questions to ask your doctor:",
    ...(script.questions_to_ask || []).map((q, i) => `${i + 1}. ${q}`),
  ].join("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullScript);
    setCopied(true);
    toast.success("Script copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: "#6B7280" }}>
          A personalized script to bring to your healthcare provider
        </p>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:opacity-80"
          style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#F97316" }}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy Script"}
        </button>
      </div>

      {/* Opening line */}
      <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)" }}>
        <p className="text-xs font-semibold mb-1" style={{ color: "#3B82F6" }}>Opening Line</p>
        <p className="text-sm italic" style={{ color: "#374151" }}>"{script.opening_line}"</p>
      </div>

      {/* Studies */}
      {script.studies_to_reference?.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-2" style={{ color: "#6B7280" }}>Studies to Reference</p>
          <div className="space-y-2">
            {script.studies_to_reference.map((study, i) => (
              <div key={i} className="rounded-lg p-3 border" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-sm font-medium" style={{ color: "#111827" }}>{study.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{study.journal}, {study.year}</p>
                <p className="text-sm mt-1" style={{ color: "#374151" }}>{study.key_finding}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Questions */}
      {script.questions_to_ask?.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-2" style={{ color: "#6B7280" }}>Questions to Ask</p>
          <div className="space-y-1.5">
            {script.questions_to_ask.map((q, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-xs font-mono flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#F97316" }}>
                  {i + 1}
                </span>
                <p className="text-sm" style={{ color: "#374151" }}>{q}</p>
              </div>
            ))}
          </div>
        </div>
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
