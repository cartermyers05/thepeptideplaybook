
# Affiliate Link System: Complete Fix

## Overview

The current affiliate/referral system has critical gaps that prevent it from working. This plan fixes all issues to ensure affiliate links function correctly.

---

## Current Problems

| Problem | Impact |
|---------|--------|
| No `/ref/:code` route exists | Referral links return 404 |
| Wrong domain (`peptideplaybook.ai`) | Links don't reach the site |
| No referral tracking on signup | Referrer never gets credit |
| Partners form doesn't save | Applications are lost |
| No edge function to handle referral link redirect | No cookie/tracking mechanism |

---

## Implementation Plan

### 1. Create Referral Landing Page

**File:** `src/pages/ReferralLanding.tsx`

A page that handles `/ref/:code` URLs:
- Extracts the referral code from URL
- Saves code to `localStorage` (`referral_code`)
- Redirects user to `/signup` with the code preserved
- Shows a brief "Redirecting..." message with referrer benefit info

### 2. Add Route for Referral Links

**File:** `src/App.tsx`

Add route:
```tsx
<Route path="/ref/:code" element={<ReferralLanding />} />
```

### 3. Fix Referral Link Domain

**File:** `src/pages/Referral.tsx`

Change line 56 from:
```typescript
const referralLink = referralCode ? `https://peptideplaybook.ai/ref/${referralCode}` : "";
```
To:
```typescript
const referralLink = referralCode ? `${window.location.origin}/ref/${referralCode}` : "";
```

This uses the actual site domain dynamically.

### 4. Update Signup to Track Referrer

**File:** `src/pages/Signup.tsx`

Changes:
1. On mount, check for `referral_code` in localStorage
2. After successful signup, if referral code exists:
   - Update the `referrals` table to set `referred_id` to new user's ID
   - Clear the localStorage entry

### 5. Create Partner Application Table

**Database migration:**

```sql
CREATE TABLE partner_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  social_handle TEXT NOT NULL,
  follower_count TEXT,
  why_partner TEXT,
  how_promote TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  notes TEXT
);

-- Enable RLS
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (public form)
CREATE POLICY "Anyone can submit application" 
  ON partner_applications FOR INSERT 
  WITH CHECK (true);

-- Only admins can read/update
CREATE POLICY "Admins can view applications"
  ON partner_applications FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE user_id = auth.uid() AND tier = 'admin'
  ));
```

### 6. Update Partners Page to Save Applications

**File:** `src/pages/Partners.tsx`

Update `handleSubmit` to insert into `partner_applications` table:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
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

  if (error) {
    toast({
      title: "Submission Failed",
      description: "Please try again later.",
      variant: "destructive",
    });
  } else {
    toast({
      title: "Application Submitted!",
      description: "We'll review and get back within 48 hours.",
    });
    setFormData({...});
  }
  setIsSubmitting(false);
};
```

### 7. Update Referral Tracking on Purchase

**File:** `supabase/functions/verify-payment/index.ts`

After payment verification, check if user was referred:
1. Look up `referrals` table where `referred_id = user_id`
2. If found and `status = 'pending'`:
   - Update `status` to `'completed'`
   - Mark for reward (set `reward_applied` or trigger referrer benefit)

---

## File Changes Summary

| File | Action | Changes |
|------|--------|---------|
| `src/pages/ReferralLanding.tsx` | Create | New page to handle `/ref/:code` |
| `src/App.tsx` | Modify | Add route for `/ref/:code` |
| `src/pages/Referral.tsx` | Modify | Fix domain in referral link |
| `src/pages/Signup.tsx` | Modify | Track referral code, update referrals table |
| `src/pages/Partners.tsx` | Modify | Save applications to database |
| `supabase/functions/verify-payment/index.ts` | Modify | Complete referral on payment |
| Database | Migration | Create `partner_applications` table |

---

## Complete Referral Flow After Fix

1. User A generates referral link: `https://peptideplaybook.com/ref/ABC123`
2. User B clicks link
3. `ReferralLanding` page saves `ABC123` to localStorage, redirects to `/signup`
4. User B signs up
5. Signup flow reads localStorage, calls update on `referrals` table setting `referred_id`
6. User B pays $67
7. `verify-payment` marks referral as `completed`
8. User A sees completed referral count increase on `/referral` page

---

## Updated Referral Link Copy

Also update the messaging on the referral page since the product is now $67 one-time (not subscription-based):

**Current:** "Give 14 Days, Get 1 Month Free"  
**Updated:** "Give $10 Off, Get $10 Credit"

Or align with affiliate program:  
**Alternative:** "Share and Earn 50% Commission ($33.50 per referral)"

---

## Testing Checklist

After implementation:
- [ ] `/ref/TESTCODE` redirects to signup with code preserved
- [ ] Signup page reads referral code from localStorage
- [ ] After signup, referrals table has `referred_id` set
- [ ] After payment, referral status becomes `completed`
- [ ] Partner application form saves to database
- [ ] Referral link uses correct domain
- [ ] Twitter/email share buttons work with correct URL
