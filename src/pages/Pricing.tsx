import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Shield, Zap, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    name: "The Complete Guide",
    description: "80+ pages of research-backed peptide education covering GLP-1s, recovery peptides, growth hormone secretagogues, and more.",
  },
  {
    name: "Peptide Database",
    description: "Search and filter 41 peptides by category, research status, and FDA classification. Includes mechanisms, studies, and safety info.",
  },
  {
    name: "AI Research Assistant",
    description: "Get instant answers about peptide mechanisms, research findings, and safety considerations. Available 24/7.",
  },
  {
    name: "Doctor Conversation Scripts",
    description: "5 word-for-word templates for talking to your healthcare provider about peptides.",
  },
  {
    name: "Source Evaluation Checklist",
    description: "Red flags and verification steps to identify legitimate sources before buying anything.",
  },
  {
    name: "Monthly Research Digest",
    description: "Stay updated on new studies, FDA changes, and emerging peptide research.",
  },
];

const faqs = [
  {
    question: "Is this a subscription?",
    answer: "No. You pay once and get lifetime access to everything, including all future updates.",
  },
  {
    question: "What if I'm not satisfied?",
    answer: "We offer a 30-day money-back guarantee. If you're not happy, email us and we'll refund you. No questions asked.",
  },
  {
    question: "Is this medical advice?",
    answer: "No. Peptide Playbook AI provides educational information based on published research. It's not a substitute for professional medical advice. Always consult a healthcare provider.",
  },
  {
    question: "How do I access the content?",
    answer: "After purchase, you'll create an account and get instant access to everything through your personal dashboard.",
  },
  {
    question: "Will this tell me what peptides to take?",
    answer: "No. We explain what the research shows: mechanisms, studies, safety profiles. This helps you have informed conversations with your doctor. We don't recommend, prescribe, or tell you what to take.",
  },
];

export default function Pricing() {

  return (
    <>
      <SEOHead
        title="Pricing | Peptide Playbook AI"
        description="Get lifetime access to Peptide Playbook AI for $67. One-time payment, no subscriptions. 30-day money-back guarantee."
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-20">
          <div className="container px-4 max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                SIMPLE PRICING
              </p>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                Simple, Honest Pricing
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                One price. Full access. No upsells, no subscriptions, no nonsense.
              </p>
            </div>

            {/* Pricing Card */}
            <div className="max-w-lg mx-auto mb-20">
              <div className="rounded-2xl border-2 border-primary shadow-xl bg-white overflow-hidden">
                {/* Header */}
                <div className="bg-primary/5 p-8 text-center border-b border-primary/10">
                  <p className="text-sm font-semibold text-primary mb-2">Complete Access</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-6xl font-bold">$67</span>
                    <span className="text-xl text-muted-foreground line-through">$197</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">One-time payment • Lifetime access</p>
                </div>

                {/* CTA */}
                <div className="p-8">
                  <Button
                    asChild
                    size="lg"
                    className="w-full btn-primary-clean h-14 text-lg mb-4"
                  >
                    <Link to="/checkout">
                      Get Full Access — $67
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" />
                      30-day guarantee
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      Instant access
                    </span>
                  </div>

                  {/* Features */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <p className="text-sm font-semibold mb-4">Everything included:</p>
                    <div className="space-y-4">
                      {features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{feature.name}</p>
                            <p className="text-xs text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="max-w-2xl mx-auto mb-20">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Common Questions</h2>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Final CTA */}
            <div className="text-center bg-muted/50 rounded-2xl p-12">
              <h2 className="text-2xl font-semibold mb-3">
                Ready to Actually Understand Peptides?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Join 4,200+ members who stopped relying on TikTok and Reddit for peptide information.
              </p>
              <Button
                asChild
                size="lg"
                className="btn-primary-clean h-12"
              >
                <Link to="/checkout">
                  Get Full Access — $67
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
