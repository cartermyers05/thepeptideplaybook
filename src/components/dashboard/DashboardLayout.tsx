import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { DashboardTopNav } from "./DashboardTopNav";
import { MobileBottomNav } from "./MobileBottomNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: isDashboard ? "#08080A" : "#FAFAFA",
        ...(isDashboard
          ? {
              backgroundImage: `
                radial-gradient(ellipse 80% 60% at 20% 40%, rgba(249,115,22,0.035) 0%, transparent 70%),
                radial-gradient(ellipse 60% 50% at 80% 30%, rgba(167,139,250,0.03) 0%, transparent 70%),
                radial-gradient(ellipse 70% 40% at 50% 80%, rgba(251,113,133,0.025) 0%, transparent 70%),
                radial-gradient(circle 1px at center, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 100% 100%, 100% 100%, 20px 20px",
            }
          : {}),
      }}
    >
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
