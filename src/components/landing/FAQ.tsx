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
    answer: "No. This is educational information to help you understand peptides and have informed conversations with healthcare providers. Always consult a licensed doctor before making any health decisions.",
  },
  {
    question: "I'm completely new to peptides. Is this for me?",
    answer: "Yes — this was designed for beginners. No prior knowledge needed. We start with the basics and explain everything in plain English, so you'll never feel lost or overwhelmed.",
  },
  {
    question: "What if I've already started using peptides?",
    answer: "Even better. You'll finally understand what you're doing and catch any red flags you might have missed. The legal and safety sections are especially valuable for people already in the game.",
  },
  {
    question: "How is this different from free info on Reddit/TikTok?",
    answer: "It's organized, researched, and written by someone who spent 200+ hours separating fact from bro-science. No conflicting advice, no agenda, no product pushing. Just clear, actionable information.",
  },
  {
    question: "Do I get lifetime access?",
    answer: "Yes! This is a one-time purchase with lifetime access. You'll also receive all future updates at no additional cost as peptide research evolves.",
  },
  {
    question: "What's the refund policy?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied for any reason, email us within 30 days of purchase for a full refund, no questions asked.",
  },
  {
    question: "What about the AI assistant?",
    answer: "The AI research assistant is a bonus feature that lets you ask questions about peptide research and get responses based on published studies. It's strictly educational — it won't provide dosing or treatment advice.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
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
            Everything you need to know before getting started.
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
                className="glass-card px-6 data-[state=open]:shadow-purple border-0"
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
