import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ClipboardList, Shield } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useQuizResponse } from "@/hooks/useQuizResponse";
import { getGoalLabel, getPeptideMatch } from "@/lib/quizPersonalization";
import { getPeptideDeepDive, type LegalStatus } from "@/lib/peptideDeepDive";

// Goal-specific starter prompts for quick action cards
const goalChatPrompts: Record<string, string> = {
  weight_loss: "What side effects should I expect with semaglutide?",
  recovery: "Is BPC-157 safe with anti-inflammatory medications?",
  longevity: "What's the evidence for GHK-Cu in skin rejuvenation?",
  performance: "How does CJC-1295 affect natural growth hormone?",
  general: "What's the most well-researched peptide right now?",
};

// Legal status display helper
const legalStatusConfig: Record<LegalStatus, { label: string; color: string; bgColor: string }> = {
  fda_approved: { label: "FDA Approved", color: "#10B981", bgColor: "rgba(16,185,129,0.1)" },
  compounding: { label: "Compounding", color: "#F59E0B", bgColor: "rgba(245,158,11,0.1)" },
  research_only: { label: "Research Only", color: "#EF4444", bgColor: "rgba(239,68,68,0.1)" },
};

// Evidence circles component
function EvidenceCircles({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`${rating} out of 5 evidence rating`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="rounded-full inline-block"
          style={{
            width: size,
            height: size,
            backgroundColor: i < rating ? "#F97316" : "#E5E7EB",
          }}
        />
      ))}
    </span>
  );
}

// Legal badge component
function LegalBadge({ status }: { status: LegalStatus }) {
  const config = legalStatusConfig[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: config.bgColor, color: config.color }}
    >
      {config.label}
    </span>
  );
}

