import { motion } from "framer-motion";
import { X } from "lucide-react";

const consequences = [
  "You waste money on peptides that don't do what you thought they would",
  "You buy from sketchy sources because you don't know how to evaluate them",
  "Your doctor thinks you're getting your medical advice from TikTok (because you kind of are)",
  "You worry about safety but don't actually know what to look for",
  "You miss out on peptides that might actually help because you can't separate hype from research",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const }
  },
};

export function AgitationSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30 relative section-gradient-top">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-12"
          >
            Here's What Happens When You Stay Confused
          </motion.h2>

          <motion.ul 
            className="space-y-4 mb-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {consequences.map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4 text-lg text-muted-foreground group"
              >
                <motion.div 
                  className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <X className="w-4 h-4 text-destructive" />
                </motion.div>
                <span className="group-hover:text-foreground transition-colors duration-200">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg text-muted-foreground text-center leading-relaxed glass-card-subtle p-6 rounded-xl"
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
