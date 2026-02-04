import { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { MobileBottomNav } from "./MobileBottomNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <MobileBottomNav />
      <main className="md:ml-60 min-h-screen pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
