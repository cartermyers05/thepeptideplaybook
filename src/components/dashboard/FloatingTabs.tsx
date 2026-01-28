import { motion } from "framer-motion";
import { Newspaper, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingTabsProps {
  activeTab: "news" | "chat";
  onTabChange: (tab: "news" | "chat") => void;
}

const tabs = [
  { id: "news" as const, label: "News", icon: Newspaper },
  { id: "chat" as const, label: "AI Chat", icon: MessageSquare },
];

export default function FloatingTabs({ activeTab, onTabChange }: FloatingTabsProps) {
  return (
    <div className="relative flex items-center gap-1 p-1 rounded-full glass-card">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
            activeTab === tab.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <tab.icon className="w-4 h-4" />
          <span className="hidden sm:inline">{tab.label}</span>
          
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab-indicator"
              className="absolute inset-0 rounded-full bg-gradient-primary"
              style={{ zIndex: -1 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
