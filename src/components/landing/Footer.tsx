import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1a0a2e] to-[#0f051a] text-white py-12 relative overflow-hidden">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div>
            <p className="text-white font-semibold text-lg">Peptide Playbook AI</p>
            <p className="text-sm text-purple-200/70">Educational content. Not medical advice.</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/terms" className="text-purple-200/60 hover:text-purple-300 transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-purple-200/60 hover:text-purple-300 transition-colors">
              Privacy
            </Link>
            <Link to="/disclaimer" className="text-purple-200/60 hover:text-purple-300 transition-colors">
              Disclaimer
            </Link>
            <a
              href="mailto:support@peptideplaybook.com"
              className="text-purple-200/60 hover:text-purple-300 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="border-t border-purple-500/20 pt-8">
          <p className="text-xs text-purple-200/60 text-center max-w-2xl mx-auto mb-4">
            Peptide Playbook AI provides educational information based on published research. 
            It is not medical advice and does not replace consultation with a healthcare provider.
          </p>
          <p className="text-xs text-purple-200/50 text-center">
            © {new Date().getFullYear()} Peptide Playbook AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
