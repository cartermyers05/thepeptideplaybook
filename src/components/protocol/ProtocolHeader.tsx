import { Link } from "react-router-dom";
import { Calendar, Play, Pause, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Protocol } from "@/hooks/useProtocol";

interface ProtocolHeaderProps {
  protocol: Protocol;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  isStarting: boolean;
  isPausing: boolean;
  isResuming: boolean;
}

const statusConfig = {
  not_started: { label: "Not Started", color: "bg-muted text-muted-foreground" },
  active: { label: "Active", color: "bg-green-100 text-green-700" },
  paused: { label: "Paused", color: "bg-amber-100 text-amber-700" },
  completed: { label: "Completed", color: "bg-primary/10 text-primary" },
};

export function ProtocolHeader({ 
  protocol, 
  onStart, 
  onPause, 
  onResume,
  isStarting,
  isPausing,
  isResuming 
}: ProtocolHeaderProps) {
  const status = statusConfig[protocol.status] || statusConfig.not_started;
  const totalDays = protocol.cycle_length_weeks * 7;
  const progressPercent = protocol.status === "active" 
    ? Math.round((protocol.current_day / totalDays) * 100) 
    : 0;

  return (
    <div className="space-y-4">
      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-foreground">Today's Protocol</h1>
            <Badge className={cn("rounded-full", status.color)}>
              {status.label}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {protocol.protocol_name} • {protocol.cycle_length_weeks}-week cycle
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {protocol.status === "not_started" && (
            <Button 
              onClick={onStart} 
              disabled={isStarting}
              className="rounded-full"
            >
              <Play className="w-4 h-4 mr-2" />
              {isStarting ? "Starting..." : "Start Protocol"}
            </Button>
          )}
          {protocol.status === "active" && (
            <Button 
              variant="outline" 
              onClick={onPause} 
              disabled={isPausing}
              className="rounded-full"
            >
              <Pause className="w-4 h-4 mr-2" />
              {isPausing ? "Pausing..." : "Pause"}
            </Button>
          )}
          {protocol.status === "paused" && (
            <Button 
              onClick={onResume} 
              disabled={isResuming}
              className="rounded-full"
            >
              <Play className="w-4 h-4 mr-2" />
              {isResuming ? "Resuming..." : "Resume"}
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link to="/dashboard/coach">
              <Plus className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      {protocol.status !== "not_started" && (
        <div className="p-4 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">
                Week {protocol.current_week}, Day {protocol.current_day}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {progressPercent}% complete
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {totalDays - protocol.current_day} days remaining
          </p>
        </div>
      )}
    </div>
  );
}
