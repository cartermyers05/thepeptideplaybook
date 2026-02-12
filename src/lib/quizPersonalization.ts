// Normalize quiz-stored goal keys to canonical keys
const goalAliases: Record<string, string> = {
  fat_loss: "weight_loss",
  anti_aging: "longevity",
  muscle: "performance",
  beginner: "general",
  cognitive: "general",
};

function resolveGoal(goal: string): string {
  return goalAliases[goal] || goal;
}

// Goal labels
export const goalLabels: Record<string, string> = {
  weight_loss: "Weight Loss",
  fat_loss: "Weight Loss",
  recovery: "Recovery & Healing",
  longevity: "Anti-Aging & Longevity",
  anti_aging: "Anti-Aging & Longevity",
  performance: "Performance & Energy",
  muscle: "Performance & Energy",
  cognitive: "Wellness",
  beginner: "Wellness",
  general: "Wellness",
};

// Peptide matching per goal
export const peptideMatching: Record<string, { primary: string; secondary: string; studies: string }> = {
  weight_loss: { primary: "Semaglutide", secondary: "Tirzepatide", studies: "200+" },
  recovery: { primary: "BPC-157", secondary: "TB-500", studies: "90+" },
  longevity: { primary: "GHK-Cu", secondary: "Epitalon", studies: "140+" },
  performance: { primary: "CJC-1295/Ipamorelin", secondary: "BPC-157", studies: "120+" },
  general: { primary: "BPC-157", secondary: "GHK-Cu", studies: "90+" },
};

// Concern-based next step cards
export const concernNextSteps: Record<string, { label: string; href: string }> = {
  doctor: { label: "Prepare for your doctor visit", href: "/guides/find-peptide-clinic" },
  safety: { label: "Review safety profile", href: "/guides/are-peptides-safe" },
  legality: { label: "Check 2026 legal status", href: "/guides/are-peptides-legal" },
  cost: { label: "See cost breakdown", href: "/guides/peptides-for-beginners" },
  effectiveness: { label: "Read the evidence", href: "/dashboard/database" },
};

export const fallbackNextStep = { label: "Explore the research", href: "/guides" };

// Goal-specific starter prompts
export const goalStarterPrompts: Record<string, string[]> = {
  weight_loss: [
    "What's the difference between semaglutide and tirzepatide for weight loss?",
    "What side effects should I watch for with GLP-1 peptides?",
    "How do I talk to my doctor about semaglutide?",
    "What does the latest research say about peptides for fat loss?",
  ],
  recovery: [
    "Is BPC-157 safe to take with common medications?",
    "What's the recommended protocol for BPC-157 for injury healing?",
    "How does TB-500 compare to BPC-157 for recovery?",
    "What does my doctor need to know about BPC-157?",
  ],
  longevity: [
    "What's the evidence for GHK-Cu in anti-aging?",
    "How does Epitalon work for longevity?",
    "What peptide combination is best for skin and aging?",
    "Are there any safety concerns with long-term GHK-Cu use?",
  ],
  performance: [
    "How does CJC-1295/Ipamorelin boost growth hormone?",
    "What's a safe starting protocol for performance peptides?",
    "Can I combine BPC-157 with growth hormone peptides?",
    "What blood work should I get before starting?",
  ],
  general: [
    "What are the most well-researched peptides right now?",
    "Which peptide has the best safety profile for beginners?",
    "How do I talk to my doctor about trying peptides?",
    "What's the difference between FDA-approved and research peptides?",
  ],
};

export function getGoalLabel(goal: string): string {
  return goalLabels[goal] || "Wellness";
}

export function getPeptideMatch(goal: string) {
  const resolved = resolveGoal(goal);
  return peptideMatching[resolved] || peptideMatching.general;
}

export function getNextStep(concerns: string[]) {
  if (!concerns || concerns.length === 0) return fallbackNextStep;
  const first = concerns[0];
  return concernNextSteps[first] || fallbackNextStep;
}

export function getStarterPrompts(goal: string): string[] {
  const resolved = resolveGoal(goal);
  return goalStarterPrompts[resolved] || goalStarterPrompts.general;
}
