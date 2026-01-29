import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import { ClipboardCheck, Download, AlertTriangle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const redFlags = [
  {
    flag: "No Certificate of Analysis (COA)",
    good: "Third-party tested with publicly available COAs",
    bad: "No testing info or only 'in-house' testing claims",
  },
  {
    flag: "Unrealistic Claims",
    good: "References research and acknowledges limitations",
    bad: "Promises miraculous results, cures, or guarantees",
  },
  {
    flag: "No Contact Information",
    good: "Clear company info, phone, email, physical address",
    bad: "Only contact form, anonymous, offshore only",
  },
  {
    flag: "Suspiciously Low Prices",
    good: "Pricing consistent with quality compounding",
    bad: "Significantly cheaper than all competitors",
  },
  {
    flag: "Poor Packaging/Labeling",
    good: "Professional labels, batch numbers, expiration dates",
    bad: "Handwritten labels, no batch info, unclear contents",
  },
];

const verificationSteps = [
  "Request the Certificate of Analysis (COA) before purchasing",
  "Verify the testing lab is accredited (ISO 17025 or equivalent)",
  "Check purity percentage (should be 98%+ for most peptides)",
  "Look for batch/lot numbers that match the COA",
  "Confirm the company has a verifiable business presence",
  "Research reviews on independent forums (not just testimonials)",
  "Verify payment is processed through legitimate channels",
  "Ensure shipping and storage requirements are clear",
];

export default function Checklist() {
  const { canAccessGuide } = useTier();

  if (!canAccessGuide) {
    return (
      <DashboardLayout>
        <UpgradePrompt requiredTier="starter" feature="Source Checklist" />
      </DashboardLayout>
    );
  }

  return (
      <DashboardLayout>
        <div className="max-w-4xl print-content">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight mb-2">
              Source Evaluation Checklist
            </h1>
            <p className="text-muted-foreground">
              Use this checklist before purchasing from any peptide source
            </p>
          </div>
          <Button variant="outline" onClick={() => window.print()} className="no-print">
            <Download className="w-4 h-4 mr-2" />
            Print Checklist
          </Button>
        </div>

        {/* Red Flags Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Red Flags to Watch For
          </h2>
          <div className="space-y-4">
            {redFlags.map((item, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-medium mb-3">{item.flag}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-green-600 font-medium mb-1">Good Sign</p>
                      <p className="text-sm text-muted-foreground">{item.good}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-destructive font-medium mb-1">Red Flag</p>
                      <p className="text-sm text-muted-foreground">{item.bad}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Steps */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-primary" />
            Verification Steps
          </h2>
          <ol className="space-y-3">
            {verificationSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground mt-6 text-center">
          This checklist is for educational purposes. Always consult with a healthcare 
          provider before making any decisions about peptide use.
        </p>
      </div>
    </DashboardLayout>
  );
}
