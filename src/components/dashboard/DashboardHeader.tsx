import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="mx-4 mt-4 lg:mx-6">
        <div className="glass-panel flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <span className="font-bold text-lg hidden sm:block group-hover:text-primary transition-colors">
              PeptideGPT
            </span>
          </Link>

          {/* Centered Floating Tabs */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <FloatingTabs activeTab={activeTab} onTabChange={onTabChange} />
          </div>

          {/* Right side: Nav icons + User menu */}
          <div className="flex items-center gap-1">
            {/* Icon nav buttons - hidden on mobile */}
            <nav className="hidden md:flex items-center gap-1 mr-2">
              {navItems.map((item, index) => (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 hover-glow rounded-xl"
                        asChild
                      >
                        <Link to={item.href}>
                          <item.icon className="w-4 h-4" />
                          <span className="sr-only">{item.label}</span>
                        </Link>
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="glass-panel border-0">
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
