import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function GuideCTA() {
  return (
    <section className="my-12 py-10 px-6 bg-card border border-border rounded-xl text-center">
      <h2 className="text-2xl font-bold mb-3">Ready to understand the full picture?</h2>
      <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
        This guide covers the basics. Peptide Playbook covers 41+ peptides with evidence ratings, safety profiles, doctor scripts, and an AI that answers your specific questions.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/sales">
          <Button className="bg-primary text-primary-foreground font-bold gap-2 min-h-[48px] rounded-xl px-8">
            Get Full Access — $67
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
      <p className="text-muted-foreground/60 text-[13px] mt-3">One-time · 30-day guarantee</p>
    </section>
  );
}
