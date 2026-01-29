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

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const }
  },
};

export function WhoThisIsFor() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30 relative section-gradient-top">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* For you */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="glass-card-success p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <motion.div 
                className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Check className="w-4 h-4 text-success" />
              </motion.div>
              This Is For You If...
            </h3>
            <motion.ul 
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
            >
              {forYou.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-3"
                  variants={listItemVariants}
                >
                  <motion.div 
                    className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    whileHover={{ scale: 1.2 }}
                  >
                    <Check className="w-3 h-3 text-success" />
                  </motion.div>
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Not for you */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="glass-card-destructive p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <motion.div 
                className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <X className="w-4 h-4 text-destructive" />
              </motion.div>
              Not For You If...
            </h3>
            <motion.ul 
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
            >
              {notForYou.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-3"
                  variants={listItemVariants}
                >
                  <motion.div 
                    className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    whileHover={{ scale: 1.2 }}
                  >
                    <X className="w-3 h-3 text-destructive" />
                  </motion.div>
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
