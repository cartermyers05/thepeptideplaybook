import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const forYou = [
  "You're curious about peptides but tired of conflicting information",
  "You want to understand what the research actually says, not opinions",
  "You plan to work with a doctor but want to be an informed patient",
  "You're tired of TikTok and Reddit being your primary sources",
  "You want to know how to evaluate sources before buying anything",
];

const notForYou = [
  "You want someone to tell you exactly what to take and how much",
  "You're looking for peptide sources or where to buy",
  "You want to bypass working with a healthcare provider",
  "You think this will replace actual medical advice",
];

export function WhoThisIsFor() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* For you */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-success" />
              </div>
              This Is For You If...
            </h3>
            <ul className="space-y-4">
              {forYou.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-success" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not for you */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="w-4 h-4 text-destructive" />
              </div>
              Not For You If...
            </h3>
            <ul className="space-y-4">
              {notForYou.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
