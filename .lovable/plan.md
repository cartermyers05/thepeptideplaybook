
# Fix Promo Code Redemption for Lucas & Improve UX

## Problem Summary

Lucas Correia (influencer) tried to use his promo code (`VIP2025`) but couldn't access the AI chatbox. His account shows:
- **tier: `free`** (should be `insider`)
- **No promo code redemption record** in the database
- **Has `stripe_customer_id`** (was redirected to checkout instead)

**Root causes:**
1. The promo code flow relies on localStorage, which can be lost if the user confirms email on a different browser/device or clears their cache
2. There's no way to redeem a promo code after signup - users who miss the opportunity are stuck at checkout with no option to enter a code
3. The "Have a promo code?" collapsible section is easy to miss during signup

---

## Solution: Three-Part Fix

### Part 1: Immediate Fix for Lucas
Manually upgrade Lucas's account in the database:
- Set `tier` to `insider`
- Set `subscription_status` to `active`

### Part 2: Add Promo Code Input to Checkout Page
Allow users who reach checkout to still apply a promo code before paying:

```text
Current Checkout:
┌─────────────────────────────────┐
│  Full Access — $67               │
│  [Pay Now Button]                │
└─────────────────────────────────┘

New Checkout:
┌─────────────────────────────────┐
│  Full Access — $67               │
│                                  │
│  🎁 Have a promo code?           │  ← Collapsible input
│  ┌──────────────┬───────┐        │
│  │ VIP2025      │ Apply │        │
│  └──────────────┴───────┘        │
│  ✓ VIP Access unlocked!          │
│                                  │
│  [Pay Now Button]                │
│        OR                        │
│  [Access Dashboard →]            │  ← Shows if promo applied
└─────────────────────────────────┘
```

### Part 3: Make Signup Promo Input More Visible
- Auto-expand the promo code section if a `?code=` URL parameter is present (already working)
- Add a subtle badge/highlight to draw attention to the promo code option

---

## Technical Changes

| File | Change |
|------|--------|
| Database | Update Lucas's profile to `tier: insider`, `subscription_status: active` |
| `src/pages/Checkout.tsx` | Add `PromoCodeInput` component with redirect logic when code applied |
| `src/pages/Signup.tsx` | Minor UX improvement to make promo input more visible |

---

## Checkout Page Changes (Main Fix)

```typescript
// In Checkout.tsx - Add promo code redemption:

const [promoApplied, setPromoApplied] = useState(false);

const handlePromoSuccess = async (code: string, type: string) => {
  if (type === "free_access") {
    // Call redeem-promo-code edge function
    const { data, error } = await supabase.functions.invoke("redeem-promo-code", {
      body: { code },
    });
    
    if (data?.success) {
      setPromoApplied(true);
      // Invalidate tier cache
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({ title: "VIP Access Activated!", description: "Redirecting to dashboard..." });
      setTimeout(() => navigate("/dashboard"), 1500);
    }
  }
};

// In the UI, add PromoCodeInput above the payment button
<PromoCodeInput
  onValidCode={handlePromoSuccess}
  onInvalidCode={() => {}}
/>

{promoApplied && (
  <Button onClick={() => navigate("/dashboard")}>
    Go to Dashboard →
  </Button>
)}
```

---

## Expected Result

After implementation:
1. **Lucas gets immediate access** via database update
2. **Future influencers** who reach checkout can still enter their promo code
3. **No more "stuck at checkout"** - users always have a path to redeem promo codes
4. **Better UX** - promo code option is visible at the critical conversion point

---

## Testing Checklist

After changes:
- [ ] Create new account without promo code → arrives at checkout → enter promo code → redirected to dashboard
- [ ] Create new account with promo code during signup → goes directly to dashboard
- [ ] Verify Lucas can now access AI chatbox
