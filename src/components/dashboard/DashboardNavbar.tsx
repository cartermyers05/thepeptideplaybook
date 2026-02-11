import { 
  Home, 
  BookOpen,
  ClipboardList, 
  MessageCircle, 
  History,
  Settings,
  LogOut
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Logo } from "@/components/brand/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, label: "My Blueprint", path: "/dashboard/course" },
  { icon: ClipboardList, label: "My Plan", path: "/dashboard/protocol" },
  { icon: MessageCircle, label: "Chat", path: "/dashboard/coach" },
  { icon: History, label: "History", path: "/dashboard/history" },
];

export function DashboardNavbar() {
  const { signOut, user } = useAuth();
  const { data: profile } = useProfile();
  const location = useLocation();

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 hidden md:block">
      {/* Top row: Logo + User actions */}
      <div className="flex items-center justify-between px-6 py-3">
        <NavLink to="/dashboard">
          <Logo size="md" />
        </NavLink>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden lg:block">
                  {displayName}
                </span>
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <NavLink to="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="w-4 h-4" />
                  Settings
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => signOut()}
                className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Navigation tabs row */}
      <nav className="flex items-center justify-center gap-1 px-4 pb-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
                  transition-colors relative z-10
                  ${active ? "text-white" : "text-gray-600 hover:text-gray-900"}
                `}
              >
                <motion.div
                  whileHover={{ rotate: active ? 0 : 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
                <span className="hidden lg:inline">{item.label}</span>
                
                {/* Sliding pill indicator */}
                {active && (
                  <motion.div
                    layoutId="dashboard-nav-pill"
                    className="absolute inset-0 bg-black rounded-full"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </motion.div>
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}
