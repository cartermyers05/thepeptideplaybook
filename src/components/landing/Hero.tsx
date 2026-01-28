import { motion } from "framer-motion";
import { ArrowRight, Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-semibold tracking-tight leading-[1.1] mb-6">
              Stop Taking Peptide Advice From 19-Year-Olds on TikTok
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Stay current on peptide research and ask our AI assistant anything — backed by real science, not TikTok trends.
            </p>

            <div className="space-y-4">
              <Button asChild size="lg" className="btn-primary-clean h-12 px-8 text-base">
                <Link to="/signup">
                  Start Learning — $67
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>

              <p className="text-sm text-muted-foreground">
                Instant access • 30-day guarantee
              </p>
            </div>
          </motion.div>

          {/* Chat Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="glass-card-subtle p-6"
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Peptide Assistant</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>

              {/* Chat messages */}
              <div className="space-y-4 mb-6">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Is BPC-157 legal to buy?</p>
                  </div>
                </div>

                {/* Assistant message */}
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-sm text-foreground leading-relaxed">
                      It depends on your location and intended use. In the US, BPC-157 is not FDA-approved and is sold only for research purposes...
                    </p>
                  </div>
                </div>
              </div>

              {/* Input field */}
              <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-4 py-3">
                <input
                  type="text"
                  placeholder="Ask anything about peptides..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  disabled
                />
                <Send className="w-4 h-4 text-muted-foreground" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
