import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does PeptideGPT work?",
    answer: "PeptideGPT is powered by advanced AI trained on thousands of peer-reviewed studies, clinical trials, and research papers about peptides. When you ask a question, it searches through this knowledge base to provide you with accurate, research-backed answers complete with citations.",
  },
  {
    question: "Is the information medically accurate?",
    answer: "Our AI is trained on peer-reviewed research and always provides citations so you can verify the information. However, PeptideGPT is an educational tool and not a substitute for professional medical advice. Always consult with a healthcare provider before starting any peptide protocol.",
  },
  {
    question: "What's included in the $1 trial?",
    answer: "The $1 trial gives you full access to PeptideGPT for 7 days. You can ask unlimited questions, save your research, and access all features. After 7 days, you'll be charged $20/month unless you cancel.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely! There are no contracts or commitments. You can cancel your subscription at any time from your account settings. If you cancel during the trial, you won't be charged the monthly fee.",
  },
  {
    question: "How is this different from ChatGPT?",
    answer: "While ChatGPT is a general-purpose AI, PeptideGPT is specifically trained on peptide research. We provide accurate dosing recommendations, safety information, and always cite our sources. Our system is regularly updated with the latest research.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied with PeptideGPT for any reason, contact us within 30 days of your purchase and we'll refund you in full.",
  },
  {
    question: "What peptides can I ask about?",
    answer: "You can ask about any research peptide including BPC-157, TB-500, GHRPs, GHRHs, Thymosin peptides, Melanotan, and many more. Our database covers hundreds of peptides and is constantly expanding.",
  },
  {
    question: "How often is the research updated?",
    answer: "We continuously update our knowledge base as new research is published. Our AI is retrained regularly to incorporate the latest studies and clinical findings in peptide research.",
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
            Everything you need to know about PeptideGPT.
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
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-soft"
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
