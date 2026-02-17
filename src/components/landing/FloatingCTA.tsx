import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 600px
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden animate-fade-up">
      <Link to="/signup">
        <Button size="lg" className="btn-primary-clean h-12 px-6 shadow-lg">
          Get Your Blueprint
          <span className="ml-2">→</span>
        </Button>
      </Link>
    </div>
  );
}
