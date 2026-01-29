import { motion } from "framer-motion";
import { X } from "lucide-react";

const consequences = [
  "You waste money on peptides that don't do what you thought they would",
  "You buy from sketchy sources because you don't know how to evaluate them",
  "Your doctor thinks you're getting your medical advice from TikTok (because you kind of are)",
  "You worry about safety but don't actually know what to look for",
  "You miss out on peptides that might actually help because you can't separate hype from research",
];

export function AgitationSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-12">
            Here's What Happens When You Stay Confused
          </h2>

          <ul className="space-y-4 mb-10">
            {consequences.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 text-lg text-muted-foreground"
              >
                <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 text-destructive" />
                </div>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground text-center leading-relaxed"
          >
            The peptide space isn't going to clean itself up. The misinformation isn't 
            going away. The only question is: are you going to keep guessing, or are you 
            going to actually learn this stuff?
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
