import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const forYou = [
  "You've seen peptides on TikTok and want the real story",
  "You're considering peptides but don't know where to start safely",
  "You've already started but feel like you're guessing",
  "You want to have an informed conversation with your doctor",
  "You're tired of conflicting advice from random internet strangers",
];

const notForYou = [
  "You're looking for someone to tell you exactly what to inject (I won't do that)",
  "You want medical advice (this is educational, not prescriptive)",
  "You're already working with a knowledgeable physician who's guiding you",
  "You think the TikTok bros have it all figured out",
];

export function WhoThisIsFor() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            This Is For You <span className="text-gradient">If...</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Perfect for you */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-success" />
              </div>
              Perfect for you if...
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
            transition={{ duration: 0.5 }}
            className="glass-card p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="w-4 h-4 text-destructive" />
              </div>
              Not for you if...
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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8 max-w-lg mx-auto"
        >
          If you're in the "not for you" camp, no hard feelings. This just isn't the right fit.
        </motion.p>
      </div>
    </section>
  );
}
