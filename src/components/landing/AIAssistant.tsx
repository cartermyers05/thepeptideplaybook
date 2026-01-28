import { motion } from "framer-motion";
import { Bot, Send } from "lucide-react";

export function AIAssistant() {
  return (
    <section className="py-24 md:py-32">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                Got questions? Ask the assistant.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Your purchase includes access to our AI-powered peptide assistant. 
                Get answers to your questions instantly — grounded in research, not Reddit threads.
              </p>
              <p className="text-sm text-muted-foreground">
                Educational information only. Not medical advice.
              </p>
            </motion.div>

            {/* Chat mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                rotateX: 2, 
                rotateY: -2,
                transition: { duration: 0.3 }
              }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="glass-card-subtle p-6"
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                <motion.div 
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Bot className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <p className="font-medium text-sm">Peptide Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
              </div>

              {/* Chat messages */}
              <div className="space-y-4 mb-6">
                {/* User message */}
                <motion.div 
                  className="flex justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">What's the difference between BPC-157 and TB-500?</p>
                  </div>
                </motion.div>

                {/* Assistant message */}
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-sm text-foreground leading-relaxed">
                      Great question. Both are peptides studied for tissue repair, but they work differently
                      <span className="typing-cursor" />
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Input field */}
              <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-4 py-3">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  disabled
                />
                <Send className="w-4 h-4 text-muted-foreground" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
