import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-foreground text-muted py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div>
            <p className="text-background font-semibold text-lg">Peptide Playbook</p>
            <p className="text-sm text-muted-foreground">Educational content. Not medical advice.</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/terms" className="text-muted-foreground hover:text-background transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-background transition-colors">
              Privacy
            </Link>
            <Link to="/disclaimer" className="text-muted-foreground hover:text-background transition-colors">
              Disclaimer
            </Link>
            <a
              href="mailto:support@peptideplaybook.com"
              className="text-muted-foreground hover:text-background transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="border-t border-muted-foreground/20 pt-8">
          <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto mb-4">
            Peptide Playbook provides educational information based on published research. 
            It is not medical advice and does not replace consultation with a healthcare provider.
          </p>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Peptide Playbook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
