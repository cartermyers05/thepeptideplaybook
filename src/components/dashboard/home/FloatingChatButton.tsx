import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface FloatingChatButtonProps {
  onClick: () => void;
  shouldPulse?: boolean;
}

export function FloatingChatButton({ onClick, shouldPulse = false }: FloatingChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed right-5 z-40 w-14 h-14 rounded-full flex items-center justify-center"
      style={{
        bottom: 96, // above mobile bottom nav
        backgroundColor: "#F97316",
        boxShadow: "0 4px 16px rgba(249,115,22,0.35)",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={
        shouldPulse
          ? {
              boxShadow: [
                "0 4px 16px rgba(249,115,22,0.35)",
                "0 4px 24px rgba(249,115,22,0.5)",
                "0 4px 16px rgba(249,115,22,0.35)",
              ],
            }
          : {}
      }
      transition={shouldPulse ? { duration: 2, repeat: Infinity } : {}}
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </motion.button>
  );
}
