import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  "The 5 warning signs of untrustworthy sources",
  "Questions to ask before purchasing",
  "How to verify third-party testing",
  "Red flags in shipping and packaging",
  "When to walk away",
];

export default function FreeGuide() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("leads").insert({
        email,
        first_name: firstName || null,
        source: "free-guide",
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Check your email!",
        description: "We've sent the free guide to your inbox.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Free Guide: 5 Red Flags That Reveal a Sketchy Peptide Source"
        description="Download our free checklist and protect yourself before you buy anything. Learn the warning signs of untrustworthy peptide sources."
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-20">
          <div className="container px-4 max-w-xl mx-auto">
            {!isSuccess ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                    5 Red Flags That Reveal a Sketchy Peptide Source
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Download our free checklist and protect yourself before you buy anything.
                  </p>
                </div>

                {/* Mockup */}
                <div className="bg-muted rounded-xl p-8 flex items-center justify-center mb-8">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">PDF Checklist Preview</p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="First name (optional)"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary-clean h-12"
                  >
                    {isLoading ? "Sending..." : "Send Me the Free Guide →"}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center mb-8">
                  No spam. Unsubscribe anytime. By subscribing, you agree to our{" "}
                  <a href="/privacy" className="underline">Privacy Policy</a>.
                </p>

                {/* What's inside */}
                <div className="border-t border-border pt-8">
                  <h3 className="font-semibold mb-4">What's Inside:</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Check Your Email!</h2>
                <p className="text-muted-foreground mb-8">
                  We've sent the free guide to <strong>{email}</strong>
                </p>
                <Button asChild variant="outline">
                  <a href="/">Back to Home</a>
                </Button>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
