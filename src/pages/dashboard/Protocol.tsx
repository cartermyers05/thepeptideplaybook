import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useProtocol, Peptide } from "@/hooks/useProtocol";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Pause, RotateCcw, FileText, Clock, Calendar, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Protocol() {
  const { protocol, isLoading, startProtocol, pauseProtocol, resumeProtocol } = useProtocol();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  if (!protocol) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <FileText className="w-16 h-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-semibold mb-2">No Protocol Yet</h1>
          <p className="text-muted-foreground mb-6 max-w-md">
            Take our quick quiz to get a personalized peptide protocol tailored to your goals.
          </p>
          <Button onClick={() => navigate("/quiz")}>Get Your Free Protocol</Button>
        </div>
      </DashboardLayout>
    );
  }

  const totalDays = protocol.cycle_length_weeks * 7;
  const progressPercent = protocol.status === "active" 
    ? Math.round((protocol.current_day / totalDays) * 100) 
    : 0;

  const statusColors = {
    not_started: "secondary",
    active: "default",
    paused: "outline",
    completed: "default",
  } as const;

  const statusLabels = {
    not_started: "Not Started",
    active: "Active",
    paused: "Paused",
    completed: "Completed",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{protocol.protocol_name}</h1>
            <p className="text-muted-foreground">
              {protocol.cycle_length_weeks}-week cycle • {protocol.peptides.length} peptide{protocol.peptides.length > 1 ? "s" : ""}
            </p>
          </div>
          <Badge variant={statusColors[protocol.status]} className="w-fit">
            {statusLabels[protocol.status]}
          </Badge>
        </div>

        {/* Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Cycle Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {protocol.status === "active" 
                  ? `Week ${protocol.current_week} • Day ${protocol.current_day}`
                  : "Not started yet"}
              </span>
              <span className="font-medium">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {totalDays - protocol.current_day} days remaining
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {protocol.status === "not_started" && (
            <Button onClick={() => startProtocol.mutate(protocol.id)} disabled={startProtocol.isPending}>
              <Play className="w-4 h-4 mr-2" />
              Start Protocol
            </Button>
          )}
          {protocol.status === "active" && (
            <Button variant="outline" onClick={() => pauseProtocol.mutate(protocol.id)} disabled={pauseProtocol.isPending}>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          {protocol.status === "paused" && (
            <Button onClick={() => resumeProtocol.mutate(protocol.id)} disabled={resumeProtocol.isPending}>
              <Play className="w-4 h-4 mr-2" />
              Resume
            </Button>
          )}
          <Button variant="outline" onClick={() => navigate("/quiz")}>
            <RotateCcw className="w-4 h-4 mr-2" />
            New Protocol
          </Button>
        </div>

        {/* Peptides */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Pill className="w-5 h-5" />
            Your Peptides
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {protocol.peptides.map((peptide: Peptide, index: number) => (
              <PeptideCard key={index} peptide={peptide} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function PeptideCard({ peptide }: { peptide: Peptide }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{peptide.name}</CardTitle>
        <CardDescription>{peptide.purpose}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Dosage</p>
            <p className="font-medium">{peptide.dosage}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Frequency</p>
            <p className="font-medium">{peptide.frequency}</p>
          </div>
        </div>
        <div className="text-sm">
          <p className="text-muted-foreground">Timing</p>
          <p className="font-medium">{peptide.timing}</p>
        </div>
      </CardContent>
    </Card>
  );
}
