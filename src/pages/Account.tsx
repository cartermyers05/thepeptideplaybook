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
  User,
  Lock,
  CreditCard,
  Bell,
  Shield,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: History, label: "History", href: "/history" },
  { icon: Bookmark, label: "Saved", href: "/saved" },
  { icon: BarChart3, label: "Stats", href: "/stats" },
  { icon: Users, label: "Refer Friends", href: "/referral" },
  { icon: Settings, label: "Account", href: "/account", active: true },
];

export default function Account() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [name, setName] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const { user, signOut } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (profile?.full_name) {
      setName(profile.full_name);
    }
  }, [profile]);

  // Calculate subscription status
  const subscriptionStatus = profile?.subscription_status || "trial";
  const trialEndsAt = profile?.trial_ends_at ? new Date(profile.trial_ends_at) : null;
  const isTrialActive = trialEndsAt && trialEndsAt > new Date();
  const trialDaysRemaining = trialEndsAt 
    ? Math.max(0, Math.ceil((trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const getStatusLabel = () => {
    if (subscriptionStatus === "active") return "Active";
    if (subscriptionStatus === "canceled") return "Canceled";
    if (isTrialActive) return `Trial (${trialDaysRemaining} days left)`;
    return "Expired";
  };

  const getStatusColor = () => {
    if (subscriptionStatus === "active") return "bg-success/10 text-success";
    if (subscriptionStatus === "canceled") return "bg-destructive/10 text-destructive";
    if (isTrialActive) return "bg-primary/10 text-primary";
    return "bg-muted text-muted-foreground";
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile.mutateAsync({ full_name: name });
      toast({
        title: "Profile updated",
        description: "Your changes have been saved.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

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
          <h1 className="text-lg font-semibold">Account Settings</h1>
        </header>

        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Profile */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Profile</h2>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-semibold">
                    {user?.email?.[0].toUpperCase() || "U"}
                  </div>
                  <Button variant="outline" size="sm">
                    Change photo
                  </Button>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    {isLoading ? (
                      <Skeleton className="h-10 w-full" />
                    ) : (
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user?.email || ""} disabled />
                    <p className="text-xs text-muted-foreground">
                      Contact support to change your email
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleSaveProfile} 
                  disabled={updateProfile.isPending}
                >
                  {updateProfile.isPending ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </motion.section>

            {/* Subscription */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Subscription</h2>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">
                            {subscriptionStatus === "active" ? "Pro Plan" : "Free Plan"}
                          </span>
                          <span className={cn("px-2 py-0.5 text-xs rounded-full", getStatusColor())}>
                            {getStatusLabel()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {subscriptionStatus === "active" 
                            ? "$20/month"
                            : isTrialActive 
                              ? `Trial ends on ${trialEndsAt?.toLocaleDateString()}`
                              : "Upgrade to continue using PeptideGPT"
                          }
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        {subscriptionStatus === "active" ? "Manage" : "Upgrade"}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    {subscriptionStatus === "active" && (
                      <>
                        <Separator className="my-4" />
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              Cancel subscription
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Cancel subscription?</DialogTitle>
                              <DialogDescription>
                                You'll lose access to PeptideGPT at the end of your billing period. Are you sure?
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline">Keep subscription</Button>
                              <Button variant="destructive">Yes, cancel</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                  </>
                )}
              </div>
            </motion.section>

            {/* Security */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Security</h2>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">
                        Change your password
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
              </div>
            </motion.section>

            {/* Notifications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Notifications</h2>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about your account
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing emails</p>
                    <p className="text-sm text-muted-foreground">
                      Tips, news, and product updates
                    </p>
                  </div>
                  <Switch
                    checked={marketingEmails}
                    onCheckedChange={setMarketingEmails}
                  />
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
}
