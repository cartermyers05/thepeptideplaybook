import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import {
  Search,
  AlertTriangle,
  Stethoscope,
  DollarSign,
  MessageSquare,
  BookOpen,
  Scale,
  Shield,
  ShieldCheck,
  ArrowLeft,
  Database,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HowItWorks from "@/components/sales/HowItWorks";
import PreviewCards from "@/components/sales/PreviewCards";
import ComparisonTable from "@/components/sales/ComparisonTable";
import WhoThisIsFor from "@/components/sales/WhoThisIsFor";

const problemCards = [
  {
    icon: Search,
    text: "You've spent hours on Reddit and YouTube and you're MORE confused than when you started.",
  },
  {
    icon: AlertTriangle,
    text: "You don't know which sources to trust — everyone contradicts each other and most are selling something.",
  },
  {
    icon: Stethoscope,
    text: "You want to talk to your doctor but don't know how to bring it up without sounding like a WebMD warrior.",
  },
  {
    icon: DollarSign,
    text: "Clinics charge $300-500/month and you're not sure if that's the only path forward.",
  },
];

const valueRows = [
  {
    icon: MessageSquare,
    title: "AI Research Coach",
    desc: "Ask any peptide question and get a cited answer in seconds. Includes a built-in dosing calculator: tell it your vial size and it does the reconstitution math for you.",
    value: "$197 value",
  },
  {
    icon: BookOpen,
    title: "Complete Peptide Database",
    desc: "41+ profiles with safety data, mechanisms, and research summaries.",
    value: "$97 value",
  },
  {
    icon: Stethoscope,
    title: "Doctor Conversation Scripts",
    desc: "Walk into appointments informed with a 4-step framework.",
    value: "$47 value",
  },
  {
    icon: Scale,
    title: "2026 Legal Status Guide",
    desc: "What's approved, what's gray area, what changed. Updated regularly.",
    value: "$47 value",
  },
  {
    icon: Shield,
    title: "Safety & Interaction Profiles",
    desc: "Evidence-rated risk data, contraindications, and what to watch for.",
    value: "$47 value",
  },
];

const faqs = [
  {
    q: "Is this medical advice?",
    a: "No. Peptide Playbook is an educational research tool. It summarizes peer-reviewed studies and provides evidence ratings. Always consult your healthcare provider before making health decisions.",
  },
  {
    q: "I already know a lot about peptides. Is this for me?",
    a: "If you've been researching for a while, you'll appreciate the evidence ratings. Most content online doesn't distinguish between one animal study and multiple human trials. The AI Research Coach does — and cites its sources.",
  },
  {
    q: "What if I want a refund?",
    a: "Email us within 30 days for a full refund. No questions asked.",
  },
  {
    q: "Is this a subscription?",
    a: "No. $67 one-time. Lifetime access including future updates.",
  },
  {
    q: "How is this different from free info online?",
    a: "Free info is scattered, contradictory, and usually from people selling products. The Playbook synthesizes 500+ peer-reviewed studies with honest evidence ratings — strong when it's strong, preliminary when it's early. No hype.",
  },
];

export default function Sales() {
  return (
    <>
      <SEOHead
        title="Get Full Access — Peptide Playbook"
        description="AI research coach, 41+ peptide profiles with evidence ratings, doctor conversation scripts, 2026 legal guide. One-time $67. 30-day money-back guarantee."
        canonical="/sales"
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* Back link */}
        <div className="container px-4 pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>

        {/* SECTION 1 — HERO */}
        <section className="pt-12 pb-12 md:pt-20 md:pb-16 px-6 text-center">
          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-6">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground text-[13px]">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              500+ Studies Analyzed
            </span>
            <span className="text-muted-foreground/40 text-[13px]">·</span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground text-[13px]">
              <Database className="w-3.5 h-3.5 text-primary" />
              41+ Peptides
            </span>
            <span className="text-muted-foreground/40 text-[13px]">·</span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground text-[13px]">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              Evidence-Rated
            </span>
          </div>

          <span
            className="inline-block text-primary text-[11px] uppercase tracking-[1.5px] border border-primary/30 rounded-full px-4 py-1"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            PEPTIDE PLAYBOOK
          </span>
          <h1 className="text-[32px] md:text-[52px] font-bold leading-tight mt-6 max-w-[700px] mx-auto">
            Stop Guessing. Start Understanding.
          </h1>
          <p className="text-muted-foreground text-[17px] md:text-[20px] leading-relaxed mt-4 max-w-[600px] mx-auto">
            An AI research coach trained on 500+ peer-reviewed studies gives you
            evidence-rated peptide information, safety profiles, and doctor
            conversation scripts — in seconds, not weeks.
          </p>
          <Link to="/checkout">
            <Button className="mt-8 bg-primary text-primary-foreground font-bold text-lg min-h-[56px] min-w-[300px] w-full md:w-auto rounded-xl px-8">
              Get Full Access — $67
            </Button>
          </Link>

          {/* Expanded guarantee */}
          <div className="flex flex-col items-center gap-1.5 mt-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground text-sm font-bold">
                30-day money-back guarantee
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground/60 text-[13px]">
              <span>One-time payment</span>
              <span>·</span>
              <span>Instant access</span>
              <span>·</span>
              <span>No subscription</span>
            </div>
            <p className="text-muted-foreground text-[13px] italic max-w-[380px] mt-1">
              Try it for 30 days. If it doesn't give you clarity, get every penny back.
            </p>
          </div>
        </section>

        {/* SECTION 2 — THE PROBLEM */}
        <section className="py-10 md:py-16 px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
            Sound familiar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[700px] mx-auto">
            {problemCards.map((card, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-6"
              >
                <card.icon className="w-6 h-6 text-destructive mb-3" />
                <p className="text-[15px] text-foreground">{card.text}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-base italic text-center max-w-[500px] mx-auto mt-8">
            The research exists. It's just buried in journals nobody reads.
          </p>
        </section>

        {/* SECTION 3 — THE SOLUTION (Chat Mockup) */}
        <section className="py-10 md:py-16 px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center max-w-[650px] mx-auto mb-10">
            What if you had a research assistant that actually read the studies?
          </h2>
          <div className="bg-card border border-border rounded-xl p-6 max-w-[500px] mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-semibold text-sm">Peptide Playbook AI</span>
              <span className="text-muted-foreground/60 text-xs">Online</span>
            </div>
            <div className="flex justify-end mb-3">
              <div className="bg-secondary rounded-xl px-4 py-3 max-w-[85%]">
                <p className="text-sm">
                  Is BPC-157 actually backed by good research?
                </p>
              </div>
            </div>
            <div className="flex justify-start mb-3">
              <div className="bg-background border border-border rounded-xl px-4 py-3 max-w-[85%]">
                <p className="text-sm">
                  BPC-157 has 100+ published studies showing consistent results
                  in tissue repair — primarily in animal models. Human trial data
                  is limited but growing. Here's what the strongest studies
                  found...
                </p>
                <span
                  className="inline-block mt-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded-md"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Evidence Rating: MODERATE — Strong preclinical, limited human
                  data
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — HOW IT WORKS */}
        <HowItWorks />

        {/* SECTION 5 — WHAT YOU'LL SEE INSIDE */}
        <PreviewCards />

        {/* SECTION 6 — COMPARISON TABLE */}
        <ComparisonTable />

        {/* SECTION 7 — VALUE STACK */}
        <section className="py-10 md:py-16 px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
            Everything inside Peptide Playbook:
          </h2>
          <div className="max-w-[600px] mx-auto space-y-3">
            {valueRows.map((row, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl px-5 py-4 flex items-start gap-4"
              >
                <row.icon className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-base">{row.title}</p>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    {row.desc}
                  </p>
                </div>
                <span
                  className="text-muted-foreground/60 text-sm line-through whitespace-nowrap"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-muted-foreground/60 text-lg line-through">
              $435 total value
            </p>
            <p className="text-foreground text-[40px] font-bold mt-2">
              Your price: $67
            </p>
            <p className="text-primary text-base mt-1">
              One-time. Not a subscription. Lifetime access.
            </p>
            <Link to="/checkout">
              <Button className="mt-6 bg-primary text-primary-foreground font-bold text-lg min-h-[56px] min-w-[300px] w-full md:w-auto rounded-xl px-8">
                Get Full Access — $67
              </Button>
            </Link>
            <p className="text-muted-foreground/60 text-sm mt-3">
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
        </section>

        {/* SECTION 8 — WHO THIS IS FOR */}
        <WhoThisIsFor />

        {/* SECTION 9 — GUARANTEE */}
        <section className="px-6 py-8">
          <div className="bg-card border border-border rounded-xl p-8 max-w-[600px] mx-auto text-center">
            <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-[22px] font-bold mb-3">
              30-Day Money-Back Guarantee
            </h3>
            <p className="text-muted-foreground text-[15px] max-w-[500px] mx-auto">
              If the Peptide Playbook doesn't change how you understand peptide
              research within 30 days, email us for a full refund. No questions.
              No hassle. The risk is on us.
            </p>
          </div>
        </section>

        {/* SECTION 10 — FAQ */}
        <section className="py-10 md:py-16 px-6">
          <h2 className="text-2xl font-bold text-center mb-8">
            Common questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="max-w-[600px] mx-auto space-y-2"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-5"
              >
                <AccordionTrigger className="text-left text-base font-semibold py-4 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-[15px] pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* SECTION 11 — FINAL CTA */}
        <section className="py-10 md:py-16 px-6 text-center">
          <h2 className="text-[28px] md:text-[40px] font-bold mb-6">
            Pro-peptide. Pro-research. Anti-BS.
          </h2>
          <Link to="/checkout">
            <Button className="bg-primary text-primary-foreground font-bold text-lg min-h-[56px] min-w-[300px] w-full md:w-auto rounded-xl px-8">
              Get Full Access — $67
            </Button>
          </Link>
          <p className="text-muted-foreground/60 text-[13px] mt-3">
            One-time payment · Instant access · 30-day guarantee
          </p>
        </section>

        {/* Footer disclaimer */}
        <div className="text-center px-6 pb-12 pt-6">
          <p className="text-muted-foreground/60 text-xs max-w-[500px] mx-auto">
            Educational content only. Not medical advice. Consult your healthcare
            provider. Peptide Playbook is not affiliated with any peptide vendor.
          </p>
        </div>
      </div>
    </>
  );
}
