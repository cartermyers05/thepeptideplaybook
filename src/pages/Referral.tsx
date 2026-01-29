import { useState, useEffect } from "react";
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
  Copy,
  Gift,
  Check,
  Twitter,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useReferrals, useCreateReferralCode } from "@/hooks/useReferrals";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: History, label: "History", href: "/history" },
  { icon: Bookmark, label: "Saved", href: "/saved" },
  { icon: BarChart3, label: "Stats", href: "/stats" },
  { icon: Users, label: "Refer Friends", href: "/referral", active: true },
  { icon: Settings, label: "Account", href: "/account" },
];

export default function Referral() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user, signOut } = useAuth();
  const { data: referralStats, isLoading } = useReferrals();
  const createReferralCode = useCreateReferralCode();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Create referral code on first visit if none exists
  useEffect(() => {
    if (!isLoading && !referralStats && user) {
      createReferralCode.mutate();
    }
  }, [isLoading, referralStats, user]);

  const referralCode = referralStats?.referralCode || "";
  const referralLink = referralCode ? `https://peptideplaybook.ai/ref/${referralCode}` : "";

  const handleCopyLink = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Share it with your friends to earn free months.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const isGeneratingCode = createReferralCode.isPending;

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
              <span className="font-bold">Peptide Playbook AI</span>
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
          <h1 className="text-lg font-semibold">Refer Friends</h1>
        </header>

        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-2xl mx-auto">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6">
                <Gift className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Give 14 Days, Get 1 Month Free
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Share Peptide Playbook AI with friends. When they subscribe, you both win.
              </p>
            </motion.div>

            {/* Referral link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-6 mb-6"
            >
              <h3 className="font-semibold mb-4">Your Referral Link</h3>
              {isLoading || isGeneratingCode ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <div className="flex gap-2">
                  <Input value={referralLink} readOnly className="font-mono text-sm" />
                  <Button onClick={handleCopyLink} variant="secondary" disabled={!referralLink}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              )}

              {/* Share buttons */}
              <div className="flex gap-3 mt-4">
                <Button variant="outline" size="sm" className="flex-1" asChild disabled={!referralLink}>
                  <a
                    href={`https://twitter.com/intent/tweet?text=Check out Peptide Playbook AI - the AI-powered peptide research assistant! Use my link for a 14-day free trial: ${referralLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="flex-1" asChild disabled={!referralLink}>
                  <a
                    href={`mailto:?subject=Check out Peptide Playbook AI&body=I've been using Peptide Playbook AI for peptide research and it's amazing! Use my link for a 14-day free trial: ${referralLink}`}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-4 mb-6"
            >
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                {isLoading ? (
                  <Skeleton className="h-9 w-8 mx-auto mb-1" />
                ) : (
                  <p className="text-3xl font-bold text-primary">{referralStats?.pending || 0}</p>
                )}
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                {isLoading ? (
                  <Skeleton className="h-9 w-8 mx-auto mb-1" />
                ) : (
                  <p className="text-3xl font-bold text-success">{referralStats?.completed || 0}</p>
                )}
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                {isLoading ? (
                  <Skeleton className="h-9 w-8 mx-auto mb-1" />
                ) : (
                  <p className="text-3xl font-bold">{referralStats?.monthsEarned || 0}</p>
                )}
                <p className="text-sm text-muted-foreground">Months earned</p>
              </div>
            </motion.div>

            {/* How it works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-secondary/50 rounded-xl p-6"
            >
              <h3 className="font-semibold mb-4">How It Works</h3>
              <div className="space-y-4">
                {[
                  { step: 1, text: "Share your unique referral link with friends" },
                  { step: 2, text: "They get 14 days free when they sign up" },
                  { step: 3, text: "When they subscribe, you get 1 month free" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0">
                      {item.step}
                    </div>
                    <p className="text-sm pt-1">{item.text}</p>
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
