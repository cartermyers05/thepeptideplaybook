import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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
    question: "Can I get a refund?",
    answer: "Yes. 30-day money-back guarantee, no questions asked. If you're not satisfied, email us and we'll refund you immediately.",
  },
  {
    question: "Do you sell peptides?",
    answer: "No. We provide education only. We don't sell peptides, recommend vendors, or have any affiliate relationships with peptide suppliers.",
  },
];

function FAQItem({ 
  question, 
  answer, 
  isOpen, 
  onClick 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-start justify-between gap-4 text-left group"
      >
        <span className="text-lg md:text-xl font-medium group-hover:text-primary transition-colors">
          {question}
        </span>
        <div className="flex-shrink-0 mt-1">
          {isOpen ? (
            <Minus className="w-5 h-5 text-primary" />
          ) : (
            <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-muted-foreground leading-relaxed max-w-2xl">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 md:py-40">
      <div className="container px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight sticky top-32">
              Frequently
              <br />
              Asked
              <br />
              Questions
            </h2>
          </motion.div>

          {/* Right - Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="border-t border-border">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { faqs };
