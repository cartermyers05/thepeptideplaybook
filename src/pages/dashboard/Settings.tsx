import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useTier } from "@/hooks/useTier";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Mail, User, Shield, Check, Settings as SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";

const allFeatures = [
  "Peptide Database (41 peptides)",
  "AI Research Assistant",
  "Source Evaluation Checklist",
  "Monthly Research Digest",
  "Lifetime Updates",
  "Email Support",
];

export default function Settings() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const { tier, isPaid } = useTier();
  const updateProfile = useUpdateProfile();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (profile?.full_name) {
      setFullName(profile.full_name);
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({ full_name: fullName });
      toast({
        title: "Profile updated",
        description: "Your changes have been saved.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto animate-fade-up">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
            <p className="text-muted-foreground text-sm">
              Manage your profile and account
            </p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="card-premium p-6 mb-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Email cannot be changed
              </p>
            </div>

            <div>
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={updateProfile.isPending}
              className="btn-teal"
            >
              {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="card-premium p-6 mb-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Membership
          </h2>

          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10 mb-4">
            <div>
              <p className="font-semibold">Member</p>
              <p className="text-sm text-muted-foreground">
                Full access to all features
              </p>
            </div>
            <div className="milestone-badge">Active</div>
          </div>

          {/* Feature Access List */}
          <div className="space-y-2">
            <p className="text-sm font-medium mb-3">
              {isPaid ? "Your features:" : "Included with membership:"}
            </p>
            <ul className="space-y-2.5">
              {allFeatures.map((feature, i) => (
                <li 
                  key={i} 
                  className="flex items-center gap-3 text-sm"
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    isPaid ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Check className="w-3 h-3" />
                  </div>
                  <span className={isPaid ? "text-foreground" : "text-muted-foreground"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {isPaid && (
            <p className="text-sm text-muted-foreground mt-6 pt-4 border-t border-border">
              To request a refund, please contact{" "}
              <a href="mailto:support@peptideplaybook.com" className="text-primary hover:underline">
                support@peptideplaybook.com
              </a>
            </p>
          )}
        </div>

        {/* Legal Section */}
        <div className="card-premium p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Legal
          </h2>

          <ul className="space-y-3">
            <li>
              <Link to="/terms" className="text-sm text-primary hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-sm text-primary hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className="text-sm text-primary hover:underline">
                Medical Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
