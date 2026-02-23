import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PillButton } from "./PillButton";
import { Logo } from "@/components/brand/Logo";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="container px-4 md:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo - Icon + Animated Wordmark */}
            <Link to="/" className="flex items-center gap-3">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" } 
                }}
              >
                {/* Rainbow hexagon logo icon */}
                <Logo showText={false} size="md" />
                
                {/* Stacked wordmark */}
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-bold tracking-tight uppercase">
                    Peptide
                  </span>
                  <span className="text-lg md:text-xl font-bold tracking-tight uppercase -mt-1">
                    Playbook
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop nav - Right aligned controls */}
            <div className="hidden md:flex items-center gap-4">
              <span className="text-muted-foreground mx-2">—</span>
              <Link to="/sales">
                <PillButton variant="dark" icon={<span className="text-xs">•</span>}>
                  Get Full Access
                </PillButton>
              </Link>
              <Link to="/login">
                <PillButton variant="light">
                  Sign In
                </PillButton>
              </Link>
              <Link to="/guides">
                <PillButton variant="light">
                  Research
                </PillButton>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center"
              >
                <PillButton
                  variant="light"
                  icon={
                    <span className="flex gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-current" />
                      <span className="w-1 h-1 rounded-full bg-current" />
                    </span>
                  }
                >
                  Menu
                </PillButton>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -mr-2 flex flex-col justify-center items-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  "w-5 h-0.5 bg-foreground transition-all duration-300 origin-center",
                  isMobileMenuOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-foreground transition-all duration-300",
                  isMobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-foreground transition-all duration-300 origin-center",
                  isMobileMenuOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/Desktop menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background animate-fade-in">
          <div className="container px-4 pt-28 pb-12">
            <nav className="space-y-1">
              {[
                { label: "What's Inside", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
                { label: "Research", href: "/guides", isRoute: true },
              ].map((link, index) => (
                link.isRoute ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-4xl md:text-6xl font-bold py-3 hover:text-foreground transition-colors opacity-0 animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-4xl md:text-6xl font-bold py-3 hover:text-foreground transition-colors opacity-0 animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="pt-8 flex gap-4">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <PillButton variant="light">Sign In</PillButton>
                </Link>
                <Link to="/sales" onClick={() => setIsMobileMenuOpen(false)}>
                  <PillButton variant="dark">Get Full Access</PillButton>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
