import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Terms of Service | Peptide Playbook"
        description="Terms of Service for Peptide Playbook digital products and website usage."
        canonical="/terms"
        noIndex
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto prose prose-lg"
            >
              <h1>Terms of Service</h1>
              <p className="text-muted-foreground">Last Updated: January 2026</p>

              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using the Peptide Playbook website and digital products ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                Peptide Playbook provides educational digital content about peptide research, FDA regulations, and related topics. The Service includes:
              </p>
              <ul>
                <li>Digital guide (PDF and online access)</li>
                <li>Educational articles and blog content</li>
                <li>AI-powered educational assistant</li>
              </ul>

              <h2>3. Educational Content Only</h2>
              <p>
                <strong>IMPORTANT:</strong> All content provided through the Service is for educational and informational purposes only. It is NOT medical advice. The content does not establish a doctor-patient relationship. Always consult a qualified healthcare provider before making any health decisions.
              </p>

              <h2>4. Digital Product Delivery</h2>
              <p>
                Upon purchase, you will receive immediate digital access to the Peptide Playbook. This is a digital product; no physical items will be shipped. Access is provided through download links and/or online platform access.
              </p>

              <h2>5. Refund Policy</h2>
              <p>
                We offer a 30-day money-back guarantee. If you are not satisfied with your purchase, contact us within 30 days for a full refund. No questions asked.
              </p>

              <h2>6. Intellectual Property</h2>
              <p>
                All content included in the Service, including text, graphics, logos, and digital downloads, is the property of Peptide Playbook and is protected by copyright laws. You may not:
              </p>
              <ul>
                <li>Reproduce or distribute the content without permission</li>
                <li>Share your account access with others</li>
                <li>Use the content for commercial purposes without authorization</li>
                <li>Modify or create derivative works</li>
              </ul>

              <h2>7. User Conduct</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Interfere with the proper functioning of the Service</li>
                <li>Misrepresent the content as medical advice</li>
              </ul>

              <h2>8. AI Assistant Limitations</h2>
              <p>
                The AI educational assistant is a tool that provides general information based on its training. It cannot provide personalized medical advice, diagnoses, or treatment recommendations. Users must not rely on AI responses for health decisions.
              </p>

              <h2>9. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, PEPTIDE PLAYBOOK SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>

              <h2>10. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>

              <h2>11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of significant changes by posting a notice on our website. Continued use of the Service after changes constitutes acceptance of the new terms.
              </p>

              <h2>12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
              </p>

              <h2>13. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us at support@peptideplaybook.com.
              </p>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
