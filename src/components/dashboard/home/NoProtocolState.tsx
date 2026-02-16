import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ListChecks, BarChart3 } from "lucide-react";

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

      {/* Gradient-border hero card */}
      <motion.div
        variants={itemVariants}
        className="rounded-[20px] p-[1px]"
        style={{ background: "linear-gradient(135deg, #F97316, #FB7185, #A78BFA)" }}
      >
        <div
          className="rounded-[19px] p-8 md:p-9 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.04), rgba(167,139,250,0.04)), #FAFAFA" }}
        >
          {/* Floating hex cluster - desktop only */}
          <div className="hidden md:block absolute pointer-events-none" style={{ right: 32, top: "50%", transform: "translateY(-50%)" }}>
            {/* Large hex */}
            <svg width={80} height={80} viewBox="0 0 100 100" style={{ position: "absolute", right: 0, top: -40 }}>
              <polygon
                points="50,0 100,25 100,75 50,100 0,75 0,25"
                fill="none"
                stroke="rgba(249,115,22,0.12)"
                strokeWidth={1.5}
              />
            </svg>
            {/* Medium hex */}
            <svg width={56} height={56} viewBox="0 0 100 100" style={{ position: "absolute", right: 30, top: -10, transform: "rotate(15deg)" }}>
              <polygon
                points="50,0 100,25 100,75 50,100 0,75 0,25"
                fill="none"
                stroke="rgba(251,113,133,0.10)"
                strokeWidth={1.5}
              />
            </svg>
            {/* Small hex */}
            <svg width={40} height={40} viewBox="0 0 100 100" style={{ position: "absolute", right: 10, top: 20, transform: "rotate(-10deg)" }}>
              <polygon
                points="50,0 100,25 100,75 50,100 0,75 0,25"
                fill="none"
                stroke="rgba(167,139,250,0.08)"
                strokeWidth={1.5}
              />
            </svg>
          </div>

          <div className="relative z-10 md:max-w-[60%]">
            <span
              className="inline-block text-[11px] font-semibold uppercase mb-3"
              style={{ color: "#F97316", letterSpacing: "0.08em", fontFamily: mono }}
            >
              AI-Powered Protocol Engine
            </span>

            <h2
              className="text-[28px] md:text-[32px] font-bold mb-3"
              style={{ color: "#0A0A0A", letterSpacing: "-0.02em", lineHeight: 1.15 }}
            >
              Get your exact peptide protocol
            </h2>

            <p
              className="text-[15px] leading-relaxed mb-6 max-w-[520px]"
              style={{ color: "#4B5563", lineHeight: 1.6 }}
            >
              Our AI asks about your goals, body, and experience, then builds a personalized protocol with exact compounds, doses, and daily schedule.
            </p>

            <button
              onClick={() => navigate("/dashboard/coach")}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-[12px] font-semibold text-base text-white transition-all duration-200 hover:scale-[1.02] hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #F97316, #FB7185)",
                minHeight: 48,
                boxShadow: "0 4px 16px rgba(249,115,22,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 24px rgba(249,115,22,0.3), 0 0 48px rgba(251,113,133,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(249,115,22,0.15)";
              }}
            >
              Build My Protocol
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="mt-2.5 text-[13px]" style={{ color: "#9CA3AF" }}>
              Takes about 3 minutes
            </p>
          </div>
        </div>
      </motion.div>

      {/* Feature Preview Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6">
        {[
          { icon: MessageCircle, label: "AI Coach", desc: "Ask anything about peptides", accentColor: "#F97316", iconColor: "rgba(249,115,22,0.6)" },
          { icon: ListChecks, label: "Daily Actions", desc: "Exact doses and schedule", accentColor: "#FB7185", iconColor: "rgba(251,113,133,0.6)" },
          { icon: BarChart3, label: "Progress", desc: "Weekly check-ins and tracking", accentColor: "#A78BFA", iconColor: "rgba(167,139,250,0.6)" },
        ].map((card) => (
          <div
            key={card.label}
            className="relative bg-white rounded-[14px] p-5 transition-all duration-200 hover:-translate-y-px hover:border-[#9CA3AF]"
            style={{ border: "1px solid #E8EAED", borderTop: `2px solid ${card.accentColor}` }}
          >
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
