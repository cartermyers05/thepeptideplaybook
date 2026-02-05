import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { useConversations } from "@/hooks/useConversations";
import { useProtocol } from "@/hooks/useProtocol";
import { formatDistanceToNow } from "date-fns";
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// Popular guides data
const popularGuides = [
  {
    title: "BPC-157: Complete Guide",
    category: "Recovery",
    readTime: "12 min",
    href: "/guides/bpc-157-complete-guide",
  },
  {
    title: "Semaglutide Guide",
    category: "Weight Loss",
    readTime: "15 min",
    href: "/guides/semaglutide-complete-guide",
  },
  {
    title: "BPC-157 vs TB-500",
    category: "Comparison",
    readTime: "9 min",
    href: "/guides/bpc-157-vs-tb-500",
  },
];

// Suggested starter prompts
const starterPrompts = [
  "What peptides are best for recovery?",
  "Help me build a fat loss protocol",
  "Compare BPC-157 vs TB-500",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const { data: conversations, isLoading: isLoadingConversations } = useConversations();
  const { protocol, isLoading: isLoadingProtocol } = useProtocol();

  const displayName = profile?.full_name?.split(' ')[0] || user?.user_metadata?.full_name?.split(" ")[0] || "there";
  const isLoading = isLoadingProfile;

  // Get most recent conversation
  const recentChat = conversations?.[0];
  const conversationCount = conversations?.length || 0;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-28 w-full rounded-xl" />
          </div>
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-up">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1">
            {getGreeting()}, {displayName}
          </h1>
          <p className="text-muted-foreground">
            Your peptide research command center.
          </p>
        </div>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Active Protocol Card */}
          <button 
            onClick={() => navigate("/dashboard/protocols")}
            className="bg-card border border-border rounded-xl p-5 hover:border-foreground/20 transition-colors text-left group"
          >
            <span className="text-sm font-medium text-muted-foreground">Active Protocol</span>
            {isLoadingProtocol ? (
              <Skeleton className="h-6 w-32 mt-2" />
            ) : protocol ? (
              <p className="font-semibold text-foreground truncate mt-2">{protocol.protocol_name}</p>
            ) : (
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors mt-2">
                No active protocol
              </p>
            )}
          </button>

          {/* AI Conversations Card */}
          <button 
            onClick={() => navigate("/dashboard/chat")}
            className="bg-card border border-border rounded-xl p-5 hover:border-foreground/20 transition-colors text-left group"
          >
            <span className="text-sm font-medium text-muted-foreground">AI Research</span>
            {isLoadingConversations ? (
              <Skeleton className="h-6 w-20 mt-2" />
            ) : (
              <p className="font-semibold text-foreground mt-2">{conversationCount} conversations</p>
            )}
          </button>

          {/* Peptides Explored Card */}
          <button 
            onClick={() => navigate("/dashboard/database")}
            className="bg-card border border-border rounded-xl p-5 hover:border-foreground/20 transition-colors text-left group"
          >
            <span className="text-sm font-medium text-muted-foreground">Peptide Database</span>
            <p className="font-semibold text-foreground mt-2">40+ peptides</p>
          </button>
        </div>

        {/* Continue Where You Left Off / Starter Prompts */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            {recentChat ? "Continue Where You Left Off" : "Get Started"}
          </h2>

          {isLoadingConversations ? (
            <Skeleton className="h-24 w-full rounded-xl" />
          ) : recentChat ? (
            <button
              onClick={() => navigate(`/dashboard/chat?id=${recentChat.id}`)}
              className="w-full bg-card border border-border rounded-xl p-5 text-left hover:border-foreground/20 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(recentChat.updated_at), { addSuffix: true })}
                  </span>
                  <p className="font-medium text-foreground truncate mb-1">
                    {recentChat.title || "New Conversation"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Continue your conversation...
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="shrink-0">
                  Continue
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </button>
          ) : (
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <p className="font-medium text-foreground">Ask your first question</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => navigate("/dashboard/chat")}
                    className="p-3 text-left text-sm text-muted-foreground bg-accent/50 hover:bg-accent rounded-lg transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Popular Guides */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Popular Guides
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/guides")}
              className="text-muted-foreground hover:text-foreground"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {popularGuides.map((guide) => (
              <button
                key={guide.href}
                onClick={() => navigate(guide.href)}
                className="bg-card border border-border rounded-xl p-4 text-left hover:border-foreground/20 transition-colors group"
              >
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded inline-block mb-2">
                  {guide.category}
                </span>
                <p className="font-medium text-foreground mb-1 group-hover:text-foreground/80 transition-colors">
                  {guide.title}
                </p>
                <p className="text-xs text-muted-foreground">{guide.readTime} read</p>
              </button>
            ))}
          </div>
        </div>


        {/* Legal Footer */}
        <div className="text-xs text-muted-foreground text-center py-4 border-t border-border">
          <p>
            For educational purposes only. Not medical advice. Always consult a healthcare provider.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
