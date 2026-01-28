import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container px-4 py-12">
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Link
            to="/terms"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/disclaimer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Medical Disclaimer
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground text-center mb-8">
          © {new Date().getFullYear()} Peptide Playbook. All rights reserved.
        </p>
        
        {/* Prominent disclaimer */}
        <div className="max-w-3xl mx-auto p-5 bg-muted/50 rounded-xl">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            <span className="font-semibold">Important Disclaimer:</span> This product provides educational information about peptide research. 
            It is NOT medical advice. Peptide Playbook does not provide dosing recommendations, treatment guidance, or vendor referrals. 
            Most peptides discussed are NOT FDA-approved for human use. Always consult a licensed healthcare provider before making any health decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
