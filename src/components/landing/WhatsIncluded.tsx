import { BookOpen, MessageSquare, ClipboardCheck, Database, Bot, Mail } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BookOpen,
    title: "The Complete Guide",
    description: "80+ pages covering every major peptide category — GLP-1s, recovery peptides, growth hormone secretagogues, and more. Research status, mechanisms, and what we actually know.",
  },
  {
    icon: MessageSquare,
    title: "Doctor Conversation Scripts",
    description: "Word-for-word templates for bringing up peptides with your healthcare provider. Never feel awkward or dismissed again.",
  },
  {
    icon: ClipboardCheck,
    title: "Source Evaluation Checklist",
    description: "A printable one-pager with the exact red flags that reveal sketchy sources. Use it before you buy anything.",
  },
  {
    icon: Database,
    title: "Interactive Peptide Database",
    description: "Sortable, searchable database of 40+ peptides. Filter by goal, research status, FDA classification, and more.",
  },
  {
    icon: Bot,
    title: "AI Research Assistant",
    description: "Ask questions about peptide research, mechanisms, and safety. Get instant, research-backed answers 24/7.",
  },
  {
    icon: Mail,
    title: "Monthly Research Digest",
    description: "Stay current with new studies, regulatory changes, and emerging research. Delivered to your inbox every month.",
  },
];

export function WhatsIncluded() {
  return (
    <section id="features" className="py-20 bg-[#FAFBFC]">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
            WHAT'S INSIDE
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Everything You Need to Navigate Peptides With Confidence
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-white rounded-xl p-8 shadow-sm border border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
