import { useNavigate } from "react-router-dom";
import { ArrowRight, MessageCircle, Database, FlaskConical, Newspaper } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { useConversations } from "@/hooks/useConversations";
import { formatDistanceToNow } from "date-fns";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const { data: conversations, isLoading: isLoadingConversations } = useConversations();

  const displayName = profile?.full_name?.split(' ')[0] || user?.user_metadata?.full_name?.split(" ")[0] || "there";
  const isLoading = isLoadingProfile;

  // Get recent conversations (last 3)
  const recentChats = conversations?.slice(0, 3) || [];

  const quickActions = [
    {
      icon: MessageCircle,
      label: "AI Chat",
      description: "Ask anything about peptides",
      path: "/dashboard/chat",
    },
    {
      icon: Database,
      label: "Peptide Database",
      description: "Browse research & protocols",
      path: "/dashboard/database",
    },
    {
      icon: FlaskConical,
      label: "Protocol Builder",
      description: "Build your personalized stack",
      path: "/dashboard/protocols",
    },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
          <Skeleton className="h-48 w-full rounded-2xl" />
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
            Your peptide research assistant is ready to help.
          </p>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.path}
                  onClick={() => navigate(action.path)}
                  className="card-premium p-6 text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-foreground/80 transition-colors">
                    {action.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Conversations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Recent Conversations
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard/chat")}
              className="text-muted-foreground hover:text-foreground"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {isLoadingConversations ? (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          ) : recentChats.length > 0 ? (
            <div className="space-y-3">
              {recentChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => navigate(`/dashboard/chat?id=${chat.id}`)}
                  className="w-full bg-card border border-border rounded-xl p-4 text-left hover:border-foreground/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground truncate max-w-[300px]">
                          {chat.title || "New Conversation"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(chat.updated_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <MessageCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">No conversations yet</p>
              <Button onClick={() => navigate("/dashboard/chat")}>
                Start Your First Chat
              </Button>
            </div>
          )}
        </div>

        {/* Latest Research */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Latest Research
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard/research")}
              className="text-muted-foreground hover:text-foreground"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <Newspaper className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Research feed coming soon</p>
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
