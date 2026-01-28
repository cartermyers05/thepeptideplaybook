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
    <div className="relative flex items-center gap-1 p-1.5 rounded-2xl glass-panel">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200",
            activeTab === tab.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
          whileHover={{ scale: activeTab === tab.id ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <tab.icon className="w-4 h-4" />
          <span className="hidden sm:inline">{tab.label}</span>
          
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab-indicator"
              className="absolute inset-0 rounded-xl bg-gradient-primary glow-primary"
              style={{ zIndex: -1 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 30 
              }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
