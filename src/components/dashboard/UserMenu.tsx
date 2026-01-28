import { Link, useNavigate } from "react-router-dom";
import { User, Settings, Users, LogOut, History, Bookmark, BarChart3 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 w-9 rounded-full p-0 bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          <span className="text-sm font-semibold text-primary-foreground">
            {user?.email?.[0].toUpperCase() || "U"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 glass-card">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.user_metadata?.full_name || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Mobile-only nav items */}
        <div className="md:hidden">
          <DropdownMenuItem asChild>
            <Link to="/history" className="flex items-center gap-2 cursor-pointer">
              <History className="w-4 h-4" />
              History
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/saved" className="flex items-center gap-2 cursor-pointer">
              <Bookmark className="w-4 h-4" />
              Saved
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/stats" className="flex items-center gap-2 cursor-pointer">
              <BarChart3 className="w-4 h-4" />
              Stats
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </div>

        <DropdownMenuItem asChild>
          <Link to="/account" className="flex items-center gap-2 cursor-pointer">
            <User className="w-4 h-4" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/referral" className="flex items-center gap-2 cursor-pointer">
            <Users className="w-4 h-4" />
            Refer Friends
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
