import { ReactNode } from "react";
import { DashboardTopNav } from "./DashboardTopNav";
import { MobileBottomNav } from "./MobileBottomNav";
import { FloatingOrbs } from "@/components/landing/FloatingOrbs";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle aurora background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingOrbs variant="subtle" />
      </div>
      
      <DashboardTopNav />
      <main className="relative min-h-screen pt-20 pb-20 md:pb-8">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {children}
        </div>
      </main>
      <MobileBottomNav />
      <FloatingChatButton />
    </div>
  );
}
