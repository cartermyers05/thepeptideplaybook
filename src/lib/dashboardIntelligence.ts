// Dashboard Content Intelligence — compound-specific, week-aware helpers
import type { Compound } from "@/hooks/useUserProtocol";

/* ── Compound WHY map ── */
export const COMPOUND_WHY_MAP: Record<string, string> = {
  "CJC-1295 (No DAC)":
    "Stimulates sustained GH release without desensitizing receptors — the slow-burn approach to growth hormone optimization.",
  "CJC-1295":
    "Stimulates sustained GH release without desensitizing receptors — the slow-burn approach to growth hormone optimization.",
  Ipamorelin:
    "The most selective GH secretagogue — triggers GH pulses without spiking cortisol or prolactin. The precision tool.",
  "GHK-Cu":
    "Copper peptide that activates 4,000+ genes involved in tissue remodeling. Your body's master repair signal.",
  "BPC-157":
    "Derived from gastric juice protein. Promotes angiogenesis and nitric oxide pathways for accelerated tissue repair.",
  "TB-500":
    "Thymosin beta-4 fragment. Moves repair cells TO the injury site via actin regulation. Systemic healing.",
  Semaglutide:
    "GLP-1 receptor agonist. Reduces appetite via hypothalamic signaling and slows gastric emptying.",
  "AOD-9604":
    "Fragment of human growth hormone (176-191). Stimulates lipolysis without affecting blood sugar or growth.",
  Tesamorelin:
    "FDA-approved GHRH analog. Specifically targets visceral fat reduction. The only peptide with FDA clearance for body composition.",
  Epitalon:
    "Activates telomerase to potentially slow cellular aging. Acts on the pineal gland to regulate melatonin production.",
  "PT-141":
    "Bremelanotide. Activates melanocortin receptors in the brain for libido enhancement. Works centrally, not peripherally.",
  Sermorelin:
    "GHRH analog that stimulates natural GH production. Gentler onset than CJC-1295, often used as a starting point.",
  "MK-677":
    "Not technically a peptide — it's an oral GH secretagogue. Mimics ghrelin to trigger GH release. Increases appetite significantly.",
  Tirzepatide:
    "Dual GIP/GLP-1 receptor agonist. Targets two incretin pathways for superior appetite and glucose control.",
};

/* ── Week phase label (greeting area) ── */
export function getWeekPhaseLabel(week: number | null): string {
  if (!week) return "";
  if (week === 1) return "Priming phase — your receptors are calibrating to the new signals.";
  if (week === 2) return "Adaptation phase — most users report first noticeable changes this week.";
  if (week === 3) return "Optimization phase — compound synergies are building.";
  if (week === 4) return "Acceleration phase — peak receptor sensitivity window.";
  if (week <= 8) return "Maintenance phase — consistent dosing maximizes cumulative benefits.";
  return "Final stretch — your body has fully adapted to this protocol.";
}

/* ── Progress stat card subtitle ── */
export function getProgressSubtitle(percent: number, day: number, total: number): string {
  const base = `${day} of ${total} days`;
  if (percent < 10) return `${base} — building the foundation`;
  if (percent < 25) return `${base} — early adaptation window`;
  if (percent < 50) return `${base} — hitting your stride`;
  if (percent < 75) return `${base} — past the halfway mark`;
  if (percent < 90) return `${base} — final optimization phase`;
  return `${base} — finish strong`;
}

/* ── Day card compound insight ── */
export function getDayCardInsight(week: number | null, compounds: Compound[]): string {
  if (!week) return "Protocol ramping up";
  const names = compounds.map((c) => c.name.toLowerCase());

  const hasGH = names.some((n) => n.includes("cjc") || n.includes("ipamorelin") || n.includes("sermorelin"));
  const hasHealing = names.some((n) => n.includes("bpc") || n.includes("tb-500") || n.includes("tb500"));
  const hasSkin = names.some((n) => n.includes("ghk"));

  const insights: string[] = [];

  if (hasGH) {
    if (week === 1) insights.push("GH receptor priming");
    else if (week === 2) insights.push("Pituitary response building");
    else insights.push("Peak GH pulse window");
  }
  if (hasHealing) {
    if (week === 1) insights.push("Angiogenesis initiating");
    else if (week === 2) insights.push("Tissue repair accelerating");
    else insights.push("Peak healing cascade");
  }
  if (hasSkin) {
    if (week === 1) insights.push("Collagen signaling activated");
    else if (week === 2) insights.push("Skin remodeling underway");
    else insights.push("Visible changes emerging");
  }

  return insights.length > 0 ? insights.join(" · ") : "Protocol ramping up";
}

/* ── Streak subtitle ── */
export function getStreakSubtitle(streak: number): string {
  if (streak === 0) return "Start today";
  if (streak === 1) return "Every streak starts with day 1";
  if (streak <= 3) return "Building momentum";
  if (streak <= 6) return "Consistency is the compound effect";
  if (streak <= 13) return "1 week+ streak — top 20% of users";
  if (streak <= 29) return "2 weeks+ — habit is forming";
  return "30 day streak — elite consistency";
}

