
# Fix: Promo Code Users Skipping Onboarding/Quiz

## The Problem

When users sign up with a promo code (especially `free_access` type), they're being dumped directly into the dashboard with a pre-assigned "beginner" course without ever going through the quiz to personalize their experience.

### What's Happening Now

```text
User with promo code signup flow:
┌─────────────┐     ┌──────────────────┐     ┌───────────┐
│   Signup    │ --> │  Checkout page   │ --> │ Dashboard │
│  (w/ code)  │     │  redeems code    │     │ (generic  │
└─────────────┘     │  creates course  │     │  course!) │
                    └──────────────────┘     └───────────┘
                            ↓
                    Quiz completely skipped!
```

### What Should Happen

```text
Correct flow for promo code users:
┌─────────────┐     ┌──────────────────┐     ┌──────────┐     ┌───────────┐
│   Signup    │ --> │  Checkout page   │ --> │   Quiz   │ --> │ Dashboard │
│  (w/ code)  │     │  redeems code    │     │ (pick    │     │ (personal │
└─────────────┘     │  (NO course yet) │     │   goal)  │     │   course) │
                    └──────────────────┘     └──────────┘     └───────────┘
```

## Root Cause

Two issues working together:

1. **`redeem-promo-code` edge function** - Automatically creates a "beginner" course when a `free_access` code is redeemed (lines 166-205)

2. **`Checkout.tsx`** - Redirects directly to `/dashboard` after promo redemption instead of to `/quiz`

## The Fix

### 1. Update `redeem-promo-code` Edge Function

Stop auto-creating courses for promo code users. The promo code should only:
- Upgrade the user's tier to "insider"
- Set subscription_status to "active"
- Record the redemption

The course creation should happen later when the user completes the quiz.

### 2. Update `Checkout.tsx`

After a successful promo code redemption, redirect to `/quiz` instead of `/dashboard`:

```tsx
// Before:
setTimeout(() => navigate("/dashboard"), 1500);

// After:
setTimeout(() => navigate("/quiz"), 1500);
```

### 3. Update Promo Applied Success State

Change the "Go to Dashboard" button to "Start Quiz" and update messaging accordingly.

## Files to Modify

| File | Changes |
|------|---------|
| `supabase/functions/redeem-promo-code/index.ts` | Remove automatic course creation for free_access promo codes |
| `src/pages/Checkout.tsx` | Redirect promo users to `/quiz` instead of `/dashboard` |

## Technical Details

### `redeem-promo-code/index.ts` Changes

Remove lines 166-205 that create the beginner course:

```typescript
// REMOVE THIS BLOCK:
// Check if user already has a course
const { data: existingCourse } = await supabaseAdmin
  .from("user_courses")
  .select("id")
  .eq("user_id", userId)
  .maybeSingle();

if (!existingCourse) {
  // Create a beginner course for promo code users
  // ...entire block...
}
```

Keep only the tier upgrade:
```typescript
if (promoCode.type === "free_access") {
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .update({ 
      tier: "insider",
      subscription_status: "active"
    })
    .eq("user_id", userId);

  // ... error handling ...
  logStep("User upgraded to member", { userId });
  // DO NOT create course here
}
```

### `Checkout.tsx` Changes

Update the redirect and success messaging:

```tsx
// In handlePromoSuccess:
if (data?.success) {
  setPromoApplied(true);
  queryClient.invalidateQueries({ queryKey: ["profile"] });
  toast({
    title: "VIP Access Activated!",
    description: "Let's build your personalized course...",
  });
  setTimeout(() => navigate("/quiz"), 1500);  // Changed from /dashboard
}

// In promoApplied success state:
<h2 className="text-xl font-semibold mb-2">VIP Access Activated!</h2>
<p className="text-muted-foreground mb-6">Let's personalize your course...</p>
<Button onClick={() => navigate("/quiz")} className="w-full">
  Build My Course
  <ArrowRight className="ml-2 w-4 h-4" />
</Button>
```

## Edge Cases Handled

1. **User already has a course** - The quiz will update their existing course with the new goal (this is already handled in `useQuizChat.ts`)

2. **User refreshes during quiz** - Quiz data is saved to localStorage, so they can continue

3. **Regular paid users** - This change only affects promo code flow; Stripe checkout users continue through the normal `ThankYou` → `Welcome` flow

## Result

After this fix, promo code users will:
1. Sign up and enter their promo code
2. Get their tier upgraded immediately
3. Be redirected to the quiz to choose their goal
4. Complete the quiz and get a personalized course
5. See the Welcome flow with supplies check
6. Land on their dashboard with the course they actually chose
