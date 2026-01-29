import { Link } from "react-router-dom";
import { 
  BookOpen, ClipboardCheck, Database, 
  Bot, Mail, Users, ArrowRight, Sparkles, Lock,
  TrendingUp, Clock, CheckCircle2, FileText
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { useTier, type Tier } from "@/hooks/useTier";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "The Guide",
    description: "Complete peptide education from basics to advanced",
    icon: BookOpen,
    href: "/dashboard/guide",
    tier: "starter" as Tier,
    stats: "8 chapters",
    featured: true,
  },
  {
    title: "Peptide Database",
    description: "Search and filter 41+ research peptides",
    icon: Database,
    href: "/dashboard/database",
    tier: "pro" as Tier,
    stats: "41 peptides",
  },
  {
    title: "AI Assistant",
    description: "Get research-backed answers instantly",
    icon: Bot,
    href: "/dashboard/chat",
    tier: "pro" as Tier,
    stats: "Unlimited",
  },
  {
    title: "Doctor Scripts",
    description: "Conversation templates for your physician",
    icon: FileText,
    href: "/dashboard/scripts",
    tier: "starter" as Tier,
    stats: "5 templates",
  },
  {
    title: "Source Checklist",
    description: "Evaluate vendors like a pro",
    icon: ClipboardCheck,
    href: "/dashboard/checklist",
    tier: "starter" as Tier,
    stats: "12 criteria",
  },
  {
    title: "Research Digest",
    description: "Monthly curated research updates",
    icon: Mail,
    href: "/dashboard/digest",
    tier: "pro" as Tier,
    stats: "Monthly",
  },
  {
    title: "Community",
    description: "Connect with other researchers",
    icon: Users,
    href: "/dashboard/community",
    tier: "insider" as Tier,
    stats: "500+ members",
  },
];

const updates = [
  { title: "Guide updated: January 2026", date: "Jan 15", isNew: true },
  { title: "3 new peptides added to database", date: "Jan 10", isNew: true },
  { title: "New research digest available", date: "Jan 1", isNew: false },
];

