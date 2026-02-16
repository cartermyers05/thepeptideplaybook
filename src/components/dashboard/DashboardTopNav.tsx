import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const { signOut, user } = useAuth();
  const { data: profile } = useProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E7EB]">
      <nav className="flex items-center justify-between h-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/dashboard" className="flex-shrink-0 hover:opacity-80 transition-opacity">
          <Logo size="sm" />
        </Link>

        {/* Desktop Nav Pills */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className="px-4 py-2 rounded-full text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 transition-all"
              activeClassName="!bg-[#111827] !text-white"
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#111827]" />
            ) : (
              <Menu className="w-5 h-5 text-[#111827]" />
            )}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#111827] flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{initials}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-[#6B7280] hidden md:block" />
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

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/20 backdrop-blur-sm md:hidden z-40"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white p-4 space-y-1 border-b border-[#E5E7EB]"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 transition-all"
                activeClassName="!bg-[#111827] !text-white"
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
