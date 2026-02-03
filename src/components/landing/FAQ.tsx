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
    answer: "No. Peptide Playbook provides educational information based on published research. It explains what studies show about mechanisms, safety, and research status. It does not tell you what to take, how much to take, or where to buy. Always work with a healthcare provider for medical decisions.",
  },
  {
    question: "How is this different from ChatGPT?",
    answer: "ChatGPT gives generic answers. Peptide Playbook knows YOUR protocol, YOUR goals, and guides you day-by-day through YOUR specific journey. It's like the difference between Googling 'how to learn Spanish' and using Duolingo.",
  },
  {
    question: "What if I'm a complete beginner?",
    answer: "Perfect. We built this for you. The guides assume zero prior knowledge and walk you through every single step, from reconstitution to your first injection.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. No contracts, no commitments. Cancel with one click in your account settings. You'll keep access until the end of your billing period.",
  },
  {
    question: "Do you sell peptides?",
    answer: "No. We provide education only. We don't sell peptides, recommend vendors, or have any affiliate relationships with peptide suppliers.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const }
  },
};

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
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="glass-card px-6 data-[state=open]:shadow-glow transition-all duration-300"
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
