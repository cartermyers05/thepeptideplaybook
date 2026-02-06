import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const previews = [
  {
    question: "Can I take BPC-157 with TB-500?",
    answer: "Yes. They use different mechanisms and are commonly stacked together. BPC-157 promotes blood vessel growth at the injury site, while TB-500 helps move repair cells to the area...",
  },
  {
    question: "Is semaglutide safe long-term?",
    answer: "The STEP trials followed patients for 68 weeks with a favorable safety profile. Common side effects include nausea and GI issues that typically decrease over time...",
  },
  {
    question: "How do I calculate my dose?",
    answer: "Use this formula: Desired Dose ÷ Concentration = Volume to inject. For example, if you want 250mcg from a 2.5mg/mL solution: 0.25mg ÷ 2.5mg/mL = 0.1mL (10 units)...",
  },
];

interface ConversationPreviewsProps {
  onSeeAnswer?: () => void;
}

export function ConversationPreviews({ onSeeAnswer }: ConversationPreviewsProps) {
  const handleClick = () => {
    if (onSeeAnswer) {
      onSeeAnswer();
    } else {
      // Scroll to guided demo section
      const demoSection = document.querySelector('section:has(h2:contains("Try It Now"))');
      if (demoSection) {
        demoSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            See What You Can Ask
          </h2>
          <p className="text-muted-foreground text-lg">
            Real questions. Research-backed answers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {previews.map((preview, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
            >
              {/* Question */}
              <div className="mb-3">
                <div className="inline-block bg-primary/10 text-primary text-sm px-3 py-1.5 rounded-lg">
                  "{preview.question}"
                </div>
              </div>

              {/* Truncated answer */}
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {preview.answer}
              </p>

              {/* See full answer link */}
              <button
                onClick={handleClick}
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                See full answer
                <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
