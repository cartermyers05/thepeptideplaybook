import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, History, Bookmark, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import UserMenu from "./UserMenu";
import TabSwitcher from "./TabSwitcher";

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
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border"
    >
      <div className="container px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold hidden sm:block">
              Peptide Playbook AI
            </span>
          </Link>

          {/* Centered Tab Switcher */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <TabSwitcher activeTab={activeTab} onTabChange={onTabChange} />
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
                      className="h-8 w-8"
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
      </div>
    </motion.header>
  );
}
