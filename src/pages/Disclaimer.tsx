import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <>
      <SEOHead
        title="Medical Disclaimer | Peptide Playbook"
        description="Medical disclaimer for Peptide Playbook. This product provides educational information, not medical advice."
        canonical="/disclaimer"
        noIndex
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
              {/* Warning banner */}
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 mb-8 flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-lg mb-1">Important Medical Disclaimer</h2>
                  <p className="text-muted-foreground">
                    Please read this disclaimer carefully before using this website or purchasing any products.
                  </p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h1>Medical Disclaimer</h1>
                <p className="text-muted-foreground">Last Updated: January 2026</p>

                <h2>1. Educational Information Only</h2>
                <p>
                  The content provided by Peptide Playbook, including but not limited to the website, digital products, AI chatbot, and any associated materials, is for <strong>educational and informational purposes only</strong>. This content is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
                </p>

                <h2>2. Not Medical Advice</h2>
                <p>
                  Nothing contained in Peptide Playbook should be construed as medical advice. The information provided does not create a doctor-patient relationship between you and Peptide Playbook or any of its creators, contributors, or affiliates.
                </p>

                <h2>3. Consult a Healthcare Provider</h2>
                <p>
                  <strong>Always seek the advice of your physician or other qualified healthcare provider</strong> with any questions you may have regarding a medical condition, treatment, or medication. Never disregard professional medical advice or delay in seeking it because of something you have read on this website or in our products.
                </p>

                <h2>4. No Recommendations</h2>
                <p>
                  Peptide Playbook does not recommend or endorse any specific peptides, dosages, protocols, sources, or treatments. Any discussion of specific compounds is purely educational and based on publicly available research.
                </p>

                <h2>5. Research Limitations</h2>
                <p>
                  Much of the information about peptides discussed in our materials is based on animal studies or limited human research. The absence of robust clinical trials means that <strong>safety and efficacy in humans is often not established</strong>.
                </p>

                <h2>6. Regulatory Status</h2>
                <p>
                  Many peptides discussed in our materials are <strong>not FDA-approved for human use</strong>. Some are classified as FDA Category 2 substances, meaning compounding pharmacies cannot legally produce them. The regulatory and legal status of peptides varies by jurisdiction.
                </p>

                <h2>7. Assumption of Risk</h2>
                <p>
                  Any actions you take based on information from Peptide Playbook are taken at your own risk. We are not liable for any damages or negative consequences resulting from the use of information provided.
                </p>

                <h2>8. AI Chatbot Limitations</h2>
                <p>
                  Our AI chatbot is an educational tool that provides general information about peptide research. It <strong>cannot and does not provide</strong> personalized medical advice, diagnoses, or treatment recommendations. The AI may produce errors or outdated information.
                </p>

                <h2>9. No Endorsement of Use</h2>
                <p>
                  The information provided by Peptide Playbook does not constitute an endorsement or recommendation of any specific peptide for personal use. We do not encourage, endorse, or condone the use of any peptide without proper medical supervision.
                </p>

                <h2>10. Accuracy and Updates</h2>
                <p>
                  While we strive to provide accurate and up-to-date information, the field of peptide research is constantly evolving. We cannot guarantee that all information is current or complete.
                </p>

                <div className="bg-muted/50 rounded-xl p-6 mt-8">
                  <p className="font-medium mb-2">By using this website or purchasing our products, you acknowledge that:</p>
                  <ul className="mb-0">
                    <li>You have read, understood, and agree to this disclaimer</li>
                    <li>You will consult a healthcare provider before making health decisions</li>
                    <li>You understand this is educational content, not medical advice</li>
                    <li>You assume all risk associated with actions you take based on this information</li>
                  </ul>
                </div>

                <h2>11. Contact Us</h2>
                <p>
                  If you have any questions about this disclaimer, please contact us at legal@peptideplaybook.com.
                </p>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
