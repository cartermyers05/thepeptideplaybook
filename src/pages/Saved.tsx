import { useState } from "react";
import {
  Sparkles,
  Menu,
  MessageSquare,
  History,
  Bookmark,
  BarChart3,
  Settings,
  Users,
  LogOut,
  X,
  Search,
  BookmarkMinus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SavedAnswer {
  id: string;
  question: string;
  answer: string;
  savedAt: Date;
}

const mockSavedAnswers: SavedAnswer[] = [
  {
    id: "1",
    question: "What's the optimal BPC-157 dosage for tendon repair?",
    answer: "Based on current research, the recommended dosage range is 250-500 mcg per injection, 1-2 times daily. Duration typically 4-6 weeks for tendon injuries.",
    savedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "2",
    question: "How do TB-500 and BPC-157 work together?",
    answer: "TB-500 and BPC-157 are often stacked because they work through complementary mechanisms. BPC-157 primarily promotes angiogenesis and tendon healing, while TB-500 upregulates actin for cell migration.",
    savedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

const navItems = [
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: History, label: "History", href: "/history" },
  { icon: Bookmark, label: "Saved", href: "/saved", active: true },
  { icon: BarChart3, label: "Stats", href: "/stats" },
  { icon: Users, label: "Refer Friends", href: "/referral" },
  { icon: Settings, label: "Account", href: "/account" },
];

export default function Saved() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const filteredAnswers = mockSavedAnswers.filter(
    (answer) =>
      answer.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      answer.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

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

      <main className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center gap-4 px-4 h-16 border-b border-border lg:px-6">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 lg:hidden">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Saved Answers</h1>
        </header>

        <div className="flex-1 p-4 lg:p-6">
          <div className="max-w-3xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search saved answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {filteredAnswers.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No saved answers</h3>
                <p className="text-muted-foreground mb-4">
                  Save helpful answers to access them quickly later
                </p>
                <Button asChild>
                  <Link to="/chat">Start chatting</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAnswers.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-card border border-border rounded-xl p-5"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-semibold">{item.question}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      >
                        <BookmarkMinus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">
                      Saved {item.savedAt.toLocaleDateString()}
                    </p>
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
