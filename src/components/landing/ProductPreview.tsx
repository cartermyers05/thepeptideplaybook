import { motion } from "framer-motion";
import { Bot, Database, ShieldCheck, Mail, Sparkles, ArrowRight } from "lucide-react";
import { FloatingOrbs } from "./FloatingOrbs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const aiFeatures = [
  "Compare any two peptides side-by-side",
  "Check FDA approval status instantly",
  "Get research summaries with citations",
  "Understand mechanisms of action",
];

const products = [
  {
    icon: Database,
    title: "Peptide Database",
    description: "Look up any peptide and instantly see its research status, FDA classification, mechanism of action, and safety considerations.",
    stats: "41 peptides • Searchable • Filterable",
  },
  {
    icon: ShieldCheck,
    title: "Source Evaluation Checklist",
    description: "Before you buy anything from anyone, run them through this checklist. Know exactly what legitimate sources look like.",
    stats: "5 red flags • Verification steps",
  },
  {
    icon: Mail,
    title: "Monthly Research Digest",
    description: "New studies, FDA updates, and research developments delivered monthly. Stay current without doing the work yourself.",
    stats: "Monthly updates • Included forever",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const }
  },
};

export function ProductPreview() {
  return (
    <section id="product" className="py-20 md:py-28 bg-secondary/30 relative section-gradient-top overflow-hidden">
      <FloatingOrbs variant="subtle" />
      
      {/* Accent line */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(263 70% 42% / 0.4), transparent)",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Here's Exactly What You Get
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to understand peptides. All in one place.
          </p>
        </motion.div>

        {/* Featured AI Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="glass-card p-8 glow-border shadow-glow relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
            
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Bot className="w-7 h-7 text-primary" />
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">AI Research Assistant</h3>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-xs font-medium text-primary">Featured</span>
                    </div>
                    <p className="text-sm text-muted-foreground">The core of Peptide Playbook AI</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Your personal peptide researcher available 24/7. Ask about mechanisms, research status, 
                  FDA classification, safety considerations, and more. Trained on peer-reviewed literature 
                  covering 41+ peptides.
                </p>

                <ul className="space-y-2 mb-6">
                  {aiFeatures.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <Link to="/signup">
                  <Button className="btn-primary-clean group">
                    Get Full Access
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="hidden md:block">
                <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-3">Example questions:</p>
                  <div className="space-y-2">
                    {[
                      "What's the difference between BPC-157 and TB-500?",
                      "Is semaglutide safe for long-term use?",
                      "What peptides are FDA approved for weight loss?",
                      "How does MK-677 affect sleep quality?",
                    ].map((q, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="bg-background rounded-lg px-3 py-2 text-xs border border-border/30"
                      >
                        "{q}"
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other products grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass-card p-6 glow-border group"
              whileHover={{ 
                y: -6,
                boxShadow: "0 20px 40px -10px rgba(124, 58, 237, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <product.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                {product.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {product.description}
              </p>
              <p className="text-xs font-medium text-primary">{product.stats}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
