import { useState } from "react";
import { LucideIcon } from "lucide-react";

interface GoalButtonProps {
  value: string;
  label: string;
  icon: LucideIcon;
  gradient: string;
  onClick: (value: string, label: string) => void;
  disabled: boolean;
}

export function GoalButton({ value, label, icon: Icon, gradient, onClick, disabled }: GoalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => onClick(value, label)}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-full px-4 py-2.5 flex items-center gap-2 border border-border 
                 font-medium text-sm transition-all duration-300 disabled:opacity-50"
      style={{
        background: isHovered ? gradient : 'transparent',
        color: isHovered ? 'white' : 'inherit',
        borderColor: isHovered ? 'transparent' : undefined,
      }}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
