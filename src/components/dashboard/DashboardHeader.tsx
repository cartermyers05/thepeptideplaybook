import { Link } from "react-router-dom";
import { Sparkles, History, Bookmark, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import UserMenu from "./UserMenu";
import FloatingTabs from "./FloatingTabs";

interface DashboardHeaderProps {
  activeTab: "news" | "chat";
  onTabChange: (tab: "news" | "chat") => void;
}

const navItems = [
  { icon: History, label: "History", href: "/history" },
  { icon: Bookmark, label: "Saved", href: "/saved" },
  { icon: BarChart3, label: "Stats", href: "/stats" },
];

export default function DashboardHeader({ activeTab, onTabChange }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/50">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg hidden sm:block">PeptideGPT</span>
        </Link>

        {/* Centered Floating Tabs */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <FloatingTabs activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        {/* Right side: Nav icons + User menu */}
        <div className="flex items-center gap-1">
          {/* Icon nav buttons - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1 mr-2">
            {navItems.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover-glow"
                    asChild
                  >
                    <Link to={item.href}>
                      <item.icon className="w-4 h-4" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
