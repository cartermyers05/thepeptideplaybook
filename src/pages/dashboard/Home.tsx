import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MessageCircle, FlaskConical, BookOpen } from "lucide-react";
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

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
        <div className="space-y-8">
          <Skeleton className="h-24 w-full rounded-2xl" />
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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
            {getGreeting()}, {displayName}
          </h1>
          <p className="text-lg text-muted-foreground">
            Your peptide research command center.
          </p>
        </motion.div>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Active Protocol Card */}
          <motion.button
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.1)" }}
            onClick={() => navigate("/dashboard/protocols")}
            className="dashboard-card text-left"
          >
            <div className="h-1 dashboard-gradient-purple" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Active Protocol</span>
              </div>
              {isLoadingProtocol ? (
                <Skeleton className="h-6 w-32" />
              ) : protocol ? (
                <p className="font-semibold text-foreground truncate">{protocol.protocol_name}</p>
              ) : (
                <p className="text-sm text-muted-foreground">No active protocol</p>
              )}
            </div>
          </motion.button>

          {/* AI Conversations Card */}
          <motion.button
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.1)" }}
            onClick={() => navigate("/dashboard/chat")}
            className="dashboard-card text-left"
          >
            <div className="h-1 dashboard-gradient-blue" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">AI Research</span>
              </div>
              {isLoadingConversations ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <p className="font-semibold text-foreground">{conversationCount} conversations</p>
              )}
            </div>
          </motion.button>

          {/* Peptides Database Card */}
          <motion.button
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.1)" }}
            onClick={() => navigate("/dashboard/database")}
            className="dashboard-card text-left"
          >
            <div className="h-1 dashboard-gradient-teal" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Peptide Database</span>
              </div>
              <p className="font-semibold text-foreground">40+ peptides</p>
            </div>
          </motion.button>
        </div>

        {/* Continue Where You Left Off / Starter Prompts */}
        <motion.div variants={itemVariants}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            {recentChat ? "Continue Where You Left Off" : "Get Started"}
          </h2>

          {isLoadingConversations ? (
            <Skeleton className="h-28 w-full rounded-2xl" />
          ) : recentChat ? (
            <motion.button
              whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.1)" }}
              onClick={() => navigate(`/dashboard/chat?id=${recentChat.id}`)}
              className="w-full dashboard-card text-left"
            >
              <div className="h-1 dashboard-gradient-orange" />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(recentChat.updated_at), { addSuffix: true })}
                    </span>
                    <p className="font-semibold text-foreground truncate mb-1">
                      {recentChat.title || "New Conversation"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Continue your conversation...
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0 rounded-full">
                    Continue
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.button>
          ) : (
            <div className="dashboard-card overflow-visible">
              <div className="h-1 dashboard-gradient-orange" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="font-semibold text-foreground">Ask your first question</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {starterPrompts.map((prompt, index) => (
                    <motion.button
                      key={prompt}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                      onClick={() => navigate("/dashboard/chat")}
                      className="p-4 text-left text-sm text-muted-foreground bg-accent/50 hover:bg-accent rounded-xl border border-transparent hover:border-border/50 transition-all"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Popular Guides */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Popular Guides
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/guides")}
              className="text-muted-foreground hover:text-foreground rounded-full"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {popularGuides.map((guide, index) => (
              <motion.button
                key={guide.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.1)" }}
                onClick={() => navigate(guide.href)}
                className="dashboard-card text-left"
              >
                <div className="h-1 dashboard-gradient-green" />
                <div className="p-5">
                  <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full inline-block mb-3">
                    {guide.category}
                  </span>
                  <p className="font-semibold text-foreground mb-1">
                    {guide.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{guide.readTime} read</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Legal Footer */}
        <motion.div
          variants={itemVariants}
          className="text-xs text-muted-foreground text-center py-6 border-t border-border"
        >
          <p>
            For educational purposes only. Not medical advice. Always consult a healthcare provider.
          </p>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
