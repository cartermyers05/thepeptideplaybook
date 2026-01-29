import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "I was spending hours on Reddit trying to piece together information. This guide saved me weeks of research and gave me the confidence to actually talk to my doctor.",
    name: "Sarah M.",
    verified: true,
    stars: 5,
  },
  {
    quote: "The source checklist alone is worth the price. I avoided what would have been a sketchy purchase because I knew what red flags to look for.",
    name: "Mike T.",
    verified: true,
    stars: 5,
  },
  {
    quote: "Finally, someone who presents the research without trying to sell me peptides. This is exactly what I needed.",
    name: "Jennifer L.",
    verified: true,
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-[#FAFBFC]">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            What Members Are Saying
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-border"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center justify-between">
                <p className="font-medium">— {testimonial.name}</p>
                {testimonial.verified && (
                  <span className="text-xs text-primary font-medium">Verified Buyer</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
