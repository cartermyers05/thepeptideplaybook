import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah C.",
    role: "Wellness Enthusiast",
    content: "I was so confused by all the conflicting info online. This guide finally helped me understand what's actually backed by research.",
  },
  {
    name: "Mike R.",
    role: "Health Educator",
    content: "The legal classification guide alone is worth the price. Now I actually understand what's FDA-approved vs. research-only.",
  },
  {
    name: "Dr. James W.",
    role: "Physician",
    content: "Clear, well-researched, and appropriately cautious. This is how peptide education should be done.",
  },
];

const stats = [
  { value: "500+", label: "Readers" },
  { value: "100+", label: "Research Papers" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "50+", label: "Peptides Covered" },
];

export function SocialProof() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What People Are <span className="text-gradient">Saying</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real transformations from confusion to clarity.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mt-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust element */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          Based on 100+ research papers reviewed
        </motion.p>
      </div>
    </section>
  );
}
