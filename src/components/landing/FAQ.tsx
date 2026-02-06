import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Can't I just use ChatGPT for this?",
    answer: "You can, but ChatGPT's peptide knowledge is general, sometimes outdated, and it doesn't track FDA status changes. Our AI is specifically built on peptide research and tells you when evidence is weak vs. strong. It also creates personalized protocols based on your specific goals.",
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
        <span className="text-lg md:text-xl font-medium group-hover:text-foreground transition-colors">
          {question}
        </span>
        <div className="flex-shrink-0 mt-1">
          {isOpen ? (
            <Minus className="w-5 h-5 text-primary" />
          ) : (
            <Plus className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
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
