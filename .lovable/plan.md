
# Fix Buyer's Tier Mismatch (Immediate)

## The Problem
User `assistant2je@aol.com` paid $67 (confirmed in `purchases` table) but their `profiles.tier` is still `free`. They cannot access paid dashboard content.

## The Fix

### Step 1: Database Migration (one statement)
Run a SQL migration to set their tier to `member`:

```sql
UPDATE profiles SET tier = 'member' WHERE user_id = 'fba483f8-bdbb-457f-937d-a8c7a1aea3a8';
```

### Step 2: Investigate Root Cause
Check the `verify-payment` edge function logs to see why it failed to update the profile after their Stripe checkout completed. The function at `supabase/functions/verify-payment/index.ts` should have run `UPDATE profiles SET tier = 'member'` automatically. Possible causes:
- Race condition between auth session creation and profile update
- The user wasn't authenticated when the thank-you page called verify-payment
- The function errored silently

### Step 3: Add Defensive Check (Prevent Future Occurrences)
Update the `check-subscription` edge function to also verify the `purchases` table. If a purchase exists but `profiles.tier` is still `free`, auto-heal by updating the tier. This ensures no paying customer ever gets stuck on the free tier.

**File:** `supabase/functions/check-subscription/index.ts`

Add after the existing profile tier check:
- Query `purchases` table for the user
- If a purchase with `tier = 'member'` exists but profile shows `free`, update profile to `member`
- Log the auto-heal for monitoring

## Files Modified

| File | Change |
|------|--------|
| Database migration | `UPDATE profiles SET tier = 'member'` for this specific user |
| `supabase/functions/check-subscription/index.ts` | Add purchase-table fallback to auto-heal tier mismatches |
