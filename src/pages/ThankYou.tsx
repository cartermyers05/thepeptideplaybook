import { motion } from "framer-motion";
import { Check, Download, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo/SEOHead";

const nextSteps = [
  {
    icon: Download,
    title: "Check your email",
    description: "Your download link and login details are on the way",
  },
  {
    icon: Download,
    title: "Download the PDF",
    description: "Get the complete guide for offline access",
  },
  {
    icon: MessageSquare,
    title: "Use the AI Assistant",
    description: "Ask questions anytime about peptide research",
  },
];

export default function ThankYou() {
  return (
    <>
      <SEOHead
        title="Thank You | Peptide Playbook"
        description="Thank you for your purchase. Access your Peptide Playbook now."
        canonical="/thank-you"
        noIndex
      />
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-10 h-10 text-success" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            You're In!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for purchasing the Peptide Playbook.
          </p>

          {/* Next steps */}
          <div className="glass-card-subtle p-6 mb-8 text-left">
            <h2 className="font-semibold mb-4">What happens next:</h2>
            <div className="space-y-4">
              {nextSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <Button asChild size="lg" className="btn-primary-clean h-12 px-8 mb-4">
            <Link to="/dashboard">
              Start Exploring
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>

          <p className="text-sm text-muted-foreground mb-8">
            Need help? Reply to your confirmation email and we'll get back to you within 24 hours.
          </p>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-4">
            <strong>Remember:</strong> This is educational information, not medical advice. Always discuss health decisions with a qualified healthcare provider.
          </div>
        </motion.div>
      </div>
    </>
  );
}
