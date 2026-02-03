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
              Your personal peptide course. Personalized protocols, step-by-step guidance, and 24/7 AI coaching.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h4 className="font-semibold text-sm mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#features" className="text-slate-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#curriculum" className="text-slate-400 hover:text-white transition-colors">
                    Curriculum
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-slate-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-slate-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/guides" className="text-slate-400 hover:text-white transition-colors">
                    Free Guides
                  </Link>
                </li>
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

        {/* Legal Disclaimer */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <p className="text-xs text-slate-500 leading-relaxed max-w-4xl mx-auto text-center">
            Peptide Playbook provides educational content based on published research. This is not medical advice, diagnosis, or treatment. The information provided is for educational purposes only and is not intended to replace professional medical advice. Always consult a qualified healthcare provider before starting any new supplement, peptide, or health protocol. Individual results may vary. Peptide Playbook does not sell peptides or recommend specific vendors.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            © 2026 Peptide Playbook. All rights reserved.
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
