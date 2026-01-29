import { motion } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";

const testimonials = [
  {
    quote: "I was spending hours on Reddit trying to piece together information. This guide saved me weeks of research and gave me the confidence to actually talk to my doctor about semaglutide.",
    name: "Sarah M.",
    title: "Marketing Director, Austin TX",
    date: "January 2026",
    verified: true,
    stars: 5,
  },
  {
    quote: "The source checklist alone is worth the price. I avoided what would have been a sketchy overseas purchase because I knew exactly what red flags to look for. Probably saved me hundreds.",
    name: "Mike T.",
    title: "Software Engineer, Denver CO",
    date: "December 2025",
    verified: true,
    stars: 5,
  },
  {
    quote: "Finally, someone who presents the research without trying to sell me peptides. The database is incredible — I can actually compare what's FDA approved vs what's not. This is exactly what I needed.",
    name: "Jennifer L.",
    title: "Registered Nurse, Portland OR",
    date: "January 2026",
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
              
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
                {testimonial.verified && (
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-primary">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Buyer • {testimonial.date}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
