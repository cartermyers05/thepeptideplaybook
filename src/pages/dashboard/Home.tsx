import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, GitCompareArrows, Shield } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useActiveProtocolProgress } from "@/hooks/useActiveProtocolProgress";
import { useQuizResponse } from "@/hooks/useQuizResponse";
import { getGoalLabel } from "@/lib/quizPersonalization";

// === CONTENT MAPS ===

const weekTitles: Record<number, string> = {
  1: "Your Body Is Adjusting",
  2: "Finding Your Rhythm",
  3: "Building Confidence",
  4: "Preparing for Your First Increase",
  5: "The Shift Begins",
  6: "The New Normal",
  7: "Protect What You're Building",
  8: "Phase 2 Complete",
  9: "Acceleration Begins",
  10: "Maintaining Momentum",
  11: "Body Composition Matters",
  12: "Preparing for the Biggest Jump",
  13: "The Big Jump",
  14: "Full Assessment",
  15: "Almost at Full Dose",
  16: "You've Reached Therapeutic Dose",
  17: "The Long Game Begins",
  18: "Trusting the Process",
  19: "Preparing for Independence",
  20: "Graduation",
};

function getDose(week: number): string {
  if (week <= 4) return "0.25mg/week";
  if (week <= 8) return "0.5mg/week";
  if (week <= 12) return "1.0mg/week";
  if (week <= 15) return "1.7mg/week";
  return "2.4mg/week";
}

const doseChangeWeeks = [5, 9, 13, 16];

const whatToExpect: Record<number, string> = {
  1: "Mild injection site reactions possible. Most feel nothing yet.",
  2: "Body adjusting to the peptide. Subtle appetite changes may begin.",
  3: "Some notice reduced cravings. Energy levels stabilizing.",
  4: "Habits forming. Your body is ready for the next step.",
  5: "Appetite reduction becomes noticeable. Brief nausea possible.",
  6: "New dose settling in. Food noise significantly quieter.",
  7: "Consistent effects. Weight trend becoming visible.",
  8: "Phase 2 wrapping up. Body well-adapted to current dose.",
  9: "Stronger appetite suppression. Monitor energy closely.",
  10: "Steady state at 1.0mg. Most side effects have resolved.",
  11: "Body composition shifting. Muscle preservation is key.",
  12: "Preparing for the largest dose increase. Eat well this week.",
  13: "Significant appetite suppression. Nausea possible for 2-3 days.",
  14: "Assessing your response. Is this dose right for you?",
  15: "Fine-tuning. Almost at the therapeutic target dose.",
  16: "Full therapeutic dose reached. This is the maintenance level.",
  17: "Focus shifts to sustainability. Building long-term habits.",
  18: "Your body has adapted. Results should be consistent.",
  19: "Planning your transition. What comes after the protocol?",
  20: "Protocol complete. Review your journey and next steps.",
};

function getNutritionTip(week: number): string {
  if (week <= 4) return "Protein first at every meal. Build the habit now.";
  if (week <= 8) return "Appetite dropping — eat even when you're not hungry.";
  if (week <= 12) return "Undereating is your biggest risk. 3 meals minimum.";
  if (week <= 16) return "Calorie-dense, protein-rich. Every bite counts.";
  return "Sustainability mode. Build patterns that last.";
}

function getMovementTip(week: number): string {
  if (week <= 4) return "Walk 20-30 min daily. Nothing more yet.";
  if (week <= 8) return "Add resistance training 2x/week. Non-negotiable.";
  if (week <= 12) return "2-3 resistance sessions. Progressive overload.";
  if (week <= 16) return "Fuel your workouts. Don't train fasted.";
  return "Maintain. Find what you enjoy long-term.";
}

function getProgressExpectation(week: number): string {
  if (week <= 2) return "Focus on habits, not the scale.";
  if (week <= 4) return "Expected: 1-2% body weight lost.";
  if (week <= 8) return "Expected: 3-7% body weight lost.";
  if (week <= 12) return "Expected: 8-10% body weight lost.";
  if (week <= 16) return "Expected: 10-12% body weight lost.";
  return "Expected: 12-15% body weight lost.";
}

