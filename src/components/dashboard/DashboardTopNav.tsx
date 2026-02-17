import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, LogOut, Settings, BookOpen, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Home", path: "/dashboard" },
  { label: "Chat", path: "/dashboard/chat" },
  { label: "Protocol", path: "/dashboard/protocol" },
];

export function DashboardTopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { data: profile } = useProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = location.pathname.startsWith("/dashboard");

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: isDark ? "#08080A" : "#FFFFFF",
        borderBottom: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #E5E7EB",
      }}
    >
      <nav className="flex items-center justify-between h-16 px-4 md:px-8 max-w-7xl mx-auto">
        <Link to="/dashboard" className="flex-shrink-0 hover:opacity-80 transition-opacity">
          <Logo size="sm" />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isDark
                  ? "text-[#4A4A5A] hover:text-[#EBEBF0] hover:bg-[#19191E]"
                  : "text-[#6B7280] hover:text-[#111827] hover:bg-gray-50"
              }`}
              activeClassName={isDark ? "!bg-[#19191E] !text-[#EBEBF0]" : "!bg-[#111827] !text-white"}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100/10 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" style={{ color: isDark ? "#EBEBF0" : "#111827" }} />
            ) : (
              <Menu className="w-5 h-5" style={{ color: isDark ? "#EBEBF0" : "#111827" }} />
            )}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-white/5 transition-colors">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: isDark ? "#19191E" : "#111827" }}
                >
                  <span className="text-white font-medium text-sm">{initials}</span>
                </div>
                <ChevronDown className="w-4 h-4 hidden md:block" style={{ color: isDark ? "#8A8A9A" : "#6B7280" }} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-3 py-2 border-b border-[#E5E7EB]">
                <p className="text-sm font-medium text-[#111827] truncate">{displayName}</p>
                <p className="text-xs text-[#6B7280] truncate">{user?.email}</p>
              </div>
              <DropdownMenuItem onClick={() => navigate("/guides")} className="cursor-pointer">
                <BookOpen className="w-4 h-4 mr-2" />
                Guides
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard/settings")} className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/20 backdrop-blur-sm md:hidden z-40"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="p-4 space-y-1"
            style={{
              backgroundColor: isDark ? "#111114" : "#FFFFFF",
              borderBottom: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #E5E7EB",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isDark
                    ? "text-[#4A4A5A] hover:text-[#EBEBF0] hover:bg-[#19191E]"
                    : "text-[#6B7280] hover:text-[#111827] hover:bg-gray-50"
                }`}
                activeClassName={isDark ? "!bg-[#19191E] !text-[#EBEBF0]" : "!bg-[#111827] !text-white"}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
