import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface FloatingChatButtonProps {
  onClick: () => void;
  shouldPulse?: boolean;
}

export function FloatingChatButton({ onClick, shouldPulse = false }: FloatingChatButtonProps) {
  return (
    <div className="fixed right-5 z-40" style={{ bottom: 96 }}>
      <motion.button
        onClick={onClick}
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #F97316, #EA580C)",
          boxShadow: "0 4px 20px rgba(249,115,22,0.3), 0 1px 4px rgba(0,0,0,0.2)",
          animation: shouldPulse ? "fab-pulse 2.5s infinite" : "none",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
      >
        <MessageCircle className="w-5 h-5 text-white" />
      </motion.button>

      <style>{`
        @keyframes fab-pulse {
          0% { box-shadow: 0 0 0 0 rgba(249,115,22,0.4), 0 4px 20px rgba(249,115,22,0.3); }
          70% { box-shadow: 0 0 0 14px rgba(249,115,22,0), 0 4px 20px rgba(249,115,22,0.3); }
          100% { box-shadow: 0 0 0 0 rgba(249,115,22,0), 0 4px 20px rgba(249,115,22,0.3); }
        }
      `}</style>
    </div>
  );
}
