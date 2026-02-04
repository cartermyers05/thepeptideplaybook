import { cn } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark" | "light" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  (
    {
      className,
      variant = "dark",
      size = "md",
      icon,
      iconPosition = "right",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-full whitespace-nowrap";

    const variants = {
      dark: "bg-foreground text-background hover:bg-foreground/90",
      light: "bg-background text-foreground border border-border hover:bg-accent",
      outline: "bg-transparent text-foreground border border-border hover:bg-accent",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </button>
    );
  }
);

PillButton.displayName = "PillButton";

export { PillButton };
