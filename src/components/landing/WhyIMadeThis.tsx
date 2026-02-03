import { motion } from "framer-motion";

const stats = [
  { value: "200+", label: "Hours of Research" },
  { value: "15", label: "Peptides Analyzed" },
  { value: "100+", label: "Sources Reviewed" },
];

export function WhyIMadeThis() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why I Created This <span className="text-gradient">Platform</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Photo placeholder */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-3xl md:text-4xl">👤</span>
                </div>
              </div>

              {/* Story */}
              <div className="space-y-4 text-muted-foreground">
                <p>
                  "I spent months going down the peptide rabbit hole. TikTok videos. Reddit threads. 
                  Sketchy forums. The more I researched, the more I realized: most people giving advice 
                  had no idea what they were talking about."
                </p>
                <p>
                  "I'm not a doctor. I'm not going to tell you what to take. But I am someone who's 
                  done the research, and I built this platform so you don't have to waste 200+ hours 
                  like I did."
                </p>
                <p className="font-medium text-foreground">
                  "This is the resource I wish existed when I started."
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="w-8 h-0.5 bg-primary/50 mx-auto mb-3" />
                  <p className="text-xl md:text-2xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
