import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import { Users, MessageCircle, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const discussions = [
  {
    title: "Monthly Q&A Thread - January 2026",
    replies: 47,
    lastActivity: "2 hours ago",
    pinned: true,
  },
  {
    title: "What questions are you asking your doctor about GLP-1s?",
    replies: 23,
    lastActivity: "5 hours ago",
    pinned: false,
  },
  {
    title: "Source evaluation experiences - share your process",
    replies: 31,
    lastActivity: "1 day ago",
    pinned: false,
  },
  {
    title: "Recovery peptide research discussion",
    replies: 18,
    lastActivity: "2 days ago",
    pinned: false,
  },
];

const events = [
  {
    title: "Monthly Group Q&A Call",
    date: "Feb 5, 2026 at 7pm EST",
  },
  {
    title: "Guest Expert: Endocrinologist Perspective",
    date: "Feb 12, 2026 at 7pm EST",
  },
];

export default function Community() {
  const { isPaid } = useTier();

  if (!isPaid) {
    return (
      <DashboardLayout>
        <UpgradePrompt feature="Private Community" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Private Community
          </h1>
          <p className="text-muted-foreground">
            Connect with other members for discussions and support
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">247</p>
            <p className="text-sm text-muted-foreground">Active Members</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-sm text-muted-foreground">Discussions</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">Upcoming Events</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Discussions */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Recent Discussions
            </h2>
            <ul className="space-y-4">
              {discussions.map((discussion, i) => (
                <li key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium hover:text-primary cursor-pointer">
                        {discussion.pinned && "📌 "}{discussion.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {discussion.replies} replies · {discussion.lastActivity}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Discussions
            </Button>
          </div>

          {/* Events */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Events
            </h2>
            <ul className="space-y-4">
              {events.map((event, i) => (
                <li key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                  <button className="text-xs text-primary hover:underline mt-2 flex items-center gap-1">
                    Add to calendar <ExternalLink className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg">
              <p className="text-sm font-medium mb-1">Community Bonus</p>
              <p className="text-xs text-muted-foreground mb-3">
                As a member, you have access to exclusive community features and group calls.
              </p>
              <Button size="sm" className="btn-primary-clean">
                Join Next Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
