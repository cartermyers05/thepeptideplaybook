import { GuideLayout } from "@/components/guides/GuideLayout";
import { QuickAnswerBox } from "@/components/guides/QuickAnswerBox";
import { BottomLineBox } from "@/components/guides/BottomLineBox";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { GuideDisclaimer } from "@/components/guides/GuideDisclaimer";
import { RelatedGuides } from "@/components/guides/RelatedGuides";
import { GuideTableOfContents } from "@/components/guides/GuideTableOfContents";
import { SITE_URL } from "@/lib/seo";

const tocItems = [
  { id: "what-are-gh-peptides", title: "What Are GH Peptides?", level: 2 },
  { id: "how-they-work", title: "How GH Peptides Work", level: 2 },
  { id: "popular-peptides", title: "Popular GH Peptides", level: 2 },
  { id: "sermorelin", title: "Sermorelin", level: 3 },
  { id: "ipamorelin", title: "Ipamorelin", level: 3 },
  { id: "cjc-1295", title: "CJC-1295", level: 3 },
  { id: "ghrp-2-ghrp-6", title: "GHRP-2 and GHRP-6", level: 3 },
  { id: "fda-status", title: "FDA and Regulatory Status", level: 2 },
  { id: "research-reality", title: "Research vs Reality", level: 2 },
  { id: "safety", title: "Safety Considerations", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Are growth hormone peptides legal?",
    answer:
      "It depends on the specific peptide. Sermorelin was FDA-approved but discontinued; compounding pharmacies can still prepare it. CJC-1295, ipamorelin, GHRP-2, and GHRP-6 are in regulatory limbo — not approved for human use but not controlled substances. WADA prohibits all GH secretagogues in sport.",
  },
  {
    question: "Do GH peptides actually increase HGH levels?",
    answer:
      "Yes, studies show GH secretagogues can increase growth hormone release from the pituitary gland. However, the magnitude and duration of increases vary by peptide, dose, and individual response. Whether these increases translate to meaningful clinical benefits in healthy adults remains unproven.",
  },
  {
    question: "What's the safest growth hormone peptide?",
    answer:
      "Sermorelin has the most human safety data since it was FDA-approved (though discontinued). Ipamorelin is often considered to have a favorable side effect profile in limited studies. However, 'safest' is relative — no GH peptide has undergone the rigorous long-term safety testing of FDA-approved medications.",
  },
];

