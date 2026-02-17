import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is this medical advice?",
    answer: "No. Peptide Playbook is an educational research tool. All information comes from published, peer-reviewed studies. We present what the research shows — we don't prescribe, diagnose, or replace your doctor. Think of it as the most well-researched friend you've ever had.",
  },
  {
    question: "How is this different from free information on Reddit or TikTok?",
    answer: "Two things: it's personalized to YOUR goals (not generic), and every answer cites actual published research (not 'trust me bro'). Our AI is trained on 500+ peer-reviewed studies. It also gives you dose, timing, diet, exercise, and side effect management — not just 'take BPC-157.'",
  },
  {
    question: "What peptides does this cover?",
    answer: "45+ peptides including BPC-157, TB-500, GHK-Cu, CJC-1295, Ipamorelin, Semaglutide, AOD-9604, Tesamorelin, Epitalon, PT-141, MK-677, Sermorelin, and more. The database is updated monthly with new research.",
  },
  {
    question: "Is this a subscription?",
    answer: "No. $67 one-time payment. Lifetime access. No monthly fees, no upsells, no 'premium tier.' You get everything.",
  },
  {
    question: "What if it's not for me?",
    answer: "30-day money-back guarantee. No questions asked. If you don't find it valuable, you get a full refund.",
  },
  {
    question: "How fast do I get access?",
    answer: "Instantly. Complete checkout, create your account, and your personalized protocol is ready in under 2 minutes.",
  },
  {
    question: "I'm completely new to peptides. Is this for me?",
    answer: "Especially for you. The AI adapts to your experience level. If you're brand new, it explains everything from scratch — what peptides are, how they work, how to reconstitute, where to inject, what to expect. No prior knowledge needed.",
  },
  {
    question: "Is this legal?",
    answer: "Peptide Playbook is an educational tool — 100% legal. As for the peptides themselves: some are FDA-approved (semaglutide, tesamorelin), others are sold as research compounds. The product includes a full 2026 legal status breakdown for every peptide covered.",
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
