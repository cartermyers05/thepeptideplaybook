import { Pin } from "lucide-react";

interface BottomLineBoxProps {
  content: string;
}

export function BottomLineBox({ content }: BottomLineBoxProps) {
  return (
    <div className="relative p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl my-8">
      <div className="flex items-center gap-2 mb-3">
        <Pin className="w-5 h-5 text-primary" />
        <span className="text-sm font-bold text-primary uppercase tracking-wide">
          The Bottom Line
        </span>
      </div>
      <p className="text-foreground leading-relaxed text-base">{content}</p>
    </div>
  );
}