// Popular guides
const popularGuides = [
  { title: "BPC-157: Complete Guide", category: "Recovery", readTime: "12 min", href: "/guides/bpc-157-complete-guide" },
  { title: "Semaglutide Guide", category: "Weight Loss", readTime: "15 min", href: "/guides/semaglutide-complete-guide" },
  { title: "BPC-157 vs TB-500", category: "Comparison", readTime: "9 min", href: "/guides/bpc-157-vs-tb-500" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const { data: quizResponse } = useQuizResponse();

  const goalLabel = quizResponse ? getGoalLabel(quizResponse.primary_goal) : null;
  const peptideMatch = quizResponse ? getPeptideMatch(quizResponse.primary_goal) : null;

  // Get deep dive data for matched peptides
  const primaryData = peptideMatch ? getPeptideDeepDive(peptideMatch.primary) : null;
  const secondaryData = peptideMatch ? getPeptideDeepDive(peptideMatch.secondary) : null;

  const chatPrompt = quizResponse ? (goalChatPrompts[quizResponse.primary_goal] || goalChatPrompts.general) : goalChatPrompts.general;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-8 py-8">
          <Skeleton className="h-12 w-72 rounded-xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10 py-4 md:py-8"
      >
        {/* Section 1: Welcome + Personalization */}
        <motion.div variants={itemVariants}>
          <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight" style={{ color: "#111827" }}>
            {goalLabel ? `Your ${goalLabel} Blueprint` : "Your Peptide Blueprint"}
          </h1>
          {quizResponse && (
            <p className="text-sm font-mono mt-1" style={{ color: "#9CA3AF" }}>
              Personalized for {goalLabel?.toLowerCase()} · {quizResponse.age_range || "All ages"} · {quizResponse.experience_level} · Updated Feb 2026
            </p>
          )}
        </motion.div>

        {/* Section 2: Your Match (Hero Card) */}
        {peptideMatch && primaryData && (
          <motion.div
            variants={itemVariants}
            className="rounded-2xl p-6 md:p-7"
            style={{
              backgroundColor: "#FFF7ED",
              boxShadow: "0 1px 3px rgba(249,115,22,0.08), 0 4px 12px rgba(249,115,22,0.04)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
              {/* Primary Match - Left (60%) */}
              <div className="md:col-span-3">
                <span
                  className="text-[11px] font-mono uppercase tracking-[2px] font-semibold"
                  style={{ color: "#F97316" }}
                >
                  PRIMARY MATCH
                </span>
                <h2 className="text-[28px] font-bold mt-1" style={{ color: "#111827" }}>
                  {primaryData.name}
                </h2>
                <p className="text-[15px] mt-1" style={{ color: "#6B7280" }}>
                  {primaryData.summary}
                </p>
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <EvidenceCircles rating={primaryData.evidenceRating} />
                  <span className="text-[13px]" style={{ color: "#6B7280" }}>
                    Strong Evidence · {peptideMatch.studies} clinical trials
                  </span>
                </div>
                <div className="mt-2">
                  <LegalBadge status={primaryData.legalStatus} />
                </div>
              </div>

              {/* Secondary Match - Right (40%) */}
              {secondaryData && (
                <div className="md:col-span-2 md:border-l md:border-[#F97316]/20 md:pl-6">
                  <span
                    className="text-[11px] font-mono uppercase tracking-[2px]"
                    style={{ color: "#9CA3AF" }}
                  >
                    ALSO MATCHED
                  </span>
                  <h3 className="text-[20px] font-bold mt-1" style={{ color: "#111827" }}>
                    {secondaryData.name}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                    {secondaryData.summary}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <EvidenceCircles rating={secondaryData.evidenceRating} size={10} />
                  </div>
                  <div className="mt-2">
                    <LegalBadge status={secondaryData.legalStatus} />
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/dashboard/protocols")}
              className="mt-6 w-full md:w-auto px-8 py-3 rounded-full text-white font-semibold text-[15px] transition-all hover:opacity-90"
              style={{ backgroundColor: "#111827", minHeight: 48 }}
            >
              View Full Protocol <ArrowRight className="w-4 h-4 inline ml-1" />
            </button>
          </motion.div>
        )}

        {/* Fallback if no quiz data */}
        {!peptideMatch && (
          <motion.div
            variants={itemVariants}
            className="rounded-2xl p-6 bg-white"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
          >
            <h2 className="text-xl font-bold mb-2" style={{ color: "#111827" }}>Get Your Personalized Blueprint</h2>
            <p className="text-sm mb-4" style={{ color: "#6B7280" }}>Take the quiz to get matched with research-backed peptides for your goals.</p>
            <button
              onClick={() => navigate("/quiz")}
              className="px-6 py-3 rounded-full text-white font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#111827" }}
            >
              Take the Quiz <ArrowRight className="w-4 h-4 inline ml-1" />
            </button>
          </motion.div>
        )}

        {/* Section 3: Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* AI Research Coach */}
          <motion.button
            variants={itemVariants}
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            onClick={() => navigate("/dashboard/chat")}
            className="bg-white rounded-2xl text-left overflow-hidden transition-all"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
          >
            <div className="h-1" style={{ backgroundColor: "#F97316" }} />
            <div className="p-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: "rgba(249,115,22,0.1)" }}>
                <MessageCircle className="w-5 h-5" style={{ color: "#F97316" }} />
              </div>
              <h3 className="text-[18px] font-bold mb-1" style={{ color: "#111827" }}>Ask the AI Coach</h3>
              <p className="text-sm mb-3" style={{ color: "#6B7280" }}>Every answer cites peer-reviewed research</p>
              <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB" }}>
                <p className="text-[13px] italic" style={{ color: "#9CA3AF" }}>
                  "{chatPrompt}"
                </p>
              </div>
            </div>
          </motion.button>

          {/* Doctor Script */}
          <motion.button
            variants={itemVariants}
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            onClick={() => navigate("/dashboard/protocols#doctor-script")}
            className="bg-white rounded-2xl text-left overflow-hidden transition-all"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
          >
            <div className="h-1" style={{ backgroundColor: "#8B5CF6" }} />
            <div className="p-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: "rgba(139,92,246,0.1)" }}>
                <ClipboardList className="w-5 h-5" style={{ color: "#8B5CF6" }} />
              </div>
              <h3 className="text-[18px] font-bold mb-1" style={{ color: "#111827" }}>Doctor Conversation Script</h3>
              <p className="text-sm mb-3" style={{ color: "#6B7280" }}>Word-for-word what to say at your appointment</p>
              <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB" }}>
                <p className="text-[13px] italic" style={{ color: "#9CA3AF" }}>
                  "I've been researching {peptideMatch?.primary || "peptides"} for {goalLabel?.toLowerCase() || "wellness"}..."
                </p>
              </div>
            </div>
          </motion.button>

          {/* Legal Guide */}
          <motion.button
            variants={itemVariants}
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            onClick={() => navigate("/dashboard/protocols#legal-status")}
            className="bg-white rounded-2xl text-left overflow-hidden transition-all"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
          >
            <div className="h-1" style={{ backgroundColor: "#F59E0B" }} />
            <div className="p-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
                <Shield className="w-5 h-5" style={{ color: "#F59E0B" }} />
              </div>
              <h3 className="text-[18px] font-bold mb-1" style={{ color: "#111827" }}>2026 Legal Status</h3>
              <p className="text-sm mb-3" style={{ color: "#6B7280" }}>FDA status, prescriptions, availability</p>
              <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB" }}>
                {primaryData ? (
                  <p className="text-[13px]" style={{ color: primaryData.legalStatus === "fda_approved" ? "#10B981" : "#F59E0B" }}>
                    {primaryData.legalStatus === "fda_approved" ? "✓" : "⚠"} {primaryData.name} — {legalStatusConfig[primaryData.legalStatus].label}
                  </p>
                ) : (
                  <p className="text-[13px] italic" style={{ color: "#9CA3AF" }}>
                    Check legal status of any peptide
                  </p>
                )}
              </div>
            </div>
          </motion.button>
        </div>

        {/* Section 4: Popular Guides */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#6B7280" }}>
              Popular Guides
            </h2>
            <button
              onClick={() => navigate("/guides")}
              className="text-sm font-medium flex items-center gap-1 hover:opacity-70 transition-opacity"
              style={{ color: "#6B7280" }}
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {popularGuides.map((guide, index) => (
              <motion.button
                key={guide.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                onClick={() => navigate(guide.href)}
                className="bg-white rounded-2xl text-left overflow-hidden transition-all"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
              >
                <div className="p-5">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full inline-block mb-3"
                    style={{ backgroundColor: "rgba(16,185,129,0.1)", color: "#10B981" }}
                  >
                    {guide.category}
                  </span>
                  <p className="font-semibold mb-1" style={{ color: "#111827" }}>
                    {guide.title}
                  </p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{guide.readTime} read</p>
                </div>
              </motion.button>
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
