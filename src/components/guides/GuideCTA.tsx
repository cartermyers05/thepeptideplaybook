import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";

export function GuideCTA() {
  return (
    <section className="my-12 py-10 px-6 glass-card-subtle text-center">
      <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
      <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
        Get personalized answers based on the latest research from our AI assistant.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/">
          <Button className="btn-primary-clean gap-2">
            <MessageCircle className="w-4 h-4" />
            Ask the Peptide Assistant
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="outline" className="gap-2">
            Get Free Access to Peptide Playbook
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
