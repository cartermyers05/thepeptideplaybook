import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HIDDEN_PATHS = ["/sales", "/checkout", "/login", "/signup"];

export function MobileStickyBar() {
  const { pathname } = useLocation();

  const isHidden =
    HIDDEN_PATHS.some((p) => pathname === p) ||
    pathname.startsWith("/dashboard");

  if (isHidden) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border px-4 py-3 flex items-center justify-between">
      <span className="text-sm font-bold text-foreground">
        Full Access — $67
      </span>
      <Link to="/sales">
        <Button className="bg-primary text-primary-foreground font-bold text-sm px-5 py-3 rounded-[10px] min-h-[44px]">
          Get Started →
        </Button>
      </Link>
    </div>
  );
}
