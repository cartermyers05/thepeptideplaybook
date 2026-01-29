import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Newspaper } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import ChatInterface from "@/components/dashboard/ChatInterface";
import QuickNewsPanel from "@/components/dashboard/QuickNewsPanel";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import { cn } from "@/lib/utils";

type Tab = "chat" | "news";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] flex flex-col">
        {/* Welcome Banner */}
        <WelcomeBanner />

        {/* Mobile Tab Switcher */}
        <div className="lg:hidden mb-3">
          <div className="flex p-1 bg-muted rounded-lg">
            <TabButton
              active={activeTab === "chat"}
              onClick={() => setActiveTab("chat")}
              icon={Bot}
              label="AI Assistant"
            />
            <TabButton
              active={activeTab === "news"}
              onClick={() => setActiveTab("news")}
              icon={Newspaper}
              label="Latest News"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0">
          {/* Desktop: Side by side */}
          <div className="hidden lg:flex gap-4 h-full">
            {/* AI Panel - 60% */}
            <div className="flex-1 min-w-0">
              <div className="h-full rounded-xl border border-border bg-card overflow-hidden">
                <ChatInterface />
              </div>
            </div>

            {/* News Panel - 40% */}
            <div className="w-[360px] xl:w-[400px] flex-shrink-0">
              <QuickNewsPanel />
            </div>
          </div>

          {/* Mobile: Tabs */}
          <div className="lg:hidden h-full">
            <AnimatePresence mode="wait">
              {activeTab === "chat" ? (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="h-full rounded-xl border border-border bg-card overflow-hidden"
                >
                  <ChatInterface />
                </motion.div>
              ) : (
                <motion.div
                  key="news"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <QuickNewsPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

function TabButton({ active, onClick, icon: Icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
