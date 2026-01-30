
# Fix: Promo Code Tier Update Failing

## Problem Identified

The promo code redemption is failing because of a database constraint mismatch:

```text
Error: "new row for relation 'profiles' violates check constraint 'profiles_tier_check'"
```

The `profiles` table has a CHECK constraint that only allows these tier values:
- `free`
- `starter` 
- `pro`
- `insider`

However, the `redeem-promo-code` edge function is trying to set `tier: "member"`, which violates this constraint.

## Root Cause

The redemptions ARE being recorded (we have 2 redemption records), but the profile tier update silently fails due to the constraint violation. The edge function returns success because the redemption was recorded, but the tier never changes.

## Solution

Update the `redeem-promo-code` edge function to use a valid tier value. Based on the existing tiers, we should use `"insider"` (the highest tier) for VIP promo code recipients.

## Implementation Steps

### 1. Update Edge Function

| File | Change |
|------|--------|
| `supabase/functions/redeem-promo-code/index.ts` | Change `tier: "member"` to `tier: "insider"` |

**Before:**
```typescript
.update({ 
  tier: "member",
  subscription_status: "active"
})
```

**After:**
```typescript
.update({ 
  tier: "insider",
  subscription_status: "active"
})
```

### 2. Fix Existing Users

Run a one-time database migration to upgrade the two users who already redeemed codes but didn't get their tier updated:

```sql
UPDATE profiles 
SET tier = 'insider', subscription_status = 'active'
WHERE user_id IN (
  SELECT user_id FROM promo_code_redemptions
) AND tier = 'free';
```

## Why This Works

The `useTier` hook already maps any non-free tier to `isPaid = true`:

```typescript
const currentTier: Tier = rawTier === "free" ? "free" : "member";
const isPaid = currentTier === "member";
```

So setting `tier: "insider"` will correctly show as a paid member in the UI.

## Technical Details

- The `insider` tier is the premium tier in the existing tier hierarchy
- No frontend changes are needed since `useTier` already handles the mapping
- We'll also fix the two affected users who have redemption records but `tier: "free"`