/* ── Weekly briefing (compound-specific) ── */
export function getWeeklyBriefing(week: number | null, compounds: Compound[]): string {
  if (!week) return "Stay consistent with your protocol. Small daily actions compound into significant results over time.";

  const names = compounds.map((c) => c.name.toLowerCase());
  const hasGH = names.some((n) => n.includes("cjc") || n.includes("ipamorelin"));
  const hasGHKCu = names.some((n) => n.includes("ghk"));
  const hasBPC = names.some((n) => n.includes("bpc"));
  const hasTB = names.some((n) => n.includes("tb-500") || n.includes("tb500"));
  const hasSema = names.some((n) => n.includes("semaglutide") || n.includes("tirzepatide"));

  if (week === 1) {
    const parts: string[] = [];
    if (hasGH) parts.push("Your CJC-1295/Ipamorelin stack takes 5–7 days to upregulate GH receptor sensitivity. This week your pituitary is calibrating to the new signals.");
    if (hasGHKCu) parts.push("GHK-Cu begins collagen signaling immediately — copper-dependent repair pathways are already activating.");
    if (hasBPC || hasTB) parts.push("BPC-157/TB-500 are initiating angiogenesis and nitric oxide pathways at the injury site.");
    if (hasSema) parts.push("GLP-1 receptor activation begins within hours. Expect gradual appetite reduction over the first 3–5 days.");
    if (parts.length > 0) {
      parts.push("Expected this week: possibly deeper sleep by Day 4–5, mild injection site redness (normal, resolves in 30 min).");
      return parts.join(" ");
    }
  }

  if (week === 2) {
    const parts: string[] = [];
    if (hasGH) parts.push("GH pulses are now more consistent — your body has learned the rhythm. Sleep quality improvements should be noticeable.");
    if (hasGHKCu) parts.push("GHK-Cu's copper-dependent pathways are activating fibroblast migration to skin tissue. Look for improved skin hydration.");
    if (hasBPC || hasTB) parts.push("Tissue repair is accelerating. Recovery between workouts should feel noticeably faster.");
    if (hasSema) parts.push("Appetite suppression is establishing. Food noise is reducing. Stay hydrated and prioritize protein.");
    if (parts.length > 0) {
      parts.push("Watch for: improved recovery, morning energy increase, and better sleep architecture.");
      return parts.join(" ");
    }
  }

  if (week >= 3 && week <= 4) {
    const parts: string[] = [];
    if (hasGH) parts.push("Peak receptor sensitivity window. Your CJC/Ipa synergy is at full effect — GH pulses are largest this week.");
    if (hasGHKCu) parts.push("GHK-Cu collagen remodeling is accelerating. This is when most users see visible skin improvements.");
    if (hasBPC || hasTB) parts.push("Peak healing cascade — tissue remodeling is at maximum velocity. Maintain consistent dosing.");
    if (hasSema) parts.push("Full appetite regulation established. Body composition changes becoming visible. Don't reduce calories too aggressively.");
    if (parts.length > 0) {
      parts.push("Keep diet and training consistent to maximize this window.");
      return parts.join(" ");
    }
  }

  if (week >= 5 && week <= 8) {
    return `Week ${week} of your protocol. Compounds are at steady-state levels — this is where consistency pays compound dividends. Your body has fully adapted to the signaling pattern. Maintain timing, track changes in the Progress tab, and don't adjust doses without reviewing with the AI Coach.`;
  }

  if (week >= 9) {
    return `Week ${week} — final stretch. Your body has fully adapted to this protocol. Focus on documenting results for your end-of-cycle assessment. Any body composition or recovery improvements you're seeing are the cumulative effect of consistent administration.`;
  }

  return `Week ${week} of your protocol. Your body continues adapting to the peptide signals. Maintain consistent timing and dosing for optimal receptor engagement. Track any changes in the Progress tab.`;
}

/* ── This Week guidance ── */
export function getThisWeekGuidance(week: number | null): string {
  if (!week || week === 1)
    return "Starting phase. Inject at the same time daily to establish rhythm. Common first-week experiences: mild injection site irritation, slightly deeper sleep, possible appetite changes. All normal and typically resolve within days.";
  if (week === 2)
    return "Adaptation phase. Your body has recognized the signals. Focus on consistent timing — same time each day maximizes receptor binding. Begin tracking energy and sleep in the Progress tab.";
  return "Optimization phase. Compounds are at steady-state levels. This is where consistency pays off. Don't change doses without reviewing with the AI Coach.";
}

/* ── Protocol category derived from compounds ── */
export function getProtocolCategory(compounds: Compound[]): string {
  const names = compounds.map((c) => c.name.toLowerCase());
  const categories: string[] = [];

  if (names.some((n) => n.includes("cjc") || n.includes("ipamorelin") || n.includes("sermorelin") || n.includes("mk-677")))
    categories.push("GH Optimization");
  if (names.some((n) => n.includes("bpc") || n.includes("tb-500") || n.includes("tb500")))
    categories.push("Recovery & Healing");
  if (names.some((n) => n.includes("ghk")))
    categories.push("Skin & Tissue Repair");
  if (names.some((n) => n.includes("semaglutide") || n.includes("tirzepatide") || n.includes("aod")))
    categories.push("Body Composition");
  if (names.some((n) => n.includes("epitalon")))
    categories.push("Longevity");
  if (names.some((n) => n.includes("pt-141")))
    categories.push("Performance");

  return categories.length > 0 ? categories.join(" + ") : "Custom Protocol";
}

/* ── Lookup WHY for a compound name (fuzzy match) ── */
export function getCompoundWhy(compoundName: string): string | null {
  // Try exact match first
  if (COMPOUND_WHY_MAP[compoundName]) return COMPOUND_WHY_MAP[compoundName];

  // Fuzzy match
  const lower = compoundName.toLowerCase();
  for (const [key, value] of Object.entries(COMPOUND_WHY_MAP)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return value;
    }
  }
  return null;
}
