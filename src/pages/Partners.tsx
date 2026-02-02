import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  DollarSign, 
  Link as LinkIcon, 
  FileText, 
  Gift, 
  Users, 
  Copy, 
  Check,
  Send,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const hookScripts = [
  "Everyone's injecting BPC-157 but nobody's reading the research. I found a tool that actually explains what we know vs what's just hype.",
  "My followers keep asking about peptides. Instead of giving bad advice, I point them here. Evidence-based, not bro-science.",
  "The FDA just put 20+ peptides on a warning list. Do you even know if yours is on it? This breaks it all down.",
  "TikTok peptide advice is going to get someone hurt. This is the resource I wish existed when I started.",
  "Before you inject anything, spend $67 to actually understand what you're putting in your body."
];

const whoWeWant = [
  { icon: "🏋️", title: "Health & Wellness Creators", desc: "Fitness influencers who prioritize evidence" },
  { icon: "🧬", title: "Biohacking Content Creators", desc: "Those exploring optimization responsibly" },
  { icon: "💪", title: "Fitness Influencers", desc: "Athletes and coaches who value safety" },
  { icon: "🩺", title: "Functional Medicine Practitioners", desc: "Healthcare providers educating patients" },
  { icon: "⏳", title: "Longevity Educators", desc: "Anti-aging content focused on evidence" },
  { icon: "🔬", title: "Health Misinformation Fighters", desc: "Anyone combating health pseudoscience" },
];

export default function Partners() {
  const { toast } = useToast();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    socialHandle: "",
    followerCount: "",
    whyPartner: "",
    howPromote: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
      toast({
        title: "Copied!",
        description: "Hook script copied to clipboard",
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("partner_applications")
        .insert({
          name: formData.name,
          email: formData.email,
          social_handle: formData.socialHandle,
          follower_count: formData.followerCount,
          why_partner: formData.whyPartner,
          how_promote: formData.howPromote,
        });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you within 48 hours.",
      });
      
      setFormData({
        name: "",
        email: "",
        socialHandle: "",
        followerCount: "",
        whyPartner: "",
        howPromote: ""
      });
    } catch (error: any) {
      console.error("Partner application error:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Partner Program: Earn 50% Commission | Peptide Playbook"
        description="Join the Peptide Playbook affiliate program. Earn 50% commission educating your audience about peptides with evidence-based content."
        canonical="/partners"
      />

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Affiliate Program
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Earn 50% Commission Educating Your Audience
              </h1>
              <p className="text-xl text-muted-foreground">
                Partner with us to fight peptide misinformation while earning $33.50 per sale.
              </p>
            </motion.div>

            {/* Commission Structure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid md:grid-cols-4 gap-6 mb-16"
            >
              {[
                { icon: DollarSign, title: "50%", desc: "Commission per sale", sub: "$33.50 on $67 product" },
                { icon: LinkIcon, title: "30 Days", desc: "Cookie window", sub: "Credit for return visitors" },
                { icon: FileText, title: "Monthly", desc: "Payouts", sub: "Via PayPal or Stripe" },
                { icon: Gift, title: "Real-time", desc: "Tracking", sub: "See your earnings live" },
              ].map((item, index) => (
                <div key={index} className="glass-card-subtle p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">{item.title}</h3>
                  <p className="font-medium mb-1">{item.desc}</p>
                  <p className="text-sm text-muted-foreground">{item.sub}</p>
                </div>
              ))}
            </motion.div>

            {/* What You Get */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center mb-8">What You Get</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: LinkIcon, title: "Unique Tracking Link", desc: "Personal affiliate link with real-time stats" },
                  { icon: FileText, title: "Swipe Copy", desc: "Ready-to-use captions for posts and stories" },
                  { icon: Sparkles, title: "5 Hook Scripts", desc: "Proven hooks for videos and reels" },
                  { icon: Gift, title: "Free Product Access", desc: "Full access to review and reference" },
                ].map((item, index) => (
                  <div key={index} className="glass-card-subtle p-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Who We're Looking For */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center mb-8">Who We're Looking For</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whoWeWant.map((item, index) => (
                  <div key={index} className="glass-card-subtle p-6 flex items-start gap-4">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hook Scripts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center mb-4">Ready-to-Use Hook Scripts</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Copy these proven hooks for your videos, stories, and posts. Each one is designed to resonate with audiences interested in peptides.
              </p>
              <div className="space-y-4 max-w-3xl mx-auto">
                {hookScripts.map((script, index) => (
                  <div
                    key={index}
                    className="glass-card-subtle p-4 flex items-start gap-4"
                  >
                    <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      {index + 1}
                    </span>
                    <p className="flex-1 text-muted-foreground leading-relaxed">
                      "{script}"
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(script, index)}
                      className="flex-shrink-0"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="glass-card-subtle p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Apply to Partner</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="socialHandle">Instagram/TikTok Handle *</Label>
                      <Input
                        id="socialHandle"
                        value={formData.socialHandle}
                        onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                        required
                        placeholder="@yourhandle"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="followerCount">Follower Count *</Label>
                      <Input
                        id="followerCount"
                        value={formData.followerCount}
                        onChange={(e) => setFormData({ ...formData, followerCount: e.target.value })}
                        required
                        placeholder="e.g., 10,000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whyPartner">Why do you want to partner with us? *</Label>
                    <Textarea
                      id="whyPartner"
                      value={formData.whyPartner}
                      onChange={(e) => setFormData({ ...formData, whyPartner: e.target.value })}
                      required
                      placeholder="Tell us about your interest in peptide education..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="howPromote">How would you promote Peptide Playbook? *</Label>
                    <Textarea
                      id="howPromote"
                      value={formData.howPromote}
                      onChange={(e) => setFormData({ ...formData, howPromote: e.target.value })}
                      required
                      placeholder="Describe your promotion strategy..."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-primary-clean"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  We review applications within 48 hours. Only serious applicants please.
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
