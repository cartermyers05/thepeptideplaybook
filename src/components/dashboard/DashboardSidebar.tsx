import { 
  Home, 
  BookOpen, 
  MessageSquare, 
  ClipboardCheck, 
  Database, 
  Bot, 
  Mail, 
  Users, 
  Settings,
  LogOut,
  ChevronLeft,
  Menu
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useTier } from "@/hooks/useTier";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  requiredTier?: "starter" | "pro" | "insider";
}

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, label: "The Guide", path: "/dashboard/guide", requiredTier: "starter" },
  { icon: MessageSquare, label: "Doctor Scripts", path: "/dashboard/scripts", requiredTier: "starter" },
  { icon: ClipboardCheck, label: "Source Checklist", path: "/dashboard/checklist", requiredTier: "starter" },
  { icon: Database, label: "Peptide Database", path: "/dashboard/database", requiredTier: "pro" },
  { icon: Bot, label: "AI Assistant", path: "/dashboard/chat", requiredTier: "pro" },
  { icon: Mail, label: "Research Digest", path: "/dashboard/digest", requiredTier: "pro" },
  { icon: Users, label: "Community", path: "/dashboard/community", requiredTier: "insider" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export function DashboardSidebar() {
  const { hasAccess, tier } = useTier();
  const { signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-background border rounded-lg shadow-sm"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar-background border-r border-sidebar-border flex flex-col transition-all duration-300 z-40",
          collapsed ? "-translate-x-full md:translate-x-0 md:w-16" : "w-64",
          "md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {!collapsed && (
            <span className="font-semibold text-sidebar-foreground">Peptide Playbook</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-sidebar-accent hidden md:block"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isLocked = item.requiredTier && !hasAccess(item.requiredTier);
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  "text-sidebar-foreground hover:bg-sidebar-accent",
                  isLocked && "opacity-50"
                )}
                activeClassName="bg-sidebar-accent text-sidebar-primary"
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {isLocked && (
                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                        {item.requiredTier?.toUpperCase()}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-sidebar-border">
          {!collapsed && (
            <div className="px-3 py-2 mb-2">
              <p className="text-xs text-muted-foreground">Current Plan</p>
              <p className="text-sm font-medium capitalize">{tier}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="w-full justify-start gap-3"
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && "Sign Out"}
          </Button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
