import { motion } from "framer-motion";
import { Sparkles, BookOpen, Shield, Beaker, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Smart AI",
    description: "Trained on thousands of studies",
  },
  {
    icon: BookOpen,
    title: "Research Citations",
    description: "Every answer backed by sources",
  },
  {
    icon: Beaker,
    title: "Protocol Guidance",
    description: "Dosing and timing recommendations",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Warnings and contraindications",
  },
];

const demoQuestion = "What's the optimal BPC-157 dosage for tendon repair?";
const demoAnswer = `Based on current research, here's what we know:

**Recommended Range:** 250-500 mcg per injection, 1-2 times daily

**Administration:** Subcutaneous injection near the injury site

**Duration:** Typically 4-6 weeks for tendon injuries

**Citations:**
• Sikiric et al. (2018) - Journal of Orthopaedic Research
• Chang et al. (2021) - Peptides`;

export function SolutionSection() {
  return (
    <section id="demo" className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Answers in <span className="text-primary">Seconds</span>, Not Hours
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Ask anything about peptides. Get research-backed answers with citations instantly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Static Demo Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="card-clean overflow-hidden">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">PeptideGPT</p>
                  <p className="text-xs text-muted-foreground">AI Research Assistant</p>
                </div>
              </div>

              {/* Chat messages */}
              <div className="p-5 space-y-4">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-xl rounded-br-sm px-4 py-2.5 max-w-[85%]">
                    <p className="text-sm">{demoQuestion}</p>
                  </div>
                </div>

                {/* AI response */}
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-xl rounded-bl-sm px-4 py-3 max-w-[90%]">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
                      {demoAnswer}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Input hint */}
              <div className="px-5 py-4 border-t border-border">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>Ask any peptide question...</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features list */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-3">
                Your Personal Peptide Research Assistant
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Built on the latest AI technology and trained on thousands of peer-reviewed 
                studies, PeptideGPT gives you instant access to research-backed answers 
                you can trust.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-4 rounded-xl border border-border bg-card hover-lift"
                >
                  <feature.icon className="w-5 h-5 text-primary mb-2" />
                  <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
