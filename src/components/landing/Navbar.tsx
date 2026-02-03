import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";

const navLinks = [
  { label: "What's Inside", href: "#curriculum" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          isScrolled
            ? "nav-premium shadow-sm"
            : "bg-white/80 backdrop-blur-sm"
        )}
      >
        <div className="container px-4">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link to="/">
              <Logo size="md" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link 
                to="/login" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Log In
              </Link>
              <Link to="/quiz">
                <Button size="sm" className="btn-primary-clean">Build My Course</Button>
              </Link>
            </div>

            {/* Mobile menu button - CSS animated hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -mr-2 flex flex-col justify-center items-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={cn(
                "w-5 h-0.5 bg-foreground transition-all duration-300 origin-center",
                isMobileMenuOpen && "rotate-45 translate-y-2"
              )} />
              <span className={cn(
                "w-5 h-0.5 bg-foreground transition-all duration-300",
                isMobileMenuOpen && "opacity-0"
              )} />
              <span className={cn(
                "w-5 h-0.5 bg-foreground transition-all duration-300 origin-center",
                isMobileMenuOpen && "-rotate-45 -translate-y-2"
              )} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 md:hidden bg-white border-b border-border animate-slide-down">
          <nav className="container px-4 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium py-2 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-medium py-2 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              Log In
            </Link>
            <div className="pt-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
              <Link to="/quiz" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full btn-primary-clean">Build My Course</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
