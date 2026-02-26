

# Fix UTM Tracking & Attribution Pipeline

## Root Cause
The existing `captureTracking()` in `src/lib/trackingCapture.ts` uses **localStorage** which persists forever. Once captured (even without UTMs), it never re-captures. The signup handler then writes this data but the field mapping and timing appear correct -- the real issue is that most users' first visit has no UTM params (e.g., direct visit), and subsequent visits with UTMs are ignored because localStorage already has a record.

## Changes

### 1. Database Migration
Add missing columns to `profiles` and `purchases`:
- `profiles.utm_term` (text, nullable)
- `profiles.attribution_captured_at` (timestamptz, nullable)  
- `purchases.attribution` (jsonb, nullable) -- stores full attribution snapshot per sale

### 2. Create new tracking utility: `src/utils/trackingCapture.ts`
- Uses **sessionStorage** (key: `pp_attribution`) instead of localStorage
- Captures: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `referrer`, `landing_page`, `captured_at`
- Only captures once per session (if key already exists, skip)
- Exports `captureAttribution()` and `getAttribution()`

### 3. Update `src/App.tsx`
- Wrap the app component in a function component with `useEffect` that calls `captureAttribution()` on mount
- Remove the old `captureTracking()` call from `src/main.tsx`

### 4. Update `src/pages/Signup.tsx`
- Replace `getTrackingData` / `clearTrackingData` imports with new `getAttribution`
- After signup, write attribution to profiles including new `utm_term` and `attribution_captured_at` fields
- Map `referrer` -> `referrer_url` and `captured_at` -> `attribution_captured_at` for DB column names

### 5. Update `supabase/functions/verify-payment/index.ts`
- Accept `attribution` (new field name) in request body alongside existing `tracking`
- Write attribution data to the `purchases.attribution` jsonb column for per-sale tracking
- Continue writing to `profiles` as fallback (for users who lost session during payment)

### 6. Update checkout to pass attribution
- Find where `verify-payment` is called and pass `getAttribution()` data in the request body

### 7. Clean up
- Keep `src/lib/trackingCapture.ts` but remove its call from `main.tsx` (old file stays for backwards compat, no longer invoked)

## Files Changed
| File | Action |
|------|--------|
| Migration SQL | Add `utm_term`, `attribution_captured_at` to profiles; `attribution` jsonb to purchases |
| `src/utils/trackingCapture.ts` | **New** -- sessionStorage-based attribution capture |
| `src/main.tsx` | Remove `captureTracking()` call |
| `src/App.tsx` | Convert to function component with `useEffect` calling `captureAttribution()` |
| `src/pages/Signup.tsx` | Use new `getAttribution()`, write full attribution including `utm_term` |
| `supabase/functions/verify-payment/index.ts` | Write attribution to `purchases.attribution` column |
| Checkout caller (where verify-payment is invoked) | Pass attribution data |