export default function Dashboard() {
  const { data: profile } = useProfile();
  const { tier, hasAccess, isPaid } = useTier();

  const firstName = profile?.full_name?.split(" ")[0] || "there";
  const questionsAsked = profile?.questions_asked || 0;

  const tierLabels: Record<Tier, string> = {
    free: "Free Account",
    starter: "Starter Member",
    pro: "Pro Member",
    insider: "Insider Member",
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero welcome section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-background to-background border border-border p-8">
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Welcome back
                </p>
                <h1 className="text-3xl font-semibold tracking-tight mb-2">
                  {firstName}! 👋
                </h1>
                <p className="text-muted-foreground">
                  Your peptide education hub is ready.
                </p>
              </div>
              
              {/* Tier badge */}
              <div className="flex-shrink-0">
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
                  tier === "free" && "bg-muted text-muted-foreground",
                  tier === "starter" && "bg-slate-100 text-slate-700",
                  tier === "pro" && "bg-emerald-100 text-emerald-700",
                  tier === "insider" && "bg-amber-100 text-amber-700"
                )}>
                  {tierLabels[tier]}
                </span>
              </div>
            </div>
            
            {/* Quick stats for paid users */}
            {isPaid && (
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                <div className="text-center sm:text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Guide Progress</p>
                  <p className="text-lg font-semibold mt-1">Chapter 3</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Peptides Explored</p>
                  <p className="text-lg font-semibold mt-1">12 of 41</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">AI Questions Asked</p>
                  <p className="text-lg font-semibold mt-1">{questionsAsked}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Free user upgrade banner */}
        {tier === "free" && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/20 via-primary/20 to-blue-600/20 border border-primary/20 p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              
              <div className="flex-1">
                <span className="inline-block px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded mb-2">
                  Limited Time
                </span>
                <h2 className="text-xl font-semibold mb-1">
                  Unlock the full Peptide Playbook
                </h2>
                <p className="text-muted-foreground text-sm">
                  Get instant access to the complete guide, interactive database, AI assistant, and more. Join 4,200+ members who stopped guessing.
                </p>
              </div>
              
              <Button asChild className="shadow-lg shadow-primary/20 flex-shrink-0">
                <Link to="/pricing">
                  View Plans <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Main feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.href}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              href={feature.href}
              tier={feature.tier}
              userTier={tier}
              featured={feature.featured}
              stats={feature.stats}
              className={feature.featured ? "sm:col-span-2 lg:col-span-1" : ""}
            />
          ))}
        </div>

        {/* Bottom section: What's New + Suggested Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* What's New */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold">What's New</h3>
            </div>
            <div className="space-y-3">
              {updates.map((update, i) => (
                <UpdateItem key={i} {...update} />
              ))}
            </div>
          </div>
          
          {/* Suggested Next Steps */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold">Suggested Next Steps</h3>
            </div>
            <div className="space-y-2">
              {tier === "free" ? (
                <>
                  <SuggestedAction text="Read the free guide preview" href="/dashboard/guide" primary />
                  <SuggestedAction text="View pricing options" href="/pricing" />
                </>
              ) : (
                <>
                  <SuggestedAction text="Continue reading: Chapter 3" href="/dashboard/guide" primary />
                  <SuggestedAction text="Ask the AI assistant" href="/dashboard/chat" />
                  <SuggestedAction text="Explore the peptide database" href="/dashboard/database" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Feature Card Component
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  tier: Tier;
  userTier: Tier;
  featured?: boolean;
  stats?: string;
  className?: string;
}

function FeatureCard({ 
  title, description, icon: Icon, href, tier, userTier, featured, stats, className 
}: FeatureCardProps) {
  const tierOrder: Tier[] = ["free", "starter", "pro", "insider"];
  const userHasAccess = tierOrder.indexOf(userTier) >= tierOrder.indexOf(tier);
  
  const tierColors: Record<Exclude<Tier, "free">, string> = {
    starter: "bg-slate-100 text-slate-600",
    pro: "bg-emerald-100 text-emerald-700",
    insider: "bg-amber-100 text-amber-700",
  };

  return (
    <Link
      to={href}
      className={cn(
        "group relative p-6 rounded-xl border border-border bg-card transition-all duration-200",
        userHasAccess 
          ? "hover:border-primary/50 hover:shadow-md" 
          : "opacity-70 hover:opacity-80",
        featured && "ring-1 ring-primary/20",
        className
      )}
    >
      {/* Tier badge */}
      {tier !== "free" && (
        <div className="absolute top-4 right-4">
          {userHasAccess ? (
            <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", tierColors[tier])}>
              <CheckCircle2 className="w-3 h-3" /> {tier}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Lock className="w-3 h-3" /> {tier}
            </span>
          )}
        </div>
      )}
      
      {/* Icon */}
      <div className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center mb-4",
        userHasAccess ? "bg-primary/10" : "bg-muted"
      )}>
        <Icon className={cn("w-5 h-5", userHasAccess ? "text-primary" : "text-muted-foreground")} />
      </div>
      
      {/* Content */}
      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-3">
        {description}
      </p>
      
      {/* Stats */}
      {stats && (
        <p className="text-xs text-muted-foreground">
          {stats}
        </p>
      )}
      
      {/* Hover arrow */}
      {userHasAccess && (
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-4 h-4 text-primary" />
        </div>
      )}
    </Link>
  );
}

// Update Item Component
function UpdateItem({ title, date, isNew }: { title: string; date: string; isNew?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <p className="text-muted-foreground">{title}</p>
      <div className="flex items-center gap-2 flex-shrink-0">
        {isNew && (
          <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
            New
          </span>
        )}
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
    </div>
  );
}

// Suggested Action Component
function SuggestedAction({ text, href, primary }: { text: string; href: string; primary?: boolean }) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center justify-between p-3 rounded-lg transition-colors",
        primary 
          ? "bg-primary/5 hover:bg-primary/10 text-foreground" 
          : "hover:bg-muted text-muted-foreground hover:text-foreground"
      )}
    >
      <span className="text-sm">{text}</span>
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
