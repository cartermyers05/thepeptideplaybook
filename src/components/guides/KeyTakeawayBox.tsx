import { Lightbulb } from "lucide-react";

interface KeyTakeawayBoxProps {
  content: string;
}

export function KeyTakeawayBox({ content }: KeyTakeawayBoxProps) {
  return (
    <div className="my-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <span className="text-sm font-bold text-primary uppercase tracking-wide">
            Key Takeaway
          </span>
          <p className="text-foreground mt-2 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}
