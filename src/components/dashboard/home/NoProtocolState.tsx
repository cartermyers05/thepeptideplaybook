import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ListChecks, BarChart3, Lock } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
};

const mono = "'JetBrains Mono', ui-monospace, monospace";
const heading = "'Outfit', sans-serif";

interface NoProtocolStateProps {
  firstName: string;
}

export function NoProtocolState({ firstName }: NoProtocolStateProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* Greeting */}
      <motion.div variants={itemVariants} className="mb-8 px-1">
        <h1
          className="text-[28px] md:text-[32px] font-extrabold text-foreground"
          style={{ letterSpacing: "-0.03em", fontFamily: heading }}
        >
          Hey {firstName}
        </h1>
        <p className="mt-1 text-[15px] font-medium text-muted-foreground">
          Your protocol starts here.
        </p>
      </motion.div>

      {/* Hero CTA Card */}
      <motion.div variants={itemVariants}>
        <div
          className="rounded-[24px] p-8 md:p-9 relative overflow-hidden bg-white border border-border"
          style={{ borderTop: "3px solid transparent", borderImage: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA) 1", borderImageSlice: "1 1 0 1" }}
        >
          <div className="relative z-10 md:max-w-[75%]">
            <span
              className="inline-block text-[11px] font-semibold uppercase mb-4"
              style={{ color: "#F97316", letterSpacing: "0.1em", fontFamily: mono }}
            >
              PROTOCOL ENGINE
            </span>

            <h2
              className="text-[26px] md:text-[36px] font-extrabold mb-3 text-foreground"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.15, fontFamily: heading }}
            >
              Build your{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F97316, #FB7185, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                personalized
              </span>{" "}
              peptide protocol
            </h2>

            <p className="text-[15px] leading-relaxed mb-7 max-w-[500px] text-muted-foreground" style={{ lineHeight: 1.6 }}>
              Our AI asks about your goals, body, and experience — then builds your exact stack with compounds, doses, schedule, and safety guidelines.
            </p>

            <button
              onClick={() => navigate("/dashboard/coach")}
              className="inline-flex items-center gap-2 px-8 font-bold text-[15px] text-white bg-foreground rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
              style={{ height: 52, fontFamily: heading }}
            >
              Build My Protocol
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="mt-2.5 text-xs text-muted-foreground" style={{ fontFamily: mono }}>
              Takes about 3 minutes
            </p>
          </div>
        </div>
      </motion.div>

      {/* Feature Preview Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-6">
        {[
          { icon: MessageCircle, label: "AI Coach", desc: "24/7 peptide guidance", color: "#F97316" },
          { icon: ListChecks, label: "Daily Protocol", desc: "Your exact daily stack", color: "#FB7185" },
          { icon: BarChart3, label: "Progress", desc: "Track your transformation", color: "#A78BFA" },
        ].map((card) => (
          <div
            key={card.label}
            className="relative rounded-[16px] p-5 transition-all duration-200 hover:opacity-70 bg-white border border-border opacity-50"
          >
            <Lock className="absolute top-3.5 right-3.5 w-3 h-3 text-muted-foreground opacity-40" />
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center mb-3.5 bg-muted">
              <card.icon className="w-4 h-4" style={{ color: card.color }} />
            </div>
            <p className="font-bold text-sm text-foreground" style={{ fontFamily: heading }}>
              {card.label}
            </p>
            <p className="text-xs mt-0.5 text-muted-foreground">
              {card.desc}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Trust Strip */}
      <motion.div variants={itemVariants} className="text-center mt-9 mb-6">
        <p className="text-[11px] uppercase text-muted-foreground" style={{ letterSpacing: "0.06em", fontFamily: mono }}>
          500+ STUDIES{" "}
          <span style={{ color: "rgba(249,115,22,0.4)" }}>·</span>{" "}
          ZERO BRO SCIENCE{" "}
          <span style={{ color: "rgba(249,115,22,0.4)" }}>·</span>{" "}
          YOUR DATA STAYS PRIVATE
        </p>
      </motion.div>
    </>
  );
}
