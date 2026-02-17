import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface FloatingChatButtonProps {
  onClick: () => void;
  shouldPulse?: boolean;
}

export function FloatingChatButton({ onClick, shouldPulse = false }: FloatingChatButtonProps) {
  return (
    <div className="fixed right-5 z-40" style={{ bottom: 96 }}>
      {shouldPulse && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            width: 52,
            height: 52,
            animation: "fab-pulse 2.5s infinite",
          }}
        />
      )}
      <style>{`
        @keyframes fab-pulse {
          0% { box-shadow: 0 0 0 0 rgba(10,10,10,0.3); }
          70% { box-shadow: 0 0 0 14px rgba(10,10,10,0); }
          100% { box-shadow: 0 0 0 0 rgba(10,10,10,0); }
        }
      `}</style>
      <motion.button
        onClick={onClick}
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center bg-foreground text-background"
        style={{
          boxShadow: "0 4px 20px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
      >
        <MessageCircle className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
