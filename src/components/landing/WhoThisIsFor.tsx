import { motion } from "framer-motion";

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
            className="content-card p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold mb-6 text-success">
              This Is For You If...
            </h3>
            <motion.ul 
              className="space-y-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
            >
              {forYou.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="pl-4 border-l-2 border-success/60 text-muted-foreground py-1"
                  variants={listItemVariants}
                >
                  {item}
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
            className="content-card p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold mb-6 text-destructive">
              Not For You If...
            </h3>
            <motion.ul 
              className="space-y-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
            >
              {notForYou.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="pl-4 border-l-2 border-destructive/60 text-muted-foreground py-1"
                  variants={listItemVariants}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
