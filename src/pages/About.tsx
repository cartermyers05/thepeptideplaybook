import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { Target, BookOpen, ShieldCheck, XCircle, User, Stethoscope } from "lucide-react";

export default function About() {
  return (
    <>
      <SEOHead
        title="About Peptide Playbook | Our Mission"
        description="Peptide Playbook exists because the peptide information landscape is broken. We provide research-based education to help people make informed decisions with their doctors."
        canonical="/about"
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
                Why Peptide Playbook Exists
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  The peptide information landscape is broken.
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  On one side, you have TikTok influencers recommending dosages and protocols with zero medical training. On the other, you have doctors who either dismiss peptides entirely or know less about them than their patients.
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-12">
                  In between? People making health decisions based on Reddit threads, bro science, and "trust me" testimonials.
                </p>
                
                <p className="text-xl font-medium mb-12">
                  We built Peptide Playbook because you deserve better.
                </p>
              </div>

              {/* Our Team */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="content-card p-8 mb-8"
              >
                <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Research Team</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Our content is reviewed by healthcare professionals with expertise in peptide therapy and regenerative medicine.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Medical Review Board</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Coming Soon — We're establishing a formal advisory board of physicians and researchers.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* What We Do */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="content-card p-8 mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">What We Do</h2>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We synthesize peer-reviewed research, FDA documents, and regulatory filings into clear, honest educational content. No hype. No sales pitch for peptides. No pretending we know things we don't.
                </p>
                
                <ul className="space-y-3">
                  {[
                    "What the research actually shows (and where it's lacking)",
                    "What's FDA-approved vs. experimental vs. legally questionable",
                    "How to evaluate sources and spot red flags",
                    "How to have informed conversations with healthcare providers"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* What We Don't Do */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="content-card p-8 mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-destructive" />
                  </div>
                  <h2 className="text-2xl font-semibold">What We Don't Do</h2>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We don't provide medical advice. We don't recommend specific peptides, dosages, or protocols. We don't sell peptides or refer you to sources.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  That's not a cop-out — it's the only responsible approach. Your health decisions should be made with a qualified healthcare provider who knows your specific situation.
                </p>
              </motion.div>

              {/* Our Commitment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="content-card p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-success" />
                  </div>
                  <h2 className="text-2xl font-semibold">Our Commitment</h2>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Every piece of content we create is:
                </p>
                
                <ul className="space-y-3">
                  {[
                    "Based on peer-reviewed research where available",
                    "Honest about limitations and unknowns",
                    "Updated regularly as new information emerges",
                    "Free from financial conflicts (we don't sell peptides)"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
