import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, Sparkles, ClipboardList, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyProtocolState() {
  return (
    <div className="space-y-6">
      {/* Hero CTA */}
      <Card className="overflow-hidden border-2 border-dashed border-primary/30">
        <div className="h-1 bg-gradient-to-r from-primary to-primary/50" />
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Build Your Personalized Protocol
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Chat with the AI Coach to create a peptide protocol tailored to your specific goals, experience, and constraints.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link to="/dashboard/coach">
              <Sparkles className="w-4 h-4 mr-2" />
              Talk to AI Coach
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* How it works */}
      <div className="grid gap-4 md:grid-cols-3">
        <StepCard 
          step={1}
          icon={MessageCircle}
          title="Chat with AI"
          description="Share your goals, experience level, and any constraints you have"
        />
        <StepCard 
          step={2}
          icon={ClipboardList}
          title="Get Your Plan"
          description="AI builds a personalized protocol with exact dosing and timing"
        />
        <StepCard 
          step={3}
          icon={Play}
          title="Execute Daily"
          description="Come here each day to see what to do and track your progress"
        />
      </div>
    </div>
  );
}

function StepCard({ 
  step, 
  icon: Icon, 
  title, 
  description 
}: { 
  step: number; 
  icon: React.ElementType; 
  title: string; 
  description: string; 
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
            {step}
          </div>
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
