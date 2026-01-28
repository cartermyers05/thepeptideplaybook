import { useState, useEffect } from "react";
import { Rocket } from "lucide-react";

export function UrgencyBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [spotsClaimed, setSpotsClaimed] = useState(127);

  useEffect(() => {
    // Get or set end date in localStorage
    let endDate = localStorage.getItem('pp-launch-end');
    if (!endDate) {
      // Set to 48 hours from now
      endDate = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
      localStorage.setItem('pp-launch-end', endDate);
    }

    const timer = setInterval(() => {
      const diff = new Date(endDate as string).getTime() - Date.now();
      if (diff <= 0) {
        // Reset timer if expired
        const newEnd = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
        localStorage.setItem('pp-launch-end', newEnd);
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

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="urgency-banner">
      <div className="container px-4">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base flex-wrap">
          <Rocket className="w-4 h-4" />
          <span className="font-medium">
            Launch Price: <span className="font-bold">$47</span> → Increases to $67 in
          </span>
          <span className="countdown-timer">
            {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
          </span>
          <span className="hidden sm:inline">—</span>
          <span className="hidden sm:inline font-medium">{spotsClaimed} spots claimed</span>
        </div>
      </div>
    </div>
  );
}
