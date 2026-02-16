

# Maximize Protocol Value: Rich Data at Creation Time

## The Problem

Right now when a protocol is created, the user gets:
- Compound names, doses, and schedules (good)
- Generic weekly expectations like "Building phase -- compounds reaching steady state" (low value)
- No risk assessment (field exists but is always null)
- No doctor conversation script (not stored at all)
- No mechanism of action explanations (not stored)
- No storage/handling instructions (empty strings)
- No side effect warnings per compound (empty strings)

The `user_protocols` table already has `risk_assessment`, `weekly_expectations`, and `ai_generation_context` columns. The `compounds` JSONB already supports `side_effects` and `storage` fields. They're just never populated with real data.

## The Fix: Make the AI Generate Rich Data

### Step 1: Expand the `create_protocol` tool definition

Add new parameters to the tool so the AI generates richer data at creation time:

| New Parameter | Type | What It Contains |
|---|---|---|
| `risk_assessment` | string | Personalized safety summary based on compounds + user health |
| `doctor_script` | object | Opening line, studies to reference, questions to ask |
| `weekly_expectations` | array | Week-by-week descriptions specific to the actual compounds |
| Per-peptide `side_effects` | string | Common side effects for that specific compound |
| Per-peptide `storage` | string | Storage and handling instructions |
| Per-peptide `mechanism` | string | Plain-English explanation of how the compound works |

### Step 2: Update the tool handler to save rich data

Instead of generating generic weekly expectations in code (the current `if w === 1... "Starting phase"` logic), pass through the AI-generated weekly expectations. Also save `risk_assessment` and `doctor_script` to the database.

This requires adding a `doctor_script` JSONB column to `user_protocols` to store the doctor conversation data.

### Step 3: Update the system prompt to mandate rich output

Add explicit instructions telling the AI that when calling `create_protocol`, it MUST populate:
- A personalized `risk_assessment` mentioning the user's specific health context
- `weekly_expectations` that reference the actual compounds and expected timelines (e.g., "Week 2: GHK-Cu begins stimulating collagen -- you may notice skin texture changes")
- `side_effects` and `storage` for every peptide
- A `doctor_script` with a word-for-word opening line and specific studies

### Step 4: Update the Protocol page UI to display the new data

- **Doctor Script section**: New collapsible section with copy-to-clipboard functionality
- **Compound cards**: Show mechanism, side effects, and storage info
- **Weekly timeline**: Display the AI-specific descriptions instead of generic phases
- **Risk assessment**: Already has a display section -- just needs real data

## Database Migration

Add one column to `user_protocols`:

```sql
ALTER TABLE user_protocols ADD COLUMN doctor_script jsonb DEFAULT null;
```

## Files Changed

| File | What Changes |
|---|---|
| `supabase/functions/chat/index.ts` | Expand tool parameters (risk_assessment, doctor_script, weekly_expectations, per-peptide side_effects/storage/mechanism); update handler to pass AI data through instead of generating generic text; update system prompt with rich output instructions |
| `supabase/functions/peptide-coach/index.ts` | Same tool parameter and handler updates (mirror chat changes) |
| `src/pages/dashboard/Protocol.tsx` | Add Doctor Script section with copy button; enhance CompoundCard to show mechanism, side effects, storage; use AI weekly expectations when available |
| `src/hooks/useUserProtocol.ts` | Add `doctor_script` to the TypeScript interface |
| Database migration | Add `doctor_script` column to `user_protocols` |

## What This Means for the User

Before: "Here's your protocol. BPC-157, 250mcg, daily."

After: "Here's your protocol. BPC-157 works by upregulating growth hormone receptors and accelerating angiogenesis in damaged tissue. Take 250mcg daily, morning on empty stomach. Common side effects: mild nausea, dizziness (typically resolves week 2). Store reconstituted vial at 36-46 degrees F, use within 28 days. Week 3: expect reduced inflammation markers and improved recovery time. When talking to your doctor, open with: 'I've been researching BPC-157 for tendon recovery -- a 2018 study in the Journal of Orthopaedic Research showed accelerated healing in animal models...'"

No new tables. No new edge functions. Just making the AI do the work it should have been doing from the start.
