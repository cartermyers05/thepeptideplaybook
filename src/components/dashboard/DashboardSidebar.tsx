import { 
  Home, 
  BookOpen,
  ClipboardList, 
  MessageCircle, 
  Settings,
  LogOut,
  ChevronLeft,
  Menu
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useCourse } from "@/hooks/useCourse";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, label: "My Course", path: "/dashboard/course" },
  { icon: ClipboardList, label: "My Plan", path: "/dashboard/protocol" },
  { icon: MessageCircle, label: "AI Coach", path: "/dashboard/coach" },
];

export function DashboardSidebar() {
  const { signOut, user } = useAuth();
  const { data: profile } = useProfile();
  const { userCourse } = useCourse();
  const [collapsed, setCollapsed] = useState(false);

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';
  const courseTitle = userCourse?.title || 'Getting Started';

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-card border border-border rounded-lg shadow-sm"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full flex flex-col transition-all duration-300 z-40",
          "bg-sidebar-background border-r border-sidebar-border",
          collapsed ? "-translate-x-full md:translate-x-0 md:w-16" : "w-60",
          "md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>
              <span className="font-semibold text-sidebar-foreground">Peptide Playbook</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-sidebar-accent/10 hidden md:block text-sidebar-foreground/60 hover:text-sidebar-foreground"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-white/5",
                  collapsed && "justify-center px-2"
                )}
                activeClassName="bg-primary/10 text-primary border-l-2 border-primary -ml-px pl-[calc(0.75rem+1px)]"
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="flex-1">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Settings & Footer */}
        <div className="p-3 border-t border-sidebar-border">
          <NavLink
            to="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-3",
              "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-white/5",
              collapsed && "justify-center px-2"
            )}
            activeClassName="bg-primary/10 text-primary"
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Settings</span>}
          </NavLink>

          {/* User info */}
          {!collapsed && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-sidebar-accent/20 flex items-center justify-center">
                <span className="text-primary font-medium text-sm">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sidebar-foreground text-sm font-medium truncate">{displayName}</p>
                <p className="text-sidebar-foreground/40 text-xs truncate">{courseTitle}</p>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className={cn(
              "w-full justify-start gap-3 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-white/5",
              collapsed && "justify-center px-2"
            )}
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