function getPhase(week: number): string {
  if (week <= 4) return "Titration";
  if (week <= 8) return "Building";
  if (week <= 16) return "Acceleration";
  return "Maintenance";
}

const phases = [
  { label: "Titration", range: "1-4" },
  { label: "Building", range: "5-8" },
  { label: "Acceleration", range: "9-16" },
  { label: "Maintenance", range: "17-20" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// === MINI CARD COMPONENT ===

function MiniCard({ icon, label, text, onClick }: { icon: string; label: string; text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-[#E5E7EB] rounded-xl p-4 text-left hover:shadow-md transition-shadow w-full"
    >
      <span className="text-xl mb-1 block">{icon}</span>
      <p className="text-[13px] font-medium" style={{ color: "#6B7280" }}>{label}</p>
      <p className="text-sm mt-1" style={{ color: "#374151" }}>{text}</p>
    </button>
  );
}

// === MAIN COMPONENT ===

export default function Dashboard() {
  const navigate = useNavigate();
  const { progress, currentWeek, isLoading } = useActiveProtocolProgress();
  const { data: quizResponse } = useQuizResponse();

  const goalLabel = quizResponse ? getGoalLabel(quizResponse.primary_goal) : null;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-8 py-8">
          <Skeleton className="h-12 w-72 rounded-xl" />
          <Skeleton className="h-80 w-full rounded-2xl" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // No active protocol
  if (!progress || !currentWeek) {
    return (
      <DashboardLayout>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-4 md:py-8 space-y-10"
        >
          <motion.div
            variants={itemVariants}
            className="rounded-2xl p-6 md:p-10"
            style={{
              backgroundColor: "#FFF7ED",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <h1 className="text-2xl md:text-[32px] font-bold tracking-tight" style={{ color: "#111827" }}>
              Ready to Start Your Protocol?
            </h1>
            <p className="mt-3 text-[15px] md:text-base max-w-xl" style={{ color: "#6B7280" }}>
              Set your start date and we'll guide you through each week — what to eat, how to move, what to expect, and when to check in.
            </p>
            <button
              onClick={() => navigate("/dashboard/protocols")}
              className="mt-6 px-8 py-3 rounded-full text-white font-semibold text-[15px] transition-all hover:opacity-90"
              style={{ backgroundColor: "#F97316", minHeight: 48 }}
            >
              Set My Start Date <ArrowRight className="w-4 h-4 inline ml-1" />
            </button>
            <p className="mt-3 text-[13px]" style={{ color: "#9CA3AF" }}>
              You can always change this later
            </p>
          </motion.div>
        </motion.div>
      </DashboardLayout>
    );
  }

  // Active protocol — weekly command center
  const week = currentWeek;
  const title = weekTitles[week] || "Your Protocol";
  const dose = getDose(week);
  const isDoseChange = doseChangeWeeks.includes(week);
  const currentPhase = getPhase(week);
  const progressPercent = Math.round((week / 20) * 100);

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 py-4 md:py-8"
      >
        {/* Hero Weekly Brief Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-5 md:p-7"
          style={{
            backgroundColor: "#FFF7ED",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
          }}
        >
          {/* Top row: week label + dose badges */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <span
                className="text-xs font-mono font-semibold uppercase"
                style={{ color: "#F97316", letterSpacing: "0.05em" }}
              >
                WEEK {week} OF 20
              </span>
              <h1 className="text-[22px] md:text-[28px] font-bold mt-1" style={{ color: "#111827" }}>
                {goalLabel ? `${goalLabel}: ` : ""}{title}
              </h1>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-mono font-medium"
                style={{
                  backgroundColor: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  color: "#10B981",
                }}
              >
                {dose}
              </span>
              {isDoseChange && (
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(245,158,11,0.08)",
                    border: "1px solid rgba(245,158,11,0.25)",
                    color: "#F59E0B",
                  }}
                >
                  ⚠️ Dose increase this week
                </span>
              )}
            </div>
          </div>

          {/* 2x2 mini-cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
            <MiniCard
              icon="🎯"
              label="What to Expect"
              text={whatToExpect[week] || "Stay consistent with your protocol."}
              onClick={() => navigate("/dashboard/protocols")}
            />
            <MiniCard
              icon="🥗"
              label="Nutrition This Week"
              text={getNutritionTip(week)}
              onClick={() => navigate("/dashboard/protocols")}
            />
            <MiniCard
              icon="💪"
              label="Movement This Week"
              text={getMovementTip(week)}
              onClick={() => navigate("/dashboard/protocols")}
            />
            <MiniCard
              icon="📊"
              label="Progress Check"
              text={getProgressExpectation(week)}
              onClick={() => navigate("/dashboard/protocols")}
            />
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/dashboard/protocols")}
            className="mt-6 w-full px-8 py-3 rounded-full text-white font-semibold text-[15px] transition-all hover:opacity-90"
            style={{ backgroundColor: "#111827", minHeight: 48 }}
          >
            Read Your Full Week {week} Brief <ArrowRight className="w-4 h-4 inline ml-1" />
          </button>
        </motion.div>

        {/* Quick Access Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-5"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
          >
            <div className="w-3 h-3 rounded-full mb-3" style={{ backgroundColor: "#8B5CF6" }} />
            <h3 className="text-base font-bold" style={{ color: "#111827" }}>AI Research Coach</h3>
            <p className="text-sm mt-1 mb-4" style={{ color: "#6B7280" }}>Ask anything about your protocol</p>
            <button
              onClick={() => navigate("/dashboard/chat")}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:opacity-80"
              style={{ color: "#8B5CF6", border: "1px solid rgba(139,92,246,0.25)" }}
            >
              Open Coach <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-5"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
          >
            <div className="w-3 h-3 rounded-full mb-3" style={{ backgroundColor: "#F97316" }} />
            <h3 className="text-base font-bold" style={{ color: "#111827" }}>Decision Matrix</h3>
            <p className="text-sm mt-1 mb-4" style={{ color: "#6B7280" }}>Compare peptides side-by-side</p>
            <button
              onClick={() => navigate("/dashboard/protocols")}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:opacity-80"
              style={{ color: "#F97316", border: "1px solid rgba(249,115,22,0.25)" }}
            >
              Compare <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-5"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
          >
            <div className="w-3 h-3 rounded-full mb-3" style={{ backgroundColor: "#10B981" }} />
            <h3 className="text-base font-bold" style={{ color: "#111827" }}>2026 Legal Guide</h3>
            <p className="text-sm mt-1 mb-4" style={{ color: "#6B7280" }}>FDA status, state laws, access</p>
            <button
              onClick={() => navigate("/dashboard/protocols#legal-status")}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:opacity-80"
              style={{ color: "#10B981", border: "1px solid rgba(16,185,129,0.25)" }}
            >
              View Guide <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
            </button>
          </motion.div>
        </div>

        {/* Journey Progress Bar */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-5 md:p-6"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
        >
          <h2 className="text-base font-bold mb-4" style={{ color: "#111827" }}>Your 20-Week Journey</h2>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E5E7EB" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ backgroundColor: "#F97316", width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[13px]" style={{ color: "#6B7280" }}>Week {week} of 20</span>
            <span className="text-[13px]" style={{ color: "#6B7280" }}>{progressPercent}% complete</span>
          </div>
          <div className="flex justify-between mt-4">
            {phases.map((phase) => (
              <span
                key={phase.label}
                className="text-xs font-medium"
                style={{
                  color: currentPhase === phase.label ? "#F97316" : "#9CA3AF",
                  fontWeight: currentPhase === phase.label ? 700 : 500,
                }}
              >
                {phase.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Legal Footer */}
        <motion.div
          variants={itemVariants}
          className="text-xs text-center py-6"
          style={{ color: "#9CA3AF", borderTop: "1px solid #E5E7EB" }}
        >
          <p>For educational purposes only. Not medical advice. Always consult a healthcare provider.</p>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
