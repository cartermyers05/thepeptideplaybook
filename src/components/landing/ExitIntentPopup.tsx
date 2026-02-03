import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Don't show if already shown
    const hasShown = sessionStorage.getItem("exit_popup_shown");
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
        sessionStorage.setItem("exit_popup_shown", "true");
      }
    };

    // Delay adding listener to avoid immediate trigger
    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-lead`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            email,
            source: "exit-intent",
            honeypot,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: "Too many attempts",
            description: "Please try again later.",
            variant: "destructive",
          });
        } else {
          throw new Error(data.error || "Failed to submit");
        }
        return;
      }

      toast({
        title: data.message === "You're already signed up!" ? "You're already signed up!" : "You're in!",
        description: data.message === "You're already signed up!" ? "Check your email for the guide." : "Check your email for the free guide.",
      });
      setIsOpen(false);
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl animate-fade-up">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl leading-none font-light transition-colors"
          aria-label="Close popup"
        >
          ×
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-lg font-bold text-primary">FDA</span>
          </div>

          <h3 className="text-2xl font-bold mb-2">
            See the 3 FDA-Approved Peptides
          </h3>

          <p className="text-muted-foreground">
            Get a quick reference guide showing which peptides have actual FDA approval and what they're approved for.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field - hidden from users, bots will fill it */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute -left-[9999px] opacity-0 pointer-events-none"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12"
          />
          <Button
            type="submit"
            className="w-full h-12 btn-primary-clean"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Me the Guide"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
