import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

interface FloatingChatButtonProps {
  onClick: () => void;
  shouldPulse?: boolean;
}

export function FloatingChatButton({ onClick, shouldPulse = false }: FloatingChatButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed right-5 z-40" style={{ bottom: 96 }}>
      {/* Expanding ring pulse */}
      {shouldPulse && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            width: 52,
            height: 52,
            border: "2px solid #F97316",
          }}
          animate={{
            scale: [1, 1.25],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeOut",
          }}
        />
      )}
      <motion.button
        onClick={onClick}
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-colors duration-200"
        style={{
          backgroundColor: hovered ? "#F97316" : "#111111",
          boxShadow: hovered
            ? "0 4px 24px rgba(249,115,22,0.3), 0 8px 40px rgba(251,113,133,0.15)"
            : "0 4px 20px rgba(249,115,22,0.2), 0 8px 32px rgba(251,113,133,0.1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-5 h-5 text-white" />
      </motion.button>
    </div>
  );
}
