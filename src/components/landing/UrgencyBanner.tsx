import { useState, useEffect } from "react";

export function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Check if dismissed
    const dismissed = sessionStorage.getItem("urgency_dismissed");
    if (dismissed) {
      setIsVisible(false);
      return;
    }

    // Get or set end date in localStorage
    const getEndTime = () => {
      const stored = localStorage.getItem("urgency_end");
      if (stored) return new Date(stored);
      
      const end = new Date();
      end.setHours(end.getHours() + 24);
      localStorage.setItem("urgency_end", end.toISOString());
      return end;
    };

    const endTime = getEndTime();

    const timer = setInterval(() => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();

      if (diff <= 0) {
        // Reset for another 24 hours
        const newEnd = new Date();
        newEnd.setHours(newEnd.getHours() + 24);
        localStorage.setItem("urgency_end", newEnd.toISOString());
        return;
      }

      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("urgency_dismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2.5 px-4 relative">
      <div className="container flex items-center justify-center gap-2 text-sm">
        <span>🎉</span>
        <span>
          New Year Special: Get 20% off Pro with code{" "}
          <span className="font-bold">PEPTIDE2026</span> — Ends in{" "}
          <span className="font-mono font-semibold">
            {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </span>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity text-xl leading-none font-light"
        aria-label="Dismiss banner"
      >
        ×
      </button>
    </div>
  );
}
