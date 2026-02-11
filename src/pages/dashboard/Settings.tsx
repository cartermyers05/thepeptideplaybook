import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useTier } from "@/hooks/useTier";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, User, Shield, Check, Settings as SettingsIcon } from "lucide-react";
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
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black">Account Settings</h1>
            <p className="text-gray-500 text-sm">
              Manage your profile and account
            </p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-black mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-gray-500" />
            Profile
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-black">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="mt-1.5 border-gray-200"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                Email cannot be changed
              </p>
            </div>

            <div>
              <Label htmlFor="name" className="text-sm font-medium text-black">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1.5 border-gray-200"
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={updateProfile.isPending}
              className="bg-black text-white hover:bg-black/90 rounded-lg"
            >
              {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-black mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-gray-500" />
            Subscription
          </h2>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 mb-4">
            <div>
              <p className="font-semibold text-black">Member</p>
              <p className="text-sm text-gray-500">
                Full access to all features
              </p>
            </div>
            <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">Active</span>
          </div>

          {/* Feature Access List */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-black mb-3">
              {isPaid ? "Your features:" : "Included with your plan:"}
            </p>
            <ul className="space-y-2.5">
              {allFeatures.map((feature, i) => (
                <li 
                  key={i} 
                  className="flex items-center gap-3 text-sm"
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    isPaid ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Check className="w-3 h-3" />
                  </div>
                  <span className={isPaid ? "text-black" : "text-gray-500"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {isPaid && (
            <p className="text-sm text-gray-500 mt-6 pt-4 border-t border-gray-100">
              To request a refund, please contact{" "}
              <a href="mailto:support@peptideplaybook.org" className="text-black hover:underline">
                support@peptideplaybook.org
              </a>
            </p>
          )}
        </div>

        {/* Legal Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-black mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-500" />
            Legal
          </h2>

          <ul className="space-y-3">
            <li>
              <Link to="/terms" className="text-sm text-gray-600 hover:text-black hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-black hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className="text-sm text-gray-600 hover:text-black hover:underline">
                Medical Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
