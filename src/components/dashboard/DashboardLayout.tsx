import { ReactNode } from "react";
import { DashboardTopNav } from "./DashboardTopNav";
import { MobileBottomNav } from "./MobileBottomNav";
import { DashboardBackground } from "./home/DashboardBackground";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen relative bg-[#FAFAFA]">
      <DashboardBackground />
      <DashboardTopNav />
      <main className="relative min-h-screen pt-20 pb-20 md:pb-8">
        <div className="max-w-[1080px] mx-auto px-4 md:px-8">
          {children}
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
}
