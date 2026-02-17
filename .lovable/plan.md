

# Make the AI Coach Update the Dashboard Automatically

## What This Does

Right now, the AI Coach can create and update protocols, but it can't log your daily activity. When you tell the coach "I took my CJC and Ipamorelin today, energy is great," it just responds conversationally -- nothing on the dashboard changes.

After this change, the coach becomes the central nervous system. Tell it what you did, how you feel, and it writes that data directly to your daily log. The dashboard updates instantly when you go back to it.

## Examples of What Works After This

- "I did all three compounds today" -- marks all compounds as completed
- "Just took my CJC and Ipa, skipping GHK-Cu today" -- checks off CJC and Ipamorelin, leaves GHK-Cu unchecked
- "Feeling really good energy today, maybe 8 out of 10" -- logs energy_rating = 8
- "Had some mild redness at injection site" -- logs injection_site_reaction
- "I weighed in at 182 this morning" -- logs weight
- "Stomach felt a little off after my shot" -- logs GI issues
- Any combination of the above in a single message

## Technical Changes

### 1. New Tool: `log_daily_update` (in peptide-coach edge function)

Add a third tool alongside `create_protocol` and `update_protocol`:

```
log_daily_update({
  compounds_taken: ["CJC-1295 (No DAC)", "Ipamorelin"],  // optional
  compounds_skipped: ["GHK-Cu"],                           // optional
  energy_rating: 8,                                        // optional, 1-10
  injection_site_reaction: "mild redness, resolved quickly",// optional
  gi_issues: "slight nausea",                              // optional
  other_symptoms: "headache",                              // optional
  notes: "felt great overall",                             // optional
  weight_lbs: 182,                                         // optional
})
```

The tool handler will:
- Get the user's active protocol to find the protocol_id
- Get the list of all compounds from the protocol
- Build an `actions_completed` map: compounds in `compounds_taken` = true, compounds in `compounds_skipped` = false, unmentioned compounds = keep existing value (or null)
- Upsert into `daily_logs` for today's date (merge with existing if a log already exists)
- Return a confirmation message the AI uses in its response

### 2. System prompt addition

Add instructions to the coach prompt telling it when to call `log_daily_update`:

- When user mentions taking/doing/completing a dose or compound
- When user reports how they feel (energy, mood, symptoms)
- When user mentions weight
- When user reports side effects or reactions
- Always confirm what was logged in the response
- Never ask "should I log that?" -- just do it when the intent is clear

### 3. Frontend: Invalidate dashboard queries after coach response

In `Coach.tsx`, after receiving a streamed response, add a new header check (`X-Daily-Log-Updated`) that triggers cache invalidation for daily log queries, so the dashboard shows the new data when the user navigates back.

### 4. Expose the new header

Update `corsHeaders` in the shared AI engine to expose `X-Daily-Log-Updated` alongside the existing protocol headers.

## Files Modified

| File | Change |
|------|--------|
| `supabase/functions/peptide-coach/index.ts` | Add `log_daily_update` tool definition, handler function, and system prompt instructions |
| `supabase/functions/_shared/ai-engine.ts` | Add `X-Daily-Log-Updated` to `Access-Control-Expose-Headers` |
| `src/pages/dashboard/Coach.tsx` | Detect `X-Daily-Log-Updated` header and invalidate daily log + progress queries |

## What Does NOT Change

- No database schema changes (uses existing `daily_logs` table as-is)
- No changes to the dashboard home page components
- No changes to how checkboxes work on the dashboard
- The existing manual check-in flow stays exactly the same
- Chat page and other AI endpoints unchanged

