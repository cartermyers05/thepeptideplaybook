import { Home, MessageCircle, ClipboardList, TrendingUp } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: MessageCircle, label: "Coach", path: "/dashboard/coach" },
  { icon: ClipboardList, label: "Protocol", path: "/dashboard/protocol" },
  { icon: TrendingUp, label: "Progress", path: "/dashboard/progress" },
];

export function MobileBottomNav() {
  const location = useLocation();
  const isDark = location.pathname.startsWith("/dashboard");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-pb"
      style={{
        backgroundColor: isDark ? "#08080A" : "#FFFFFF",
        borderTop: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #E5E7EB",
      }}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[60px] transition-colors ${
                isDark ? "text-[#4A4A5A]" : "text-[#9CA3AF]"
              }`}
              activeClassName={isDark ? "!text-[#EBEBF0]" : "!text-[#111827]"}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
