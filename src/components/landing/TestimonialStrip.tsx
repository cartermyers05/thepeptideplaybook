import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "I was spending hours on Reddit trying to figure out dosing. This gave me a clear, research-backed protocol in minutes.",
    name: "Mike R.",
    context: "34, fitness enthusiast",
  },
  {
    quote: "Finally something that isn't trying to sell me peptides. Just honest, cited research I can actually bring to my doctor.",
    name: "Sarah K.",
    context: "41, biohacker",
  },
  {
    quote: "The AI coach answered questions my clinic couldn't. Saved me from stacking compounds that don't work together.",
    name: "James T.",
    context: "29, athlete",
  },
  {
    quote: "Worth 10x what I paid. The weekly digest alone keeps me more informed than any forum or podcast.",
    name: "David L.",
    context: "47, health optimizer",
  },
];

export function TestimonialStrip() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What Researchers Are Saying
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed flex-1 mb-4">
                "{t.quote}"
              </p>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.context}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
