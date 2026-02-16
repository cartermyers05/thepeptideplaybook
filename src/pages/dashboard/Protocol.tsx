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

// ── Category normalization ──
function normalizeCategoryLabel(raw?: string): { label: string; color: string } {
  if (!raw) return { label: "General", color: "hsl(0 0% 55%)" };
  const t = raw.toLowerCase();
  if (t.includes("weight") || t.includes("fat") || t.includes("metabolic")) return { label: "Weight Loss", color: "hsl(25 95% 53%)" };
  if (t.includes("skin") || t.includes("acne") || t.includes("collagen") || t.includes("aesthetic")) return { label: "Skin", color: "hsl(350 96% 72%)" };
  if (t.includes("recovery") || t.includes("healing") || t.includes("injury") || t.includes("tendon")) return { label: "Recovery", color: "hsl(263 70% 73%)" };
  if (t.includes("muscle") || t.includes("performance") || t.includes("growth hormone") || t.includes("gh")) return { label: "Performance", color: "hsl(142 71% 45%)" };
  if (t.includes("longevity") || t.includes("aging") || t.includes("anti-aging")) return { label: "Longevity", color: "hsl(217 91% 60%)" };
  if (t.includes("cognitive") || t.includes("brain")) return { label: "Cognitive", color: "hsl(187 86% 53%)" };
  return { label: "General", color: "hsl(0 0% 55%)" };
}

