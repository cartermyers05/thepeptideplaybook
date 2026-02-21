import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";

export default function Welcome() {
  return (
    <>
      <SEOHead
        title="Peptide Playbook — Pro-Peptide, Pro-Research"
        description="AI-powered peptide research education. 41+ peptides, evidence ratings, doctor scripts. $67 one-time."
        canonical="/welcome"
        noIndex
      />
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-[400px] w-full text-center">
          <span
            className="text-primary text-xs uppercase tracking-[2px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            PEPTIDE PLAYBOOK
          </span>

          <h1 className="text-[22px] font-bold mt-4">
            Pro-peptide. Pro-research. Anti-BS.
          </h1>

          <div className="border-t border-border my-7" />

          <div className="space-y-3">
            <Link to="/sales" className="block">
              <Button className="w-full bg-primary text-primary-foreground font-bold text-base min-h-[56px] rounded-xl">
                Get the Full Playbook — $67
              </Button>
            </Link>

            <Link to="/guides" className="block">
              <Button
                variant="outline"
                className="w-full text-base min-h-[56px] rounded-xl"
              >
                Read Free Research Guides
              </Button>
            </Link>

            <Link to="/sales" className="block">
              <Button
                variant="outline"
                className="w-full text-base min-h-[56px] rounded-xl"
              >
                Learn About the AI Coach
              </Button>
            </Link>
          </div>

          <p className="text-muted-foreground/60 text-xs mt-7">
            Educational content only. Not medical advice.
          </p>
        </div>
      </div>
    </>
  );
}
