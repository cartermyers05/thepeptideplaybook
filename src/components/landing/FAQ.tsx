import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this medical advice?",
    answer: "No. The Peptide Playbook provides educational information about peptide research and regulations. It does not replace consultation with a qualified healthcare provider. Always discuss health decisions with your doctor.",
  },
  {
    question: "What peptides does this cover?",
    answer: "We cover FDA-approved peptides (semaglutide, tirzepatide, liraglutide, bremelanotide) and research peptides (BPC-157, TB-500, Ipamorelin, CJC-1295, GHK-Cu, and more). Each gets a complete breakdown of research status, regulatory classification, and what we know vs. don't know.",
  },
  {
    question: "How is this different from free info online?",
    answer: "Free information is scattered, contradictory, and often wrong. We've synthesized peer-reviewed research, FDA documents, and regulatory filings into one clear, organized resource. No TikTok bro science. No Reddit speculation. Just research.",
  },
  {
    question: "What if I'm not satisfied?",
    answer: "30-day money-back guarantee, no questions asked. If the Peptide Playbook doesn't deliver value, email us for a full refund.",
  },
  {
    question: "How do I access it?",
    answer: "Instant digital delivery. After purchase, you'll get immediate access to download the PDF and access the online version. No waiting.",
  },
  {
    question: "Will this tell me what to take?",
    answer: "No. We don't recommend specific peptides, dosages, or protocols. That's medical advice, which requires a healthcare provider who knows your situation. We give you the information to have an informed conversation with your doctor.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-border rounded-xl px-6 data-[state=open]:bg-muted/30 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-5 [&[data-state=open]>svg]:rotate-180">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

export { faqs };
