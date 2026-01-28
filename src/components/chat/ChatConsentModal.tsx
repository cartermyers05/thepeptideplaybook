import { motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatConsentModalProps {
  onAccept: () => void;
  onClose: () => void;
}

export function ChatConsentModal({ onAccept, onClose }: ChatConsentModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-background rounded-xl border shadow-lg p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <h2 className="text-lg font-semibold">Before You Start</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-muted-foreground mb-4">
          This AI assistant provides educational information about peptide research. Please understand:
        </p>

        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-2 text-sm">
            <span className="text-destructive font-medium">✗</span>
            <span className="text-muted-foreground">This is NOT medical advice</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="text-destructive font-medium">✗</span>
            <span className="text-muted-foreground">I cannot recommend dosing, sources, or treatments</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="text-destructive font-medium">✗</span>
            <span className="text-muted-foreground">Most peptides discussed are NOT FDA-approved</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="text-destructive font-medium">✗</span>
            <span className="text-muted-foreground">Using this chatbot does not create any professional relationship</span>
          </li>
        </ul>

        <div className="flex items-start gap-2 mb-6 p-3 bg-success/5 rounded-lg border border-success/20">
          <span className="text-success font-medium">✓</span>
          <span className="text-sm text-muted-foreground">
            Always consult a healthcare provider before making health decisions
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          By continuing, you acknowledge these limitations.
        </p>

        <Button onClick={onAccept} className="w-full btn-primary-clean">
          I Understand — Start Chatting
        </Button>
      </motion.div>
    </motion.div>
  );
}
