import { cn } from "@/lib/utils";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: { icon: 24, text: "text-base" },
  md: { icon: 32, text: "text-lg" },
  lg: { icon: 40, text: "text-xl" },
};

export function Logo({ showText = true, size = "md", className }: LogoProps) {
  const config = sizeConfig[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Molecule/DNA Icon */}
      <svg
        width={config.icon}
        height={config.icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Hexagonal molecule structure */}
        <path
          d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
          stroke="hsl(173 82% 32%)"
          strokeWidth="2"
          fill="hsl(173 82% 32% / 0.1)"
        />
        {/* Center node */}
        <circle cx="16" cy="16" r="3" fill="hsl(173 82% 32%)" />
        {/* Connection lines */}
        <path
          d="M16 16L16 7M16 16L23 20M16 16L9 20"
          stroke="hsl(173 82% 32%)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Outer nodes */}
        <circle cx="16" cy="7" r="2" fill="hsl(173 82% 40%)" />
        <circle cx="23" cy="20" r="2" fill="hsl(173 82% 40%)" />
        <circle cx="9" cy="20" r="2" fill="hsl(173 82% 40%)" />
      </svg>

      {showText && (
        <span className={cn("font-semibold tracking-tight", config.text)}>
          <span className="font-bold">Peptide</span>
          <span className="text-muted-foreground font-medium"> Playbook</span>
        </span>
      )}
    </div>
  );
}
