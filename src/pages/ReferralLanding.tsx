import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gift, ArrowRight } from "lucide-react";

export default function ReferralLanding() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      // Save the referral code to localStorage for tracking after signup
      localStorage.setItem("referral_code", code);
      
      // Redirect to signup after a brief delay to show the message
      const timer = setTimeout(() => {
        navigate("/signup", { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // No code provided, redirect immediately
      navigate("/signup", { replace: true });
    }
  }, [code, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6">
          <Gift className="w-10 h-10 text-primary-foreground" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          You've Been Invited!
        </h1>
        
        <p className="text-muted-foreground mb-6">
          A friend thinks you'd love Peptide Playbook AI. 
          Create your account to get started.
        </p>

        <div className="flex items-center justify-center gap-2 text-primary mb-8">
          <span className="font-medium">Redirecting to signup</span>
          <ArrowRight className="w-5 h-5" />
        </div>

        <div className="bg-secondary/50 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">
            Referral code: <span className="font-mono font-medium text-foreground">{code || "..."}</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
