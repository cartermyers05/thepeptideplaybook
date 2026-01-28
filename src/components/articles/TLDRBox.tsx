import { Lightbulb } from "lucide-react";

interface TLDRBoxProps {
  content: string;
}

export function TLDRBox({ content }: TLDRBoxProps) {
  return (
    <div className="relative p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-primary">Quick Answer</h2>
      </div>
      <p className="text-foreground leading-relaxed text-base">{content}</p>
    </div>
  );
}
