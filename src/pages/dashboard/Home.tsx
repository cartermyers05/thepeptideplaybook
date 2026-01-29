import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { useProfile } from "@/hooks/useProfile";
import { Link } from "react-router-dom";
import { BookOpen, Database, Bot, Mail, ArrowRight } from "lucide-react";

const quickActions = [
  {
    icon: BookOpen,
    title: "Read the Guide",
    description: "Start with the complete peptide education guide",
    path: "/dashboard/guide",
    requiredTier: "starter" as const,
  },
  {
    icon: Database,
    title: "Peptide Database",
    description: "Search and filter 40+ peptides",
    path: "/dashboard/database",
    requiredTier: "pro" as const,
  },
  {
    icon: Bot,
    title: "Ask AI Assistant",
    description: "Get research-backed answers instantly",
    path: "/dashboard/chat",
    requiredTier: "pro" as const,
  },
  {
    icon: Mail,
    title: "Latest Digest",
    description: "Read the monthly research update",
    path: "/dashboard/digest",
    requiredTier: "pro" as const,
  },
];

const updates = [
  { text: "Guide updated: January 2026", date: "Jan 15" },
  { text: "3 new peptides added to database", date: "Jan 10" },
  { text: "New research digest available", date: "Jan 1" },
];

export default function Dashboard() {
  const { data: profile } = useProfile();
  const { hasAccess, tier } = useTier();

  const firstName = profile?.full_name?.split(" ")[0] || "there";

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Welcome back, {firstName}!
          </h1>
          <p className="text-muted-foreground">
            Here's your peptide education hub.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const isLocked = !hasAccess(action.requiredTier);

            return (
              <Link
                key={action.path}
                to={action.path}
                className={`group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors ${
                  isLocked ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  {isLocked && (
                    <span className="text-xs bg-muted px-2 py-1 rounded font-medium">
                      {action.requiredTier.toUpperCase()}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </Link>
            );
          })}
        </div>

        {/* Recent Updates */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-4">Recent Updates</h2>
          <ul className="space-y-3">
            {updates.map((update, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{update.text}</span>
                <span className="text-xs text-muted-foreground">{update.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Upgrade CTA for free users */}
        {tier === "free" && (
          <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
            <h3 className="font-semibold mb-2">Ready to unlock everything?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upgrade to access the full guide, peptide database, AI assistant, and more.
            </p>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View pricing options <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
