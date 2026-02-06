import { Home, MessageCircle, FlaskConical, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: MessageCircle, label: "Chat", path: "/dashboard/chat" },
  { icon: FlaskConical, label: "Protocols", path: "/dashboard/protocols" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border md:hidden safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className="flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[60px] text-muted-foreground transition-colors"
              activeClassName="text-foreground"
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
