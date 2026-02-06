import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy | Peptide Playbook AI"
        description="Privacy Policy for Peptide Playbook AI. Learn how we collect, use, and protect your information."
        canonical="/privacy"
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
              <h1>Privacy Policy</h1>
              <p className="text-muted-foreground">Last Updated: January 2026</p>

              <h2>1. Information We Collect</h2>
              
              <h3>Information You Provide</h3>
              <ul>
                <li><strong>Account Information:</strong> Email address, name, and password when you create an account</li>
                <li><strong>Payment Information:</strong> Payment details processed securely through our payment processor (we do not store credit card numbers)</li>
                <li><strong>Communications:</strong> Messages you send us through support channels</li>
              </ul>

              <h3>Information Collected Automatically</h3>
              <ul>
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on site</li>
                <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
                <li><strong>Log Data:</strong> IP address, access times, referring URLs</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul>
                <li>Provide and maintain the Service</li>
                <li>Process transactions and send purchase confirmations</li>
                <li>Send important updates about the Service</li>
                <li>Respond to your support requests</li>
                <li>Improve our products and user experience</li>
                <li>Detect and prevent fraud or abuse</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>We do not sell your personal information. We may share information with:</p>
              <ul>
                <li><strong>Service Providers:</strong> Payment processors, email services, hosting providers</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger or acquisition</li>
              </ul>

              <h2>4. Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul>
                <li><strong>Stripe:</strong> Payment processing</li>
                <li><strong>Google Analytics:</strong> Website analytics</li>
                <li><strong>Email Service Provider:</strong> Transactional and marketing emails</li>
              </ul>
              <p>Each service has its own privacy policy governing the use of your information.</p>

              <h2>5. Cookies and Tracking</h2>
              <p>We use cookies and similar technologies to:</p>
              <ul>
                <li>Keep you logged in</li>
                <li>Remember your preferences</li>
                <li>Analyze site usage</li>
                <li>Support marketing efforts</li>
              </ul>
              <p>You can control cookie settings through your browser. Disabling cookies may affect site functionality.</p>

              <h2>6. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your information. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </p>

              <h2>7. Data Retention</h2>
              <p>
                We retain your information for as long as your account is active or as needed to provide services. We may retain certain information as required by law or for legitimate business purposes.
              </p>

              <h2>8. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>
              <p>To exercise these rights, contact us at privacy@peptideplaybook.org.</p>

              <h2>9. Children's Privacy</h2>
              <p>
                Our Service is not intended for users under 18 years of age. We do not knowingly collect personal information from children.
              </p>

              <h2>10. International Users</h2>
              <p>
                If you are accessing our Service from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States.
              </p>

              <h2>11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website or sending an email.
              </p>

              <h2>12. Contact Us</h2>
              <p>
                For questions about this Privacy Policy, contact us at:
              </p>
              <p>
                Email: privacy@peptideplaybook.org
              </p>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
