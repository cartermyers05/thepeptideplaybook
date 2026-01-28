import { motion } from "framer-motion";
import { Newspaper, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabSwitcherProps {
  activeTab: "news" | "chat";
  onTabChange: (tab: "news" | "chat") => void;
}

const tabs = [
  { id: "news" as const, label: "News", icon: Newspaper },
  { id: "chat" as const, label: "AI Chat", icon: MessageSquare },
];

export default function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <div className="relative flex items-center gap-1 p-1 rounded-lg bg-secondary border border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <tab.icon className="w-4 h-4" />
          <span className="hidden sm:inline">{tab.label}</span>
          
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 rounded-md bg-primary"
              style={{ zIndex: -1 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 35 
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
