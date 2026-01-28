import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container px-4 py-12">
        {/* Three column layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Wordmark */}
          <p className="font-semibold tracking-tight">Peptide Playbook</p>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              to="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </a>
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
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Peptide Playbook
          </p>
        </div>
        
        {/* Disclaimer */}
        <div className="pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
            This website provides educational information only. It is not medical advice. 
            Consult a healthcare provider before making any health decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
