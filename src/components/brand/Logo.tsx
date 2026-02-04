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
  const gradientId = `rainbow-stroke-${size}`;
  const fillId = `rainbow-fill-${size}`;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Molecule/DNA Icon with Rainbow Gradient */}
      <svg
        width={config.icon}
        height={config.icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          {/* Rainbow gradient for hexagon stroke */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(45, 80%, 50%)" />      {/* Yellow */}
            <stop offset="20%" stopColor="hsl(25, 90%, 55%)" />     {/* Orange */}
            <stop offset="40%" stopColor="hsl(350, 80%, 55%)" />    {/* Pink */}
            <stop offset="60%" stopColor="hsl(270, 70%, 55%)" />    {/* Purple */}
            <stop offset="80%" stopColor="hsl(210, 80%, 55%)" />    {/* Blue */}
            <stop offset="100%" stopColor="hsl(160, 70%, 45%)" />   {/* Teal */}
          </linearGradient>
          
          {/* Radial gradient for fill */}
          <radialGradient id={fillId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(45, 80%, 50%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(270, 70%, 55%)" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* Hexagonal molecule structure with gradient */}
        <path
          d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          fill={`url(#${fillId})`}
        />
        {/* Center node */}
        <circle cx="16" cy="16" r="3" fill={`url(#${gradientId})`} />
        {/* Connection lines */}
        <path
          d="M16 16L16 7M16 16L23 20M16 16L9 20"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Outer nodes - different colors */}
        <circle cx="16" cy="7" r="2" fill="hsl(45, 80%, 50%)" />     {/* Yellow - top */}
        <circle cx="23" cy="20" r="2" fill="hsl(270, 70%, 55%)" />   {/* Purple - right */}
        <circle cx="9" cy="20" r="2" fill="hsl(160, 70%, 45%)" />    {/* Teal - left */}
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
