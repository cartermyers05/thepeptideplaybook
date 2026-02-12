import { useState } from "react";
import { ChevronDown, Beaker, FlaskConical, Shield, Scale, Stethoscope, AlertTriangle, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPeptideDeepDive, type PeptideDeepDiveData, type LegalStatus } from "@/lib/peptideDeepDive";
import { motion, AnimatePresence } from "framer-motion";

interface PeptideDeepDiveProps {
  peptideName: string;
  goal?: string;
  isMatched?: boolean;
  defaultOpen?: boolean;
}

// Evidence circles
function EvidenceCircles({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="w-3 h-3 rounded-full inline-block"
          style={{ backgroundColor: i < rating ? "#F97316" : "#E5E7EB" }}
        />
      ))}
    </span>
  );
}

// Legal badge
function LegalBadge({ status }: { status: LegalStatus }) {
  const config: Record<LegalStatus, { label: string; color: string; bg: string }> = {
    fda_approved: { label: "FDA Approved", color: "#10B981", bg: "rgba(16,185,129,0.1)" },
    compounding: { label: "Compounding", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
    research_only: { label: "Research Only", color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
  };
  const c = config[status];
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: c.bg, color: c.color }}>
      {c.label}
    </span>
  );
}

// Copyable block
function CopyableBlock({ text, children }: { text: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative rounded-xl p-4" style={{ backgroundColor: "#F3E8FF" }}>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/50 transition-colors"
        title="Copy to clipboard"
      >
        {copied ? (
          <Check className="w-4 h-4" style={{ color: "#10B981" }} />
        ) : (
          <Copy className="w-4 h-4" style={{ color: "#8B5CF6" }} />
        )}
      </button>
      {children}
    </div>
  );
}

