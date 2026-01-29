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
    answer: "No. Peptide Playbook is educational content based on published research. It explains what studies show about mechanisms, safety, and research status. It does not tell you what to take, how much to take, or where to buy. Always work with a healthcare provider for medical decisions.",
  },
  {
    question: "How is this different from free information online?",
    answer: "Free information is scattered, often wrong, and usually trying to sell you something. Peptide Playbook organizes verified research into one place, cites sources, stays updated with FDA changes, and doesn't have an agenda to sell you peptides.",
  },
  {
    question: "What if I'm not satisfied?",
    answer: "You have 30 days to request a full refund. No questions asked. Email us and we'll process it immediately.",
  },
  {
    question: "Is this a subscription?",
    answer: "No. You pay once ($67) and get lifetime access to everything, including all future updates.",
  },
  {
    question: "Will this tell me what peptides to take?",
    answer: "No. It explains what the research shows so you can have informed conversations with your doctor. The decision of what's right for you is between you and your healthcare provider.",
  },
  {
    question: "I'm not interested in taking peptides. Is this still useful?",
    answer: "Yes — if you want to understand what peptides are, how they work, and what the research landscape looks like. Many people use this to have better conversations with their doctors or simply to understand a topic they keep hearing about.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Questions You're Probably Asking
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
