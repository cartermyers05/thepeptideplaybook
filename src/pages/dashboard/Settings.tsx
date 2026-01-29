import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useTier } from "@/hooks/useTier";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Mail, User, Shield, Check } from "lucide-react";
import { Link } from "react-router-dom";

const allFeatures = [
  "Complete PDF Guide (80+ pages)",
  "Doctor Scripts & Checklist",
  "Peptide Database (41 peptides)",
  "AI Research Assistant",
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
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Account Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your profile and account
          </p>
        </div>

        {/* Profile Section */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Email cannot be changed
              </p>
            </div>

            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={updateProfile.isPending}
              className="btn-primary-clean"
            >
              {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Membership
          </h2>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg mb-4">
            <div>
              <p className="font-medium">{isPaid ? "Member" : "Free"}</p>
              <p className="text-sm text-muted-foreground">
                {isPaid ? "Lifetime access to all features" : "Upgrade to unlock all features"}
              </p>
            </div>
            {!isPaid && (
              <Button asChild variant="outline" size="sm">
                <Link to="/checkout">Upgrade — $67</Link>
              </Button>
            )}
          </div>

          {/* Feature Access List */}
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {isPaid ? "Your features:" : "Included with membership:"}
            </p>
            <ul className="space-y-2">
              {allFeatures.map((feature, i) => (
                <li 
                  key={i} 
                  className={`flex items-center gap-2 text-sm ${
                    isPaid ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <Check className={`w-4 h-4 ${isPaid ? "text-primary" : "text-muted-foreground"}`} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {isPaid && (
            <p className="text-sm text-muted-foreground mt-4">
              To request a refund, please contact{" "}
              <a href="mailto:support@peptideplaybook.com" className="text-primary hover:underline">
                support@peptideplaybook.com
              </a>
            </p>
          )}
        </div>

        {/* Legal Section */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Legal
          </h2>

          <ul className="space-y-2">
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
