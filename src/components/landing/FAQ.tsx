import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What exactly is Peptide Playbook?",
    answer: "Peptide Playbook is a comprehensive educational guide that helps you understand peptides: what they are, how they work, their research status, FDA classifications, and how to have informed conversations with your doctor. It includes an AI research assistant as a bonus feature.",
  },
  {
    question: "Is this medical advice?",
    answer: "No. Peptide Playbook is strictly educational. It does NOT provide dosing recommendations, treatment advice, or substitute for professional medical guidance. We explicitly encourage you to consult licensed healthcare providers for any health decisions. The guide helps you understand the research so you can have better-informed conversations with your doctor.",
  },
  {
    question: "What's included in the $67 purchase?",
    answer: "You get instant access to the complete Peptide Playbook: 50+ peptide breakdowns, FDA & legal classification guide, doctor conversation guide, red flags to avoid, plain-English research summaries, and access to our AI research assistant. This is a one-time purchase with lifetime access and free updates.",
  },
  {
    question: "Why should I trust this over TikTok or forums?",
    answer: "We review actual published research — not influencer claims. Every peptide entry includes its research status (human trials vs. animal studies), FDA classification, and honest assessments of evidence quality. We tell you what we don't know, not just what sounds exciting.",
  },
  {
    question: "Do you provide dosing or sourcing information?",
    answer: "No. We do NOT provide dosing recommendations, vendor recommendations, or any guidance that could be construed as encouraging self-experimentation. Those decisions must be made with a licensed healthcare provider who can evaluate your individual situation.",
  },
  {
    question: "What is the AI research assistant?",
    answer: "It's a bonus feature that lets you ask questions about peptide research and get responses based on published studies. It includes strict disclaimers, refuses to provide dosing or treatment advice, and is designed purely for educational exploration — not clinical guidance.",
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes. We offer a 30-day money-back guarantee. If you're not satisfied for any reason, contact us within 30 days of purchase and we'll refund you in full, no questions asked.",
  },
  {
    question: "Will there be updates?",
    answer: "Yes. Peptide research evolves constantly. Your purchase includes lifetime access to future updates at no additional cost. When new research is published or FDA classifications change, we update the guide.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Peptide Playbook.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card px-6 data-[state=open]:shadow-soft border-0"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
