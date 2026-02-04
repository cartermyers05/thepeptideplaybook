import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-20 md:py-28">
      <div className="container px-4 md:px-8">
        {/* Cross decorations */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className="text-muted-foreground text-lg">+</span>
          <span className="text-muted-foreground text-lg">+</span>
          <span className="text-muted-foreground text-lg">+</span>
        </div>

        {/* Main footer content */}
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          {/* Logo and tagline */}
          <div className="md:col-span-4">
            <div className="flex flex-col mb-4">
              <span className="text-xl font-bold tracking-tight uppercase">
                Peptide
              </span>
              <span className="text-xl font-bold tracking-tight uppercase -mt-1">
                Playbook
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Your personal peptide course. Personalized protocols, step-by-step 
              guidance, and 24/7 AI coaching.
            </p>
          </div>

          {/* Link columns */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium text-sm mb-4 uppercase tracking-wider text-muted-foreground">
                Product
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#curriculum" className="text-foreground hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-foreground hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-4 uppercase tracking-wider text-muted-foreground">
                Resources
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/guides" className="text-foreground hover:text-primary transition-colors">
                    Free Guides
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/editorial-policy" className="text-foreground hover:text-primary transition-colors">
                    Editorial Policy
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-4 uppercase tracking-wider text-muted-foreground">
                Legal
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/terms" className="text-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-foreground hover:text-primary transition-colors">
                    Medical Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-border pt-8 mb-8">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl mx-auto text-center">
            Peptide Playbook provides educational content based on published research. 
            This is not medical advice, diagnosis, or treatment. The information provided 
            is for educational purposes only and is not intended to replace professional 
            medical advice. Always consult a qualified healthcare provider before starting 
            any new supplement, peptide, or health protocol. Individual results may vary. 
            Peptide Playbook does not sell peptides or recommend specific vendors.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Peptide Playbook. All rights reserved.
          </p>
          <a
            href="mailto:hello@peptideplaybook.com"
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            hello@peptideplaybook.com
          </a>
        </div>
      </div>
    </footer>
  );
}
