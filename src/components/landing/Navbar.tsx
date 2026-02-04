import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PillButton } from "./PillButton";

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut" as const,
    },
  }),
};

const AnimatedWord = ({ word, startIndex = 0 }: { word: string; startIndex?: number }) => (
  <span className="inline-flex overflow-hidden">
    {word.split("").map((letter, i) => (
      <motion.span
        key={i}
        custom={startIndex + i}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        className="inline-block"
      >
        {letter}
      </motion.span>
    ))}
  </span>
);

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
            {/* Logo - Animated Wordmark */}
            <Link to="/" className="flex flex-col group">
              <motion.span 
                className="text-lg md:text-xl font-bold tracking-tight uppercase"
                whileHover={{ letterSpacing: "0.1em" }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedWord word="Peptide" />
              </motion.span>
              <motion.span 
                className="text-lg md:text-xl font-bold tracking-tight uppercase -mt-1"
                whileHover={{ letterSpacing: "0.1em" }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedWord word="Playbook" startIndex={7} />
              </motion.span>
            </Link>

            {/* Desktop nav - Right aligned controls */}
            <div className="hidden md:flex items-center gap-4">
              <span className="text-muted-foreground mx-2">—</span>
              <Link to="/quiz">
                <PillButton variant="dark" icon={<span className="text-xs">•</span>}>
                  Start Course
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
                { label: "What's Inside", href: "#curriculum" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
              ].map((link, index) => (
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
              ))}
              <div className="pt-8 flex gap-4">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Log In
                </Link>
                <Link to="/quiz" onClick={() => setIsMobileMenuOpen(false)}>
                  <PillButton variant="dark">Start Course</PillButton>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
