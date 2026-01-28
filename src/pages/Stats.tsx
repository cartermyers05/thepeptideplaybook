import { useState } from "react";
import { motion } from "framer-motion";
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
  Flame,
  BookOpen,
  Clock,
  TrendingUp,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: History, label: "History", href: "/history" },
  { icon: Bookmark, label: "Saved", href: "/saved" },
  { icon: BarChart3, label: "Stats", href: "/stats", active: true },
  { icon: Users, label: "Refer Friends", href: "/referral" },
  { icon: Settings, label: "Account", href: "/account" },
];

const milestones = [
  { questions: 10, title: "Getting Started", unlocked: true },
  { questions: 50, title: "Research Enthusiast", unlocked: true },
  { questions: 100, title: "Research Pro", unlocked: false },
  { questions: 500, title: "Expert Tier", unlocked: false },
];

export default function Stats() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Mock stats data
  const stats = {
    questionsAsked: 47,
    questionsThisWeek: 12,
    studiesCited: 156,
    timeSavedHours: 23.5,
    timeSavedValue: 1175, // $50/hour
    currentStreak: 5,
    longestStreak: 12,
  };

  const nextMilestone = milestones.find((m) => !m.unlocked) || milestones[milestones.length - 1];
  const progressToNext = Math.min((stats.questionsAsked / nextMilestone.questions) * 100, 100);

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
          <h1 className="text-lg font-semibold">Your Stats</h1>
        </header>

        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Streak card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-primary rounded-2xl p-6 text-primary-foreground"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm mb-1">Current Streak</p>
                  <div className="flex items-center gap-2">
                    <Flame className="w-8 h-8" />
                    <span className="text-4xl font-bold">{stats.currentStreak}</span>
                    <span className="text-xl">days</span>
                  </div>
                  <p className="text-primary-foreground/80 text-sm mt-2">
                    Longest streak: {stats.longestStreak} days
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-6xl">🔥</p>
                </div>
              </div>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold">{stats.questionsAsked}</p>
                <p className="text-sm text-muted-foreground">Questions asked</p>
                <p className="text-xs text-primary mt-1">+{stats.questionsThisWeek} this week</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold">{stats.studiesCited}</p>
                <p className="text-sm text-muted-foreground">Studies cited</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5 text-success" />
                </div>
                <p className="text-2xl font-bold">{stats.timeSavedHours}h</p>
                <p className="text-sm text-muted-foreground">Time saved</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <p className="text-2xl font-bold">${stats.timeSavedValue}</p>
                <p className="text-sm text-muted-foreground">Value saved</p>
                <p className="text-xs text-muted-foreground mt-1">@$50/hr</p>
              </motion.div>
            </div>

            {/* Progress to next milestone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-primary" />
                <h3 className="font-semibold">Progress to Next Milestone</h3>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {stats.questionsAsked} / {nextMilestone.questions} questions
                  </span>
                  <span className="text-sm font-medium">{nextMilestone.title}</span>
                </div>
                <Progress value={progressToNext} className="h-3" />
              </div>

              {/* Milestones */}
              <div className="flex items-center justify-between mt-6">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.questions}
                    className={cn(
                      "flex flex-col items-center",
                      milestone.unlocked ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2",
                        milestone.unlocked
                          ? "bg-primary/10 border-primary"
                          : "bg-secondary border-border"
                      )}
                    >
                      {milestone.unlocked ? (
                        <Award className="w-5 h-5" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    <span className="text-xs text-center">{milestone.questions}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
