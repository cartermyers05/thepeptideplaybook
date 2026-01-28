import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  product: [
    { label: "Features", href: "#demo" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Medical Disclaimer", href: "/disclaimer" },
  ],
  support: [
    { label: "Contact", href: "mailto:support@peptideplaybook.com" },
    { label: "Help Center", href: "/help" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Peptide Playbook</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              The complete educational guide to understanding peptides, their research status, and how to talk to your doctor.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Peptide Playbook. All rights reserved.
            </p>
          </div>
          
          {/* Prominent disclaimer */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              <span className="font-semibold">Important Disclaimer:</span> This product provides educational information only and is NOT medical advice. 
              Peptide Playbook does not provide dosing recommendations, treatment guidance, or vendor referrals. 
              Most peptides discussed are NOT FDA-approved for human use. Always consult a licensed healthcare provider before making any health decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
