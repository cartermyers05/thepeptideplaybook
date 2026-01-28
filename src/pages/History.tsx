import { useState } from "react";
import {
  Sparkles,
  Menu,
  MessageSquare,
  History as HistoryIcon,
  Bookmark,
  BarChart3,
  Settings,
  Users,
  LogOut,
  X,
  Search,
  Trash2,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  title: string;
  preview: string;
  date: Date;
  messagesCount: number;
}

// Mock data for now
const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "BPC-157 Dosing for Tendon Repair",
    preview: "Based on current research, here's what we know about BPC-157...",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    messagesCount: 4,
  },
  {
    id: "2",
    title: "TB-500 and BPC-157 Stack",
    preview: "Combining TB-500 with BPC-157 is a popular protocol...",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    messagesCount: 6,
  },
  {
    id: "3",
    title: "Ipamorelin vs CJC-1295",
    preview: "Both are growth hormone secretagogues but work differently...",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48),
    messagesCount: 3,
  },
];

const navItems = [
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: HistoryIcon, label: "History", href: "/history", active: true },
  { icon: Bookmark, label: "Saved", href: "/saved" },
  { icon: BarChart3, label: "Stats", href: "/stats" },
  { icon: Users, label: "Refer Friends", href: "/referral" },
  { icon: Settings, label: "Account", href: "/account" },
];

export default function History() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const filteredConversations = mockConversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return diffHours === 0 ? "Just now" : `${diffHours}h ago`;
    } else if (diffHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold">PeptideGPT</span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <ScrollArea className="flex-1 py-4">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    item.active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                {user?.email?.[0].toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.user_metadata?.full_name || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center gap-4 px-4 h-16 border-b border-border lg:px-6">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 lg:hidden">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">History</h1>
        </header>

        <div className="flex-1 p-4 lg:p-6">
          <div className="max-w-3xl mx-auto">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Conversations list */}
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12">
                <HistoryIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start chatting to see your history here
                </p>
                <Button asChild>
                  <Link to="/chat">Start a conversation</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="group bg-card border border-border rounded-xl p-4 hover:shadow-soft transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 truncate">{conv.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {conv.preview}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(conv.date)}
                          </span>
                          <span>{conv.messagesCount} messages</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
