import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ListChecks, BarChart3, Lock } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const mono = "JetBrains Mono, ui-monospace, monospace";

interface NoProtocolStateProps {
  firstName: string;
}

export function NoProtocolState({ firstName }: NoProtocolStateProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* Greeting */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1
          className="text-[32px] font-bold"
          style={{ color: "#0A0A0A", letterSpacing: "-0.02em" }}
        >
          Hey {firstName} 👋
        </h1>
        <p className="mt-1 text-base" style={{ color: "#4B5563" }}>
          Ready to build your first protocol?
        </p>
      </motion.div>

      {/* Dark Hero CTA Card */}
      <motion.div
        variants={itemVariants}
        className="rounded-[20px] p-8 md:p-9 relative overflow-hidden"
        style={{ backgroundColor: "#111111" }}
      >
        {/* Dual hexagon decoration - desktop only */}
        <div className="hidden md:block absolute pointer-events-none" style={{ bottom: -60, right: -40 }}>
          <svg width={200} height={200} viewBox="0 0 200 200" style={{ transform: "rotate(15deg)" }}>
            <polygon
              points="100,0 200,50 200,150 100,200 0,150 0,50"
              fill="none"
              stroke="rgba(249,115,22,0.08)"
              strokeWidth={1.5}
            />
          </svg>
        </div>
        <div className="hidden md:block absolute pointer-events-none" style={{ bottom: -45, right: -55 }}>
          <svg width={180} height={180} viewBox="0 0 200 200" style={{ transform: "rotate(30deg)" }}>
            <polygon
              points="100,0 200,50 200,150 100,200 0,150 0,50"
              fill="none"
              stroke="rgba(167,139,250,0.06)"
              strokeWidth={1.5}
            />
          </svg>
        </div>

        <span
          className="inline-block text-[11px] font-semibold uppercase mb-3"
          style={{ color: "#F97316", letterSpacing: "0.08em", fontFamily: mono }}
        >
          AI-Powered Protocol Engine
        </span>

        <h2
          className="text-[28px] md:text-[36px] font-bold mb-3"
          style={{ color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.15 }}
        >
          Get your exact peptide protocol
        </h2>

        <p
          className="text-[15px] leading-relaxed mb-6 max-w-[520px]"
          style={{ color: "#9CA3AF", lineHeight: 1.6 }}
        >
          Our AI asks about your goals, body, and experience, then builds a personalized protocol with exact compounds, doses, and daily schedule.
        </p>

        <button
          onClick={() => navigate("/dashboard/coach")}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-base transition-all duration-200 hover:scale-[1.02]"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#111111",
            minHeight: 48,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#F97316";
            e.currentTarget.style.color = "#FFFFFF";
            e.currentTarget.style.boxShadow = "0 0 24px rgba(249,115,22,0.2), 0 0 48px rgba(251,113,133,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#FFFFFF";
            e.currentTarget.style.color = "#111111";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Build My Protocol
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="mt-2.5 text-[13px]" style={{ color: "#6B7280" }}>
          Takes about 3 minutes
        </p>
      </motion.div>

      {/* Feature Preview Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6">
        {[
          { icon: MessageCircle, label: "AI Coach", desc: "Ask anything about peptides", iconColor: "rgba(249,115,22,0.6)" },
          { icon: ListChecks, label: "Daily Actions", desc: "Exact doses and schedule", iconColor: "rgba(251,113,133,0.6)" },
          { icon: BarChart3, label: "Progress", desc: "Weekly check-ins and tracking", iconColor: "rgba(167,139,250,0.6)" },
        ].map((card) => (
          <div
            key={card.label}
            className="relative bg-white rounded-[14px] p-5 transition-all duration-200 hover:-translate-y-px hover:border-[#9CA3AF]"
            style={{ border: "1px solid #E8EAED" }}
          >
            <Lock className="absolute top-4 right-4 w-3 h-3" style={{ color: "#D1D5DB" }} />
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-3"
              style={{ backgroundColor: "#F3F4F6" }}
            >
              <card.icon className="w-[18px] h-[18px]" style={{ color: card.iconColor }} />
            </div>
            <p className="font-bold text-[15px] mb-0.5" style={{ color: "#0A0A0A" }}>
              {card.label}
            </p>
            <p className="text-[13px]" style={{ color: "#9CA3AF" }}>
              {card.desc}
            </p>
            <div className="mt-3 pt-3" style={{ borderTop: "1px solid #F3F4F6" }}>
              <p className="text-[11px]" style={{ color: "#D1D5DB" }}>
                Unlocks with your protocol
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Trust Strip */}
      <motion.div variants={itemVariants} className="text-center mt-12 mb-8">
        <p className="text-[13px]" style={{ color: "#9CA3AF", letterSpacing: "0.01em" }}>
          Built on 500+ studies <span style={{ color: "rgba(249,115,22,0.4)" }}>&nbsp;·&nbsp;</span> No bro science <span style={{ color: "rgba(167,139,250,0.4)" }}>&nbsp;·&nbsp;</span> Your data stays private
        </p>
      </motion.div>
    </>
  );
}
