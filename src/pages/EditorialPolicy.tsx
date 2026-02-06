import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { SITE_URL } from "@/lib/seo";
import { 
  Target, 
  BookOpen, 
  ShieldCheck, 
  XCircle, 
  RefreshCw, 
  Mail,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Peptide Playbook",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  publishingPrinciples: `${SITE_URL}/editorial-policy`,
  description: "Evidence-based peptide education platform providing research summaries on BPC-157, TB-500, semaglutide, and other peptides.",
  sameAs: [],
};

export default function EditorialPolicy() {
  return (
    <>
      <SEOHead
        title="Editorial Policy: How We Evaluate Peptide Evidence"
        description="Learn how Peptide Playbook evaluates research evidence. We separate animal studies from human trials, link to primary sources, and acknowledge what we don't know."
        canonical="/editorial-policy"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                Our Editorial Policy
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                How We Evaluate Peptide Evidence
              </p>

              {/* Our Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card-subtle p-8 mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We cut through peptide misinformation by providing evidence-based education, not medical advice. Our goal is to help you understand what research actually shows, so you can have informed conversations with healthcare providers.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The peptide information landscape is filled with hype, bro-science, and misleading claims. We believe you deserve better.
                </p>
              </motion.div>

              {/* How We Evaluate Evidence */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card-subtle p-8 mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">How We Evaluate Evidence</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    "We separate animal studies from human trials and clearly label each",
                    "We explicitly state when human evidence doesn't exist",
                    "We link to primary sources (PubMed, FDA.gov, WADA)",
                    "We acknowledge what we don't know in every guide",
                    "We cite specific studies with links, not vague claims",
                    "We update content when new research emerges"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Evidence Hierarchy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card-subtle p-8 mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">Evidence Hierarchy We Use</h2>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Not all evidence is equal. We evaluate research quality using this hierarchy:
                </p>
                <ol className="space-y-3">
                  {[
                    { level: "1", type: "Randomized Controlled Trials (RCTs)", strength: "Strongest" },
                    { level: "2", type: "Human Observational Studies", strength: "Strong" },
                    { level: "3", type: "Animal Studies (in vivo)", strength: "Moderate" },
                    { level: "4", type: "Cell/In Vitro Studies", strength: "Limited" },
                    { level: "5", type: "Anecdotal Reports", strength: "Weakest" },
                  ].map((item) => (
                    <li key={item.level} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                      <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                        {item.level}
                      </span>
                      <div className="flex-1">
                        <span className="font-medium">{item.type}</span>
                        <span className="text-muted-foreground text-sm ml-2">({item.strength})</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.div>

              {/* What We Don't Do */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card-subtle p-8 mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-destructive" />
                  </div>
                  <h2 className="text-2xl font-semibold">What We Don't Do</h2>
                </div>
                <ul className="space-y-3">
                  {[
                    "We don't provide medical advice",
                    "We don't recommend specific dosages or protocols",
                    "We don't sell peptides or refer to sources",
                    "We don't make claims beyond what research supports",
                    "We don't accept payment to promote products",
                    "We don't claim certainty where uncertainty exists"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Update Policy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card-subtle p-8 mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">Update Policy</h2>
                </div>
                <ul className="space-y-3">
                  {[
                    "All guides are reviewed at least monthly",
                    "Major updates are noted in each guide's changelog",
                    "FDA and WADA regulatory changes are reflected within 7 days",
                    "New significant studies are incorporated within 30 days",
                    "All articles display their last review date"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <RefreshCw className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card-subtle p-8 mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">Report Errors or Outdated Information</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We strive for accuracy, but mistakes happen. If you find outdated or incorrect information in any of our guides, please let us know.
                </p>
                <a
                  href="mailto:corrections@peptideplaybook.org"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  <Mail className="w-4 h-4" />
                  corrections@peptideplaybook.org
                </a>
              </motion.div>

              {/* Link to About */}
              <div className="text-center pt-8 border-t border-border">
                <p className="text-muted-foreground mb-4">
                  Want to learn more about who we are?
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  Read About Peptide Playbook <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
