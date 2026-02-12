

# Add UTM and Referrer Tracking

## What This Does
Every visitor's first landing page, traffic source (Google, Reddit, etc.), and UTM parameters get captured automatically. When they sign up or buy, that data is saved to their profile so you can see exactly which page and source brought each paying customer.

## How It Works

1. **Capture on first visit** -- A small script runs on every page load. If no tracking data exists in localStorage yet, it saves the current page path, UTM parameters from the URL, the referrer (e.g. google.com), and a timestamp.

2. **Write to profile on signup** -- When the user creates an account, the Signup page reads these values from localStorage and writes them to the profile record.

3. **Write to profile on payment verification** -- The verify-payment backend function also writes the tracking data (passed from the ThankYou page) as a fallback for users who buy without signing up first.

## Technical Details

### Step 1: Database Migration
Add 7 columns to the `profiles` table:

```sql
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS landing_page text,
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS utm_content text,
  ADD COLUMN IF NOT EXISTS referrer_url text,
  ADD COLUMN IF NOT EXISTS first_visit_at timestamptz;
```

### Step 2: Create tracking capture utility
**New file:** `src/lib/trackingCapture.ts`

- On first page load, check if `pp_tracking` exists in localStorage
- If not, capture `window.location.pathname`, all `utm_*` params from URL, `document.referrer`, and `new Date().toISOString()`
- Store as a JSON object in `localStorage.pp_tracking`
- Export a `getTrackingData()` helper that reads and parses it
- Export a `clearTrackingData()` helper to clean up after writing to DB

### Step 3: Run capture on app load
**File:** `src/main.tsx`

- Import and call `captureTracking()` before React renders so it fires on every page load (including guide pages where conversions start)

### Step 4: Write tracking data on signup
**File:** `src/pages/Signup.tsx`

- After successful `signUp()`, call `supabase.from("profiles").update(trackingData)` with the captured values
- Then call `clearTrackingData()`

### Step 5: Pass tracking data through payment verification
**File:** `src/pages/ThankYou.tsx`

- Include `getTrackingData()` in the body sent to `verify-payment`

**File:** `supabase/functions/verify-payment/index.ts`

- Read the tracking fields from the request body
- When updating the profile (alongside tier update), also write `landing_page`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `referrer_url`, `first_visit_at`
- Only write if the profile doesn't already have tracking data (don't overwrite)

### Step 6: Also write on `handle_new_user` trigger (belt-and-suspenders)
Update the existing `handle_new_user` database function to default `first_visit_at` to `now()` so every profile has a timestamp even if the frontend capture fails.

## Files Modified

| File | Change |
|------|--------|
| Database migration | Add 7 columns to `profiles` |
| `src/lib/trackingCapture.ts` | New -- capture and read UTM/referrer from localStorage |
| `src/main.tsx` | Call `captureTracking()` on app load |
| `src/pages/Signup.tsx` | Write tracking data to profile after signup |
| `src/pages/ThankYou.tsx` | Pass tracking data to verify-payment |
| `supabase/functions/verify-payment/index.ts` | Write tracking data to profile on payment |