export default function Protocol() {
  const navigate = useNavigate();
  const { protocol, isLoading, currentWeek, daysElapsed, daysRemaining, progressPercent } = useUserProtocol();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6 py-6">
          <Skeleton className="h-40 w-full rounded-2xl" style={{ backgroundColor: "hsl(230 15% 10%)" }} />
          <Skeleton className="h-48 w-full rounded-2xl" style={{ backgroundColor: "hsl(230 15% 10%)" }} />
        </div>
      </DashboardLayout>
    );
  }

  if (!protocol) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <FlaskConical className="w-16 h-16 mb-4" style={{ color: "hsl(0 0% 40%)" }} />
          <h1 className="text-2xl font-bold mb-2" style={{ color: "hsl(0 0% 95%)", fontFamily: "Outfit, sans-serif" }}>No Active Protocol</h1>
          <p className="mb-6 max-w-md" style={{ color: "hsl(215 16% 57%)" }}>
            Chat with your AI coach to build a personalized protocol.
          </p>
          <button
            onClick={() => navigate("/dashboard/coach")}
            className="px-8 py-3 rounded-full font-semibold transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, hsl(25 95% 53%), hsl(350 96% 72%))",
              color: "white",
              minHeight: 48,
            }}
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
        {/* ── Hero Header ── */}
        <div
          className="rounded-2xl p-5 md:p-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(222 47% 11%), hsl(217 33% 17%))",
            border: "1px solid hsl(215 28% 17%)",
          }}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 70% 20%, hsla(25, 95%, 53%, 0.08), transparent 60%), radial-gradient(ellipse at 20% 80%, hsla(263, 70%, 73%, 0.06), transparent 50%)",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: protocol.status === "active" ? "hsla(142, 71%, 45%, 0.15)" : "hsla(38, 92%, 50%, 0.15)",
                  color: protocol.status === "active" ? "hsl(142 71% 45%)" : "hsl(38 92% 50%)",
                  border: `1px solid ${protocol.status === "active" ? "hsla(142, 71%, 45%, 0.25)" : "hsla(38, 92%, 50%, 0.25)"}`,
                }}
              >
                {protocol.status === "active" && (
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "hsl(142 71% 45%)" }} />
                )}
                {protocol.status === "active" ? "Active" : protocol.status}
              </span>
            </div>
            <h1
              className="text-xl md:text-2xl font-bold tracking-tight"
              style={{ color: "hsl(210 40% 96%)", fontFamily: "Outfit, sans-serif" }}
            >
              {protocol.protocol_name}
            </h1>
            <p className="text-sm mt-1" style={{ color: "hsl(215 16% 57%)" }}>
              Cycle {protocol.cycle_number}
            </p>

            {/* Stat chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              <StatChip label="Week" value={`${currentWeek || 1}/${protocol.cycle_length_weeks}`} />
              <StatChip label="Day" value={`${daysElapsed}`} />
              <StatChip label="Remaining" value={`${daysRemaining}d`} />
              <StatChip label="Progress" value={`${progressPercent}%`} accent />
            </div>
          </div>
        </div>

        {/* ── Section 1: Your Stack ── */}
        <Section title="Your Stack" icon={<FlaskConical className="w-5 h-5" />} defaultOpen>
          <div className="space-y-3">
            {(protocol.compounds as Compound[]).map((compound, i) => (
              <CompoundCard key={i} compound={compound} />
            ))}
          </div>
        </Section>

        {/* ── Section 2: Weekly Schedule ── */}
        <Section title="Weekly Schedule" icon={<Calendar className="w-5 h-5" />}>
          <WeeklyScheduleGrid schedule={protocol.schedule as Record<string, string[]>} />
        </Section>

        {/* ── Section 3: Doctor Conversation Script ── */}
        {protocol.doctor_script && (
          <Section title="Doctor Conversation Script" icon={<Stethoscope className="w-5 h-5" />}>
            <DoctorScriptSection script={protocol.doctor_script as DoctorScript} />
          </Section>
        )}

        {/* ── Section 4: Mixing Calculator ── */}
        <Section title="Mixing Calculator" icon={<Beaker className="w-5 h-5" />}>
          <ReconCalculator compounds={protocol.compounds as Compound[]} />
        </Section>

        {/* ── Section 5: Injection Guide ── */}
        <Section title="Injection Guide" icon={<Syringe className="w-5 h-5" />}>
          <InjectionSiteGuide />
        </Section>

        {/* ── Section 6: Week-by-Week Timeline ── */}
        {protocol.weekly_expectations && (
          <Section title="Week-by-Week Timeline" icon={<TrendingUp className="w-5 h-5" />}>
            <WeeklyTimeline
              expectations={protocol.weekly_expectations as { week: number; description: string }[]}
              currentWeek={currentWeek || 1}
            />
          </Section>
        )}

        {/* ── Section 7: Safety & Monitoring ── */}
        <Section title="Safety & Monitoring" icon={<Shield className="w-5 h-5" />}>
          {protocol.risk_assessment && (
            <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "hsla(38, 92%, 50%, 0.08)", border: "1px solid hsla(38, 92%, 50%, 0.2)" }}>
              <p className="font-semibold text-sm mb-2 flex items-center gap-2" style={{ color: "hsl(38 92% 50%)" }}>
                <AlertTriangle className="w-4 h-4" /> Personalized Risk Assessment
              </p>
              <p className="text-sm" style={{ color: "hsl(215 20% 75%)" }}>{protocol.risk_assessment}</p>
            </div>
          )}
          <div className="rounded-xl p-4" style={{ backgroundColor: "hsla(0, 84%, 60%, 0.08)", border: "1px solid hsla(0, 84%, 60%, 0.2)" }}>
            <p className="font-semibold text-sm mb-2" style={{ color: "hsl(0 84% 60%)" }}>
              When to stop and seek medical attention
            </p>
            <p className="text-sm" style={{ color: "hsl(215 20% 75%)" }}>
              Stop all compounds and contact a healthcare provider or call 911 if you experience:
              severe allergic reaction (swelling, difficulty breathing, hives), chest pain or heart palpitations,
              severe headache with vision changes, signs of infection at injection site (spreading redness, warmth, pus, fever),
              or any symptom that feels like a medical emergency.
            </p>
          </div>
        </Section>

        {/* ── Bottom CTAs ── */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => navigate("/dashboard/coach")}
            className="w-full px-8 py-3 rounded-full font-semibold text-[15px] transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, hsl(25 95% 53%), hsl(350 96% 72%))",
              color: "white",
              minHeight: 48,
            }}
          >
            Ask Coach About This Protocol
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full px-8 py-3 rounded-full font-semibold text-[15px] transition-all hover:opacity-80"
            style={{
              border: "1px solid hsl(215 28% 17%)",
              color: "hsl(215 20% 75%)",
              backgroundColor: "transparent",
              minHeight: 48,
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ── Stat Chip ──
function StatChip({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="px-3 py-1.5 rounded-full flex items-center gap-1.5"
      style={{
        backgroundColor: accent ? "hsla(25, 95%, 53%, 0.12)" : "hsla(215, 28%, 17%, 0.6)",
        border: `1px solid ${accent ? "hsla(25, 95%, 53%, 0.25)" : "hsla(215, 28%, 25%, 0.5)"}`,
        backdropFilter: "blur(8px)",
      }}
    >
      <span className="text-[10px] uppercase tracking-wider" style={{ color: "hsl(215 16% 57%)" }}>{label}</span>
      <span
        className="text-sm font-bold"
        style={{
          color: accent ? "hsl(25 95% 53%)" : "hsl(210 40% 96%)",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ── Section ──
function Section({ title, icon, children, defaultOpen = false }: {
  title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "hsl(240 6% 8%)", border: "1px solid hsl(215 28% 17%)" }}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between p-4 md:p-5 transition-colors hover:bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <div style={{ color: "hsl(25 95% 53%)" }}>{icon}</div>
              <span className="font-semibold text-[15px] md:text-base" style={{ color: "hsl(210 40% 96%)", fontFamily: "Outfit, sans-serif" }}>{title}</span>
            </div>
            <ChevronDown className={cn("w-5 h-5 transition-transform", open && "rotate-180")} style={{ color: "hsl(215 20% 47%)" }} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 md:px-5 pb-4 md:pb-5" style={{ backgroundColor: "hsl(240 5% 10%)" }}>
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

// ── Compound Card ──
function CompoundCard({ compound }: { compound: Compound }) {
  const { label, color } = normalizeCategoryLabel(compound.category || compound.description);

  return (
    <div
      className="rounded-xl p-4 relative overflow-hidden"
      style={{ backgroundColor: "hsl(240 5% 10%)", border: "1px solid hsl(215 28% 17%)" }}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: color }} />

      <div className="pl-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold" style={{ color: "hsl(210 40% 96%)", fontFamily: "Outfit, sans-serif" }}>
            {compound.name}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}30` }}
          >
            {label}
          </span>
        </div>
        {compound.description && (
          <p className="text-sm mb-2" style={{ color: "hsl(215 16% 57%)" }}>{compound.description}</p>
        )}
        <p className="text-sm font-bold" style={{ color: "hsl(25 95% 53%)", fontFamily: "JetBrains Mono, monospace" }}>
          {compound.dose} · {compound.frequency} · {compound.route}
        </p>
        {compound.timing && (
          <p className="text-xs mt-1" style={{ color: "hsl(215 20% 47%)" }}>{compound.timing}</p>
        )}
        {compound.rationale && (
          <p className="text-sm mt-2 italic" style={{ color: "hsl(215 20% 65%)" }}>
            <strong style={{ color: "hsl(210 40% 96%)", fontStyle: "normal" }}>Why chosen:</strong> {compound.rationale}
          </p>
        )}

        {/* Rich data blocks */}
        {compound.mechanism && (
          <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: "hsla(217, 91%, 60%, 0.06)", borderLeft: "3px solid hsl(217 91% 60%)" }}>
            <p className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: "hsl(217 91% 60%)" }}>
              <Brain className="w-3.5 h-3.5" /> How it works
            </p>
            <p className="text-sm" style={{ color: "hsl(215 20% 75%)" }}>{compound.mechanism}</p>
          </div>
        )}
        {compound.side_effects && (
          <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: "hsla(38, 92%, 50%, 0.06)", borderLeft: "3px solid hsl(38 92% 50%)" }}>
            <p className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: "hsl(38 92% 50%)" }}>
              <AlertTriangle className="w-3.5 h-3.5" /> Side effects
            </p>
            <p className="text-sm" style={{ color: "hsl(215 20% 75%)" }}>{compound.side_effects}</p>
          </div>
        )}
        {compound.storage && (
          <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: "hsla(142, 71%, 45%, 0.06)", borderLeft: "3px solid hsl(142 71% 45%)" }}>
            <p className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: "hsl(142 71% 45%)" }}>
              <Thermometer className="w-3.5 h-3.5" /> Storage & handling
            </p>
            <p className="text-sm" style={{ color: "hsl(215 20% 75%)" }}>{compound.storage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Doctor Script ──
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
        <p className="text-sm" style={{ color: "hsl(215 16% 57%)" }}>
          A personalized script to bring to your healthcare provider
        </p>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:opacity-80"
          style={{ backgroundColor: "hsla(25, 95%, 53%, 0.12)", color: "hsl(25 95% 53%)" }}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy Script"}
        </button>
      </div>

      {/* Opening line */}
      <div className="rounded-xl p-4" style={{ backgroundColor: "hsla(217, 91%, 60%, 0.06)", border: "1px solid hsla(217, 91%, 60%, 0.15)" }}>
        <p className="text-xs font-semibold mb-1" style={{ color: "hsl(217 91% 60%)" }}>Opening Line</p>
        <p className="text-sm italic" style={{ color: "hsl(215 20% 75%)" }}>"{script.opening_line}"</p>
      </div>

      {/* Studies */}
      {script.studies_to_reference?.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-2" style={{ color: "hsl(215 16% 57%)" }}>Studies to Reference</p>
          <div className="space-y-2">
            {script.studies_to_reference.map((study, i) => (
              <div key={i} className="rounded-lg p-3" style={{ backgroundColor: "hsl(240 5% 10%)", border: "1px solid hsl(215 28% 17%)" }}>
                <p className="text-sm font-medium" style={{ color: "hsl(210 40% 96%)" }}>{study.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "hsl(215 20% 47%)" }}>{study.journal}, {study.year}</p>
                <p className="text-sm mt-1" style={{ color: "hsl(215 20% 75%)" }}>{study.key_finding}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Questions */}
      {script.questions_to_ask?.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-2" style={{ color: "hsl(215 16% 57%)" }}>Questions to Ask</p>
          <div className="space-y-1.5">
            {script.questions_to_ask.map((q, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span
                  className="text-xs font-mono flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "hsla(25, 95%, 53%, 0.12)", color: "hsl(25 95% 53%)" }}
                >
                  {i + 1}
                </span>
                <p className="text-sm" style={{ color: "hsl(215 20% 75%)" }}>{q}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Weekly Schedule Grid ──
function WeeklyScheduleGrid({ schedule }: { schedule: Record<string, string[]> }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayName = dayNames[new Date().getDay()];

  return (
    <div className="grid grid-cols-7 gap-1 text-center">
      {days.map((day) => {
        const compounds = schedule[day] || [];
        const isToday = day === todayName;
        return (
          <div
            key={day}
            className="rounded-lg py-2 px-1 space-y-1"
            style={{
              backgroundColor: isToday ? "hsla(25, 95%, 53%, 0.08)" : "transparent",
              border: isToday ? "1px solid hsla(25, 95%, 53%, 0.2)" : "1px solid transparent",
            }}
          >
            <p
              className="text-xs font-medium"
              style={{ color: isToday ? "hsl(25 95% 53%)" : "hsl(215 16% 57%)" }}
            >
              {day.slice(0, 3)}
            </p>
            {compounds.length > 0 ? (
              compounds.map((name) => (
                <div
                  key={name}
                  className="text-[8px] md:text-[9px] px-1 py-0.5 rounded-full truncate font-medium"
                  style={{
                    backgroundColor: "hsla(25, 95%, 53%, 0.12)",
                    color: "hsl(25 95% 53%)",
                  }}
                  title={name}
                >
                  {name.length > 6 ? name.slice(0, 5) + "…" : name}
                </div>
              ))
            ) : (
              <p className="text-[10px]" style={{ color: "hsl(215 20% 30%)" }}>—</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Weekly Timeline ──
function WeeklyTimeline({ expectations, currentWeek }: {
  expectations: { week: number; description: string }[];
  currentWeek: number;
}) {
  return (
    <div className="space-y-3">
      {expectations.map((item) => {
        const isCurrent = item.week === currentWeek;
        const isPast = item.week < currentWeek;
        return (
          <div key={item.week} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono flex-shrink-0"
                style={{
                  backgroundColor: isCurrent ? "hsl(25 95% 53%)" : isPast ? "hsl(142 71% 45%)" : "transparent",
                  border: `2px solid ${isCurrent ? "hsl(25 95% 53%)" : isPast ? "hsl(142 71% 45%)" : "hsl(215 28% 17%)"}`,
                  color: isCurrent || isPast ? "white" : "hsl(215 20% 47%)",
                  boxShadow: isCurrent ? "0 0 12px hsla(25, 95%, 53%, 0.3)" : "none",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {isPast ? <Check className="w-3.5 h-3.5" /> : item.week}
              </div>
              <div className="w-0.5 flex-1 mt-1" style={{ backgroundColor: "hsl(215 28% 17%)" }} />
            </div>
            <p
              className="text-sm pb-3"
              style={{
                color: isCurrent ? "hsl(210 40% 96%)" : "hsl(215 16% 57%)",
                fontWeight: isCurrent ? 600 : 400,
              }}
            >
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
