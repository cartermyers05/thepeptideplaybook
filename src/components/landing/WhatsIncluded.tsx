import { motion } from "framer-motion";
import { BookOpen, Scale, Stethoscope, ShieldAlert, FlaskConical } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Complete Peptide Breakdown",
    description: "What each peptide actually does (mechanism of action in plain English). The real research: animal studies vs. human trials, study sizes, findings. FDA status: what's approved, what's Category 2, what's in legal gray areas.",
  },
  {
    icon: ShieldAlert,
    title: "The TikTok Fact-Check",
    description: "Common claims vs. what peer-reviewed research actually shows. Red flags that indicate bad advice. How to evaluate sources yourself.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Conversation Scripts",
    description: "Exact questions to ask your healthcare provider. How to bring up peptides without getting dismissed. What to do if your doctor isn't knowledgeable.",
  },
  {
    icon: Scale,
    title: "Source Evaluation Guide",
    description: "Red flags for sketchy peptide sources. What quality testing actually means. Legal realities you need to understand.",
  },
  {
    icon: FlaskConical,
    title: "Peptide-by-Peptide Deep Dives",
    description: "BPC-157, TB-500, Semaglutide, Tirzepatide, Ipamorelin, CJC-1295, and more. Research status, regulatory classification, known risks, unknowns.",
  },
];

export function WhatsIncluded() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Finally — A Resource You Can Actually Trust
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand peptides and have informed conversations with your doctor
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 8px 30px rgba(139, 92, 246, 0.12)" 
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="glass-card-subtle p-6 cursor-pointer group"
              >
                <motion.div 
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
                </motion.div>
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
