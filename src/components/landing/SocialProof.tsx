import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const stats = [
  { value: "200+", label: "Hours of Research" },
  { value: "15", label: "Peptides Covered" },
  { value: "24/7", label: "AI Research Assistant" },
];

const testimonials = [
  {
    quote: "I was about to order from some random website I found on Reddit. This guide saved me from making a huge mistake.",
    name: "Sarah C.",
    detail: "First-time researcher",
  },
  {
    quote: "Finally understand what's actually legal vs what TikTok makes you think is fine. Game changer.",
    name: "Mike R.",
    detail: "Fitness enthusiast",
  },
  {
    quote: "The doctor conversation scripts alone were worth it. My doc actually took me seriously for once.",
    name: "James W.",
    detail: "Health optimizer",
  },
];

export function SocialProof() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4">
        {/* Header */}
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
            Real feedback from people who stopped guessing and got clarity.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="glass-card p-6"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-muted-foreground mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                  <span className="text-sm">👤</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.detail}</p>
                </div>
              </div>
              <div className="flex gap-1 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Placeholder notice */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground mb-12"
        >
          * Testimonials shown are representative examples. Replace with real customer feedback.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 max-w-3xl mx-auto"
        >
          <p className="text-center text-sm text-muted-foreground mb-6">
            Based on extensive review of published scientific literature
          </p>
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
