import { motion } from "framer-motion";
import { BookOpen, Database, Bot, FileText, ShieldCheck, Mail } from "lucide-react";

const products = [
  {
    icon: BookOpen,
    title: "The Complete Guide",
    description: "80+ pages covering every major peptide category — GLP-1s, recovery peptides, growth hormone secretagogues, and more. Each section explains mechanisms, research status, FDA classification, and what the studies actually show.",
    stats: "8 chapters • 82 pages • Downloadable PDF",
  },
  {
    icon: Database,
    title: "Peptide Database",
    description: "Look up any peptide and instantly see its research status, FDA classification, mechanism of action, key studies, and safety considerations. Filter by category or research strength.",
    stats: "41 peptides • Searchable • Filterable",
  },
  {
    icon: Bot,
    title: "AI Research Assistant",
    description: "Ask questions about peptide mechanisms, research findings, or safety considerations and get clear, research-based answers. Available 24/7.",
    stats: "Instant answers • Educational only",
  },
  {
    icon: FileText,
    title: "Doctor Conversation Scripts",
    description: "Know exactly what to say when you bring up peptides with your doctor. Templates for starting conversations, requesting referrals, and handling dismissal.",
    stats: "5 scripts • Copy & paste",
  },
  {
    icon: ShieldCheck,
    title: "Source Evaluation Checklist",
    description: "Before you buy anything from anyone, run them through this checklist. Know exactly what legitimate sources look like — and what sketchy ones do to trick you.",
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
    <section id="product" className="py-20 md:py-28 bg-secondary/30 relative section-gradient-top">
      <div className="container px-4">
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
            Everything you need to understand peptides — in one place.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
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
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors"
                whileHover={{ scale: 1.05 }}
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