// Collapsible section
function Section({ 
  title, 
  icon: Icon, 
  children, 
  defaultOpen = false,
  id,
  accentColor,
}: { 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
  id?: string;
  accentColor?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div id={id} style={{ borderTop: "1px solid #E5E7EB" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3.5 px-5 text-sm font-semibold hover:bg-gray-50 transition-colors"
        style={{ color: "#111827" }}
      >
        <span className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color: accentColor || "#6B7280" }} />
          {title}
        </span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} style={{ color: "#9CA3AF" }} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PeptideDeepDive({ peptideName, goal, isMatched, defaultOpen = false }: PeptideDeepDiveProps) {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);
  const data = getPeptideDeepDive(peptideName);
  if (!data) return null;

  const goalText = goal || "your wellness goals";

  return (
    <div
      className="rounded-2xl overflow-hidden bg-white transition-all"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
    >
      {/* Collapsed header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[20px] font-bold" style={{ color: "#111827" }}>{data.name}</h3>
              {isMatched && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold" style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#F97316" }}>
                  YOUR MATCH
                </span>
              )}
            </div>
            <p className="text-sm mt-1" style={{ color: "#6B7280" }}>{data.summary}</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <LegalBadge status={data.legalStatus} />
            <ChevronDown
              className={cn("w-5 h-5 transition-transform", isExpanded && "rotate-180")}
              style={{ color: "#9CA3AF" }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <EvidenceCircles rating={data.evidenceRating} />
          {isMatched && goal && (
            <span className="text-xs" style={{ color: "#F97316" }}>Matched to your {goalText} goal</span>
          )}
        </div>
      </button>

      {/* Expanded sections */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* How It Works */}
            <Section title="How It Works" icon={Beaker} defaultOpen accentColor="#F97316">
              <div className="rounded-xl p-4" style={{ backgroundColor: "#FFF7ED" }}>
                <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{data.mechanism}</p>
              </div>
            </Section>

            {/* Evidence Summary */}
            <Section title="What the Research Shows" icon={FlaskConical} accentColor="#8B5CF6">
              <div className="space-y-2">
                {data.evidence.map((e, i) => (
                  <div key={i} className="rounded-xl p-4 bg-white" style={{ border: "1px solid #E5E7EB" }}>
                    <p className="text-sm" style={{ color: "#374151" }}>
                      <span style={{ color: "#F97316" }}>→</span> {e.finding}
                    </p>
                    <p className="text-xs font-mono mt-1" style={{ color: "#9CA3AF" }}>— {e.source}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Dosing Reference */}
            <Section title="Dosing Reference" icon={Beaker} accentColor="#F59E0B">
              {/* Warning */}
              <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#FFFBEB", borderLeft: "4px solid #F59E0B" }}>
                <p className="text-[13px]" style={{ color: "#92400E" }}>
                  <AlertTriangle className="w-3.5 h-3.5 inline mr-1.5" />
                  These are dosages from published clinical studies. Your healthcare provider should determine your specific protocol. This is not medical advice.
                </p>
              </div>
              {/* Table */}
              <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid #E5E7EB" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F9FAFB" }}>
                      <th className="text-left px-4 py-2.5 font-mono text-xs uppercase" style={{ color: "#6B7280" }}>Phase</th>
                      <th className="text-left px-4 py-2.5 font-mono text-xs uppercase" style={{ color: "#6B7280" }}>Dose</th>
                      <th className="text-left px-4 py-2.5 font-mono text-xs uppercase" style={{ color: "#6B7280" }}>Duration</th>
                      <th className="text-left px-4 py-2.5 font-mono text-xs uppercase" style={{ color: "#6B7280" }}>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.dosing.phases.map((p, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #F3F4F6" }}>
                        <td className="px-4 py-2.5 font-medium" style={{ color: "#111827" }}>{p.phase}</td>
                        <td className="px-4 py-2.5" style={{ color: "#374151" }}>{p.dose}</td>
                        <td className="px-4 py-2.5" style={{ color: "#374151" }}>{p.duration}</td>
                        <td className="px-4 py-2.5 font-mono text-xs" style={{ color: "#9CA3AF" }}>{p.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {data.dosing.notes && (
                <p className="text-xs italic mt-3" style={{ color: "#6B7280" }}>{data.dosing.notes}</p>
              )}
            </Section>

            {/* Safety & Side Effects */}
            <Section title="Safety Profile" icon={Shield} accentColor="#10B981">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#111827" }}>Common side effects:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.safety.commonSideEffects.map((s, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-[13px]" style={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#111827" }}>Serious concerns:</p>
                  <ul className="space-y-1">
                    {data.safety.seriousConcerns.map((s, i) => (
                      <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: "#374151" }}>
                        <span className="mt-0.5" style={{ color: "#EF4444" }}>•</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-1.5" style={{ color: "#111827" }}>Drug interactions:</p>
                  <ul className="space-y-0.5">
                    {data.safety.interactions.map((s, i) => (
                      <li key={i} className="text-xs" style={{ color: "#6B7280" }}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
                  <p className="text-xs font-semibold mb-1.5" style={{ color: "#111827" }}>Who should NOT use this:</p>
                  <ul className="space-y-0.5">
                    {data.safety.contraindications.map((s, i) => (
                      <li key={i} className="text-xs" style={{ color: "#374151" }}>
                        <span style={{ color: "#EF4444" }}>•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            {/* 2026 Legal Status */}
            <Section title="2026 Legal Status" icon={Scale} id="legal-status" accentColor="#F59E0B">
              <div className="rounded-xl p-4 space-y-3" style={{ border: "1px solid #E5E7EB" }}>
                <div className="flex items-center gap-2">
                  <LegalBadge status={data.legalStatus} />
                </div>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium" style={{ color: "#111827" }}>FDA Status:</span> <span style={{ color: "#6B7280" }}>{data.legal2026.fdaStatus}</span></div>
                  <div><span className="font-medium" style={{ color: "#111827" }}>Prescription:</span> <span style={{ color: "#6B7280" }}>{data.legal2026.prescriptionRequired}</span></div>
                  <div><span className="font-medium" style={{ color: "#111827" }}>Compounding:</span> <span style={{ color: "#6B7280" }}>{data.legal2026.compoundingAvailability}</span></div>
                </div>
                <p className="text-xs italic" style={{ color: "#9CA3AF" }}>Last verified: {data.legal2026.lastUpdated}</p>
              </div>
            </Section>

            {/* Doctor Conversation Script */}
            <Section title="What to Say to Your Doctor" icon={Stethoscope} id="doctor-script" accentColor="#8B5CF6">
              <div className="space-y-4" style={{ borderLeft: "4px solid #8B5CF6", paddingLeft: 16 }}>
                {/* Opening line */}
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#111827" }}>YOUR OPENING LINE</p>
                  <CopyableBlock text={data.doctorScript.opening.replace("{goal}", goalText)}>
                    <p className="text-[15px] italic pr-8" style={{ color: "#374151" }}>
                      "{data.doctorScript.opening.replace("{goal}", goalText)}"
                    </p>
                  </CopyableBlock>
                </div>

                {/* Studies to reference */}
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#111827" }}>STUDIES TO REFERENCE</p>
                  <p className="text-xs mb-2" style={{ color: "#6B7280" }}>If your doctor wants evidence, mention these:</p>
                  <div className="space-y-1.5">
                    {data.doctorScript.studiesToReference.map((s, i) => (
                      <div key={i} className="rounded-lg p-3 bg-white text-xs" style={{ border: "1px solid #E5E7EB" }}>
                        <span style={{ color: "#8B5CF6" }}>•</span> <span style={{ color: "#374151" }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Questions to ask */}
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#111827" }}>QUESTIONS TO ASK</p>
                  <ol className="space-y-1.5">
                    {data.doctorScript.questionsToAsk.map((q, i) => (
                      <li key={i} className="text-[15px]" style={{ color: "#374151" }}>
                        {i + 1}. "{q}"
                      </li>
                    ))}
                  </ol>
                </div>

                {/* If doctor isn't familiar */}
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#111827" }}>IF YOUR DOCTOR ISN'T FAMILIAR</p>
                  <CopyableBlock text={data.doctorScript.ifDoctorNotFamiliar}>
                    <p className="text-[15px] italic pr-8" style={{ color: "#374151" }}>
                      "{data.doctorScript.ifDoctorNotFamiliar}"
                    </p>
                  </CopyableBlock>
                </div>
              </div>
            </Section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
