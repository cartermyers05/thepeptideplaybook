import { useState, useEffect } from "react";
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

  if (!isVisible) return null;

  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
        <p className="text-sm text-amber-800 dark:text-amber-200 flex-1">
          <span className="font-semibold">Educational Purposes Only.</span>{" "}
          PeptideGPT provides research information, not medical advice. Always consult a qualified healthcare provider.
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="text-amber-600 hover:text-amber-800 hover:bg-amber-100 dark:text-amber-400 dark:hover:text-amber-200 dark:hover:bg-amber-900/50 p-1 h-auto"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
