import { Link } from "react-router-dom";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container px-4">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          {/* Logo and tagline */}
          <div className="max-w-xs">
            <Logo showText size="md" className="text-white [&_span]:text-white [&_path]:stroke-teal-400 [&_circle]:fill-teal-400" />
            <p className="text-slate-400 text-sm mt-4 leading-relaxed">
              Evidence-based peptide research. No hype. No sales pitch. Just research you can trust.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h4 className="font-semibold text-sm mb-4">Research</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/guides" className="text-slate-400 hover:text-white transition-colors">
                    All Guides
                  </Link>
                </li>
                <li>
                  <Link to="/guides/bpc-157-complete-guide" className="text-slate-400 hover:text-white transition-colors">
                    BPC-157 Guide
                  </Link>
                </li>
                <li>
                  <Link to="/guides/semaglutide-complete-guide" className="text-slate-400 hover:text-white transition-colors">
                    Semaglutide Guide
                  </Link>
                </li>
                <li>
                  <Link to="/guides/are-peptides-safe" className="text-slate-400 hover:text-white transition-colors">
                    Peptide Safety
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/editorial-policy" className="text-slate-400 hover:text-white transition-colors">
                    Editorial Policy
                  </Link>
                </li>
                <li>
                  <Link to="/partners" className="text-slate-400 hover:text-white transition-colors">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-slate-400 hover:text-white transition-colors">
                    Medical Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            © 2026 Peptide Playbook. All rights reserved. Educational content only. Not medical advice.
          </p>
          <a
            href="mailto:hello@peptideplaybook.com"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            hello@peptideplaybook.com
          </a>
        </div>
      </div>
    </footer>
  );
}
