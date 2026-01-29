import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const scripts = [
  {
    title: "Initial Conversation Starter",
    scenario: "Bringing up peptides for the first time",
    script: `"Doctor, I've been reading about peptide therapies and their research applications. I'm curious about your perspective on compounds like semaglutide or BPC-157. Have you had patients ask about these, and what's your general view on peptide therapies?"`,
  },
  {
    title: "Requesting a Referral",
    scenario: "When your doctor isn't familiar with peptides",
    script: `"I understand peptides aren't your specialty area. Would you be able to refer me to an endocrinologist or integrative medicine specialist who might have more experience with peptide therapies? I'd like to explore this with someone who has specific expertise."`,
  },
  {
    title: "Discussing Research",
    scenario: "Sharing what you've learned",
    script: `"I've been reviewing some studies on [specific peptide]. The research I found in [journal name] suggests [specific finding]. I wanted to get your clinical perspective on whether this aligns with what you've seen, and if it might be relevant for my situation."`,
  },
  {
    title: "Asking About Safety",
    scenario: "Understanding risks and monitoring",
    script: `"If I were to explore peptide therapy, what kind of monitoring would you recommend? What labs or markers should we track? I want to make sure I'm approaching this responsibly with proper medical oversight."`,
  },
  {
    title: "Handling Dismissal",
    scenario: "When met with resistance",
    script: `"I appreciate your caution. Could you help me understand your specific concerns? Is it the lack of long-term data, potential interactions with my current medications, or something else? I want to make an informed decision either way."`,
  },
];

export default function Scripts() {
  const { isPaid } = useTier();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isPaid) {
    return (
      <DashboardLayout>
        <UpgradePrompt feature="Doctor Scripts" />
      </DashboardLayout>
    );
  }

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Doctor Conversation Scripts
          </h1>
          <p className="text-muted-foreground">
            Word-for-word templates for discussing peptides with your healthcare provider
          </p>
        </div>

        <div className="space-y-6">
          {scripts.map((script, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-1">{script.title}</h3>
                  <p className="text-sm text-muted-foreground">{script.scenario}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(script.script, i)}
                  className="flex-shrink-0"
                >
                  {copiedIndex === i ? (
                    <>
                      <Check className="w-4 h-4 mr-1" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" /> Copy
                    </>
                  )}
                </Button>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm italic leading-relaxed">{script.script}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
          <h3 className="font-semibold mb-2">💡 Pro Tip</h3>
          <p className="text-sm text-muted-foreground">
            Adapt these scripts to your personal situation. The goal is to open a dialogue, 
            not to convince your doctor of anything. A good healthcare relationship is built 
            on mutual respect and open communication.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
