import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How is this different from ChatGPT?",
    answer: "ChatGPT gives general answers and sometimes makes things up. Our AI is built specifically on peptide research. It cites real studies, tracks FDA status, and tells you when evidence is weak instead of guessing.",
  },
  {
    question: "Is this medical advice?",
    answer: "No. The Peptide Playbook is an educational research tool. We help you understand the science so you can have informed conversations with your healthcare provider. We include doctor conversation scripts for exactly this reason.",
  },
  {
    question: "What if I'm a complete beginner?",
    answer: "Perfect. The quiz personalizes everything to your experience level. The AI adapts its explanations to where you are. No jargon, no assumptions. We start from the basics and build up.",
  },
  {
    question: "What if it's not for me?",
    answer: "You're covered by our 30-day money-back guarantee. If the Playbook doesn't help you, email us and we'll refund you. No questions asked.",
  },
  {
    question: "Do you sell peptides?",
    answer: "No. We don't sell peptides, we don't have affiliate deals with suppliers, and we have no financial incentive to recommend one peptide over another. This is pure education and research.",
  },
  {
    question: "Is my information secure?",
    answer: "Yes. We use 256-bit SSL encryption and Stripe for payments. We never share your data with third parties. Your research journey stays private.",
  },
];

function FAQItem({ 
  question, 
  answer, 
  isOpen, 
  onClick,
  index,
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      className="border-b border-border"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-start justify-between gap-4 text-left group"
      >
        <span className="text-lg md:text-xl font-medium group-hover:text-foreground transition-colors">
          {question}
        </span>
        <motion.div
          className="flex-shrink-0 mt-1"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {isOpen ? (
            <Minus className="w-5 h-5 text-primary" />
          ) : (
            <Plus className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          )}
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 md:py-40">
      <div className="container px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Heading with gradient text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight sticky top-32">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, hsl(var(--foreground)), #60A5FA, #A78BFA, hsl(var(--foreground)))",
                  backgroundSize: "300% 100%",
                  animation: "gradient-shift 8s ease infinite",
                }}
              >
                Frequently
              </span>
              <br />
              Asked
              <br />
              Questions
            </h2>
          </motion.div>

          {/* Right - Accordion */}
          <div>
            <div className="border-t border-border">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { faqs };
