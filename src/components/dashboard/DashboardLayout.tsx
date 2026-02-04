import { ReactNode } from "react";
import { DashboardNavbar } from "./DashboardNavbar";
import { MobileBottomNav } from "./MobileBottomNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <DashboardNavbar />
      <MobileBottomNav />
      <main className="min-h-screen pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
