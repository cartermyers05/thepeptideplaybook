import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DisclaimerBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("disclaimer_dismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("disclaimer_dismissed", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="mx-4 mt-4 lg:mx-6 overflow-hidden"
        >
          <div className="glass-panel bg-amber-500/5 border-amber-500/20 px-4 py-3">
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              </motion.div>
              <p className="text-sm text-foreground/80 flex-1">
                <span className="font-semibold text-amber-500">Educational Purposes Only.</span>{" "}
                PeptideGPT provides research information, not medical advice. Always consult a qualified healthcare provider.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-muted-foreground hover:text-foreground hover:bg-amber-500/10 p-1 h-auto rounded-lg"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