const relatedGuides = [
  { title: "FDA Peptide Regulations 2026: What's Legal", href: "/guides/peptides-fda-legal-status-2026" },
  { title: "Are Peptides Safe? What the Research Shows", href: "/guides/are-peptides-safe" },
  { title: "BPC-157: Complete Research Guide", href: "/guides/bpc-157-complete-guide" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Growth Hormone Peptides: Complete Guide to Sermorelin, Ipamorelin & More [2026]",
  description: "Everything you need to know about growth hormone peptides in 2026. Sermorelin, ipamorelin, CJC-1295, GHRP-2/6 explained — mechanisms, research, FDA status, and safety considerations.",
  datePublished: "2026-01-30",
  dateModified: "2026-01-30",
  author: {
    "@type": "Organization",
    name: "Peptide Playbook",
  },
  publisher: {
    "@type": "Organization",
    name: "Peptide Playbook",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/guides/growth-hormone-peptides-guide`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function GrowthHormonePeptidesGuide() {
  return (
    <GuideLayout
      title="Growth Hormone Peptides: Complete Guide to Sermorelin, Ipamorelin & More [2026]"
      description="Everything you need to know about growth hormone peptides in 2026. Sermorelin, ipamorelin, CJC-1295, GHRP-2/6 explained — mechanisms, research, FDA status, and safety considerations."
      slug="growth-hormone-peptides-guide"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="Growth hormone (GH) peptides are synthetic compounds designed to stimulate your pituitary gland to release more growth hormone. They work differently than synthetic HGH (which directly replaces GH). Popular examples include sermorelin, ipamorelin, CJC-1295, and GHRP-2/6. Regulatory status varies — sermorelin was FDA-approved but discontinued, while others remain unapproved. Human clinical data is limited for most, and long-term safety is largely unknown."
            lastUpdated="January 30, 2026"
            readTime="12 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Growth Hormone Peptides: The Complete Guide [2026]
          </h1>

          <section id="what-are-gh-peptides" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What Are Growth Hormone Peptides?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Growth hormone peptides — also called GH secretagogues — are synthetic peptides that stimulate your pituitary gland to produce and release growth hormone. This is fundamentally different from synthetic HGH (somatropin), which directly provides growth hormone to your body.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The appeal of GH peptides over synthetic HGH includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Potentially more "natural" GH release patterns</li>
              <li>Lower cost than pharmaceutical HGH</li>
              <li>May preserve pituitary function (though unproven)</li>
              <li>Some available through compounding (legal gray area)</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              These peptides gained popularity in anti-aging, bodybuilding, and wellness communities with claims about improved recovery, body composition, sleep, and skin quality. However, most claims exceed the available evidence.
            </p>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>What this means for you:</strong> GH peptides aren't synthetic HGH — they're compounds that try to make your own pituitary work harder. Whether this approach offers advantages over (or similar benefits to) pharmaceutical HGH is largely unproven.
              </p>
            </div>
          </section>

          <section id="how-they-work" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How GH Peptides Work: GHRH vs GHRP</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              GH peptides fall into two main categories based on their mechanism:
            </p>
            
            <h3 className="text-xl font-semibold mb-3">GHRH Analogs (Growth Hormone Releasing Hormone)</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              These mimic your body's natural GHRH, which tells the pituitary to release GH. Examples: Sermorelin, CJC-1295, Tesamorelin.
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Work with your natural GH pulses</li>
              <li>Effect depends on somatostatin levels (the "brake" on GH)</li>
              <li>Generally considered to produce more physiological GH patterns</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">GHRPs (Growth Hormone Releasing Peptides)</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              These work through the ghrelin receptor (GHS-R) — the same receptor activated by the "hunger hormone." Examples: GHRP-2, GHRP-6, Ipamorelin.
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Can stimulate GH release even when somatostatin is high</li>
              <li>May increase appetite (especially GHRP-6)</li>
              <li>Can raise cortisol and prolactin (except ipamorelin)</li>
            </ul>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Synergy concept:</strong> Some practitioners combine GHRH analogs with GHRPs, theorizing that the combination produces greater GH release than either alone. Limited research supports this concept, but optimal protocols aren't established.
              </p>
            </div>
          </section>

          <section id="popular-peptides" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Popular GH Peptides Breakdown</h2>
            
            <div id="sermorelin" className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Sermorelin</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Sermorelin is a 29-amino acid peptide identical to the first 29 amino acids of natural GHRH. It was FDA-approved in the 1990s for diagnosing and treating GH deficiency in children but was voluntarily discontinued by the manufacturer in 2008 (for business reasons, not safety).
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li><strong>Status:</strong> Discontinued but can be compounded</li>
                <li><strong>Human data:</strong> Most extensive of GH peptides</li>
                <li><strong>Half-life:</strong> ~10-20 minutes (requires frequent dosing or bedtime use)</li>
                <li><strong>Typical use:</strong> Anti-aging, GH deficiency</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Because sermorelin was FDA-approved, compounding pharmacies can legally prepare it under section 503A/503B. This makes it more accessible than other GH peptides through legitimate medical channels.
              </p>
            </div>

            <div id="ipamorelin" className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Ipamorelin</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Ipamorelin is a GHRP that's selective for GH release without significantly raising cortisol, prolactin, or causing strong hunger. This selectivity made it popular in wellness circles.
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li><strong>Status:</strong> Not FDA-approved; regulatory gray area</li>
                <li><strong>Human data:</strong> Limited clinical trials</li>
                <li><strong>Half-life:</strong> ~2 hours</li>
                <li><strong>Notable:</strong> Doesn't significantly increase cortisol or appetite</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Ipamorelin is often combined with CJC-1295 (without DAC) in anti-aging protocols, though evidence for this combination is largely anecdotal.
              </p>
            </div>

            <div id="cjc-1295" className="mb-8">
              <h3 className="text-xl font-semibold mb-3">CJC-1295</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                CJC-1295 is a modified GHRH analog designed for longer duration of action. It comes in two forms:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li><strong>CJC-1295 with DAC:</strong> Drug Affinity Complex extends half-life to 6-8 days; produces sustained GH elevation</li>
                <li><strong>CJC-1295 without DAC (Mod GRF 1-29):</strong> Half-life ~30 minutes; produces GH pulses</li>
              </ul>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Status:</strong> Not FDA-approved. The DAC version is generally avoided due to concerns about sustained GH elevation (which doesn't mimic natural pulsatile release).
              </p>
            </div>

            <div id="ghrp-2-ghrp-6" className="mb-8">
              <h3 className="text-xl font-semibold mb-3">GHRP-2 and GHRP-6</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                These are older GHRPs that strongly stimulate GH release through the ghrelin receptor.
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li><strong>GHRP-6:</strong> Strong GH release but causes significant hunger; raises cortisol and prolactin</li>
                <li><strong>GHRP-2:</strong> Stronger GH release than GHRP-6; less hunger but still raises cortisol/prolactin</li>
                <li><strong>Status:</strong> Neither FDA-approved; Category 2 status unclear</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                These peptides are less popular now due to side effects, with ipamorelin generally preferred for its cleaner profile.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Peptide</th>
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Half-Life</th>
                    <th className="text-left p-3 font-semibold">FDA Status</th>
                    <th className="text-left p-3 font-semibold">Compoundable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Sermorelin</td>
                    <td className="p-3 text-muted-foreground">GHRH</td>
                    <td className="p-3 text-muted-foreground">10-20 min</td>
                    <td className="p-3 text-muted-foreground">Discontinued</td>
                    <td className="p-3 text-muted-foreground">Yes</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Ipamorelin</td>
                    <td className="p-3 text-muted-foreground">GHRP</td>
                    <td className="p-3 text-muted-foreground">~2 hours</td>
                    <td className="p-3 text-muted-foreground">Not approved</td>
                    <td className="p-3 text-muted-foreground">Gray area</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">CJC-1295 (no DAC)</td>
                    <td className="p-3 text-muted-foreground">GHRH</td>
                    <td className="p-3 text-muted-foreground">~30 min</td>
                    <td className="p-3 text-muted-foreground">Not approved</td>
                    <td className="p-3 text-muted-foreground">Gray area</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">GHRP-2</td>
                    <td className="p-3 text-muted-foreground">GHRP</td>
                    <td className="p-3 text-muted-foreground">~1 hour</td>
                    <td className="p-3 text-muted-foreground">Not approved</td>
                    <td className="p-3 text-muted-foreground">Unclear</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">GHRP-6</td>
                    <td className="p-3 text-muted-foreground">GHRP</td>
                    <td className="p-3 text-muted-foreground">~1 hour</td>
                    <td className="p-3 text-muted-foreground">Not approved</td>
                    <td className="p-3 text-muted-foreground">Unclear</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="fda-status" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">FDA and Regulatory Status</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The regulatory landscape for GH peptides is complex:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Sermorelin:</strong> Was FDA-approved, now discontinued — can be legally compounded</li>
              <li><strong>Tesamorelin (Egrifta):</strong> FDA-approved for HIV-associated lipodystrophy only</li>
              <li><strong>Ipamorelin, CJC-1295, GHRP-2/6:</strong> Not FDA-approved; not explicitly banned; regulatory limbo</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>WADA prohibition:</strong> All GH secretagogues are banned in sport under category S2 (Peptide Hormones, Growth Factors, Related Substances, and Mimetics).
            </p>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>What this means for you:</strong> Sermorelin is the clearest legal option through compounding pharmacies with a prescription. Other GH peptides occupy a gray area — not controlled substances, but not approved for human use either.
              </p>
            </div>
          </section>

          <section id="research-reality" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Research vs Reality</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>What the research shows:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>GH peptides can increase GH and IGF-1 levels</li>
              <li>Sermorelin improved body composition in some GH-deficient patients</li>
              <li>Limited studies show potential benefits for sleep, recovery, skin quality</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>What's missing:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Large-scale clinical trials in healthy adults</li>
              <li>Long-term safety data</li>
              <li>Proof that raising GH in non-deficient individuals provides benefits</li>
              <li>Optimal dosing protocols</li>
            </ul>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Critical point:</strong> Raising a hormone level doesn't automatically mean clinical benefit. GH therapy in non-deficient adults is controversial — some studies show body composition changes, but effects on meaningful health outcomes are uncertain.
              </p>
            </div>
          </section>

          <section id="safety" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Safety Considerations</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Known potential side effects of GH elevation:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Joint pain and swelling</li>
              <li>Carpal tunnel syndrome</li>
              <li>Insulin resistance</li>
              <li>Fluid retention</li>
              <li>Potential cancer promotion concerns (theoretical with long-term use)</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Peptide-specific concerns:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>GHRP-2/6: Cortisol and prolactin elevation</li>
              <li>GHRP-6: Strong hunger response</li>
              <li>CJC-1295 with DAC: Sustained non-physiological GH elevation</li>
              <li>All: Product quality from unregulated sources</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Bottom line:</strong> Short-term use of sermorelin and ipamorelin appears relatively well-tolerated based on limited data. Long-term effects in healthy adults trying to "optimize" are unknown.
            </p>
          </section>

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="Growth hormone peptides like sermorelin, ipamorelin, and CJC-1295 can increase GH release from your pituitary. Sermorelin has the strongest legal standing (compoundable). Human data is limited for most peptides, and long-term safety in healthy adults is unknown. If you're considering these, sermorelin through a licensed compounding pharmacy with medical supervision is the most legitimate route." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
