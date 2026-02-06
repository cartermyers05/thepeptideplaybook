

# Make Protocols Truly Personal

## The Problem

Right now, when a user describes their goals in detail — "I want to look better, improve my skin, and maybe get a bit leaner" — the AI has to force-fit it into one of 6 rigid categories:

```
fat_loss | muscle_recovery | injury_recovery | anti_aging | cognitive | general_wellness
```

The user's specific context, nuances, and preferences **get lost**. The protocol ends up being generic instead of truly personalized.

---

## Solution: Capture the User's Full Context

Upgrade the `create_protocol` tool to accept much richer data:

### New Tool Parameters

| Field | Type | Purpose |
|-------|------|---------|
| `goal` | string (free text) | Primary goal in the user's own words |
| `secondary_goals` | string[] | Additional goals they mentioned |
| `user_context` | string | Specific details: age, experience, injuries, constraints |
| `experience_level` | enum | beginner, intermediate, advanced |
| `constraints` | string[] | Needle-phobic, budget-conscious, travel schedule, etc. |
| `protocol_name` | string | AI-generated descriptive name |
| `cycle_length_weeks` | number | Duration |
| `peptides` | array | Full peptide details (dosage, timing, purpose tied to their goal) |
| `notes` | string | AI's reasoning or personalized tips |

### Example Flow

**User says:** 
> "I'm 35, want to look better — my skin is starting to show age, losing some hair, and I'd love to drop 10 lbs. I've never used peptides before and I'm nervous about needles."

**AI captures:**
```json
{
  "goal": "aesthetics and body recomp",
  "secondary_goals": ["skin quality", "hair growth", "fat loss"],
  "user_context": "35 years old, first-time peptide user, noticing skin aging and hair thinning, wants to lose 10 lbs",
  "experience_level": "beginner",
  "constraints": ["needle-phobic", "wants non-injectable options first"],
  "protocol_name": "Aesthetics & Recomp Starter Protocol",
  "cycle_length_weeks": 8,
  "peptides": [
    {
      "name": "GHK-Cu",
      "purpose": "Skin rejuvenation and hair support",
      "dosage": "Topical serum, apply to face and scalp daily",
      "frequency": "Once daily",
      "timing": "Evening after cleansing",
      "site": "Topical application",
      "rationale": "Non-injectable option for skin and hair, good starting point for needle-averse users"
    },
    {
      "name": "Semaglutide",
      "purpose": "Weight loss support",
      "dosage": "Start at 0.25mg, titrate up",
      "frequency": "Once weekly",
      "timing": "Same day each week",
      "site": "Subcutaneous, abdomen",
      "rationale": "Most effective for the 10 lb weight loss goal, once-weekly injection minimizes needle exposure"
    }
  ],
  "notes": "Starting with topical GHK-Cu avoids needles while addressing skin and hair. The once-weekly semaglutide injection is the most impactful for weight loss and keeps needle frequency very low."
}
```

---

## Implementation Changes

### 1. Update Database Schema

Add columns to the `protocols` table to store the richer context:

```sql
ALTER TABLE protocols 
ADD COLUMN IF NOT EXISTS secondary_goals text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS user_context text,
ADD COLUMN IF NOT EXISTS experience_level text DEFAULT 'beginner',
ADD COLUMN IF NOT EXISTS constraints text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS notes text;
```

Also add a `rationale` field to each peptide in the JSONB array (no schema change needed, just include it in the data).

---

### 2. Update the `create_protocol` Tool Definition

**File: `supabase/functions/chat/index.ts`**

Expand the tool parameters:

```typescript
const tools = [
  {
    type: "function",
    function: {
      name: "create_protocol",
      description: "Create and save a highly personalized peptide protocol based on the user's specific goals, context, and constraints. Use this when the user asks you to build/create/make a protocol.",
      parameters: {
        type: "object",
        properties: {
          goal: {
            type: "string",
            description: "The user's primary goal in their own words (e.g., 'look better and lose weight', 'recover from ACL surgery', 'improve cognitive performance')"
          },
          secondary_goals: {
            type: "array",
            items: { type: "string" },
            description: "Additional goals the user mentioned (e.g., ['skin quality', 'hair growth', 'energy'])"
          },
          user_context: {
            type: "string",
            description: "Relevant context about the user: age, current situation, specific concerns, injury details, etc."
          },
          experience_level: {
            type: "string",
            enum: ["beginner", "intermediate", "advanced"],
            description: "User's experience with peptides"
          },
          constraints: {
            type: "array",
            items: { type: "string" },
            description: "User's constraints or preferences (e.g., 'needle-phobic', 'budget-conscious', 'traveling frequently')"
          },
          protocol_name: {
            type: "string",
            description: "A descriptive, personalized name for this protocol"
          },
          cycle_length_weeks: {
            type: "number",
            description: "Duration of the protocol in weeks"
          },
          peptides: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                purpose: { type: "string", description: "How this peptide addresses the user's specific goals" },
                dosage: { type: "string" },
                frequency: { type: "string" },
                timing: { type: "string" },
                site: { type: "string" },
                rationale: { type: "string", description: "Why this peptide was chosen for THIS user" }
              },
              required: ["name", "purpose", "dosage", "frequency", "timing", "rationale"]
            }
          },
          notes: {
            type: "string",
            description: "Personalized notes, tips, or reasoning for this specific user"
          }
        },
        required: ["goal", "protocol_name", "peptides", "cycle_length_weeks", "experience_level"]
      }
    }
  }
];
```

---

### 3. Update the System Prompt

**File: `supabase/functions/chat/index.ts`**

Revise the protocol creation instructions to emphasize personalization:

```
═══════════════════════════════════════════════════════════
PROTOCOL CREATION - MAKE IT TRULY PERSONAL
═══════════════════════════════════════════════════════════

When a user asks you to create a protocol, your job is to build something SPECIFIC TO THEM, not a generic template.

**GATHER CONTEXT FIRST:**
Before calling create_protocol, understand:
1. What EXACTLY do they want to achieve? (not just "fat loss" — do they want to lose 10 lbs? Look more defined? Fit into old clothes?)
2. What's their background? (age, any injuries, health considerations)
3. What's their experience level with peptides?
4. Any constraints? (needle-phobic, budget, travel schedule, time constraints)

**ASK FOLLOW-UP QUESTIONS** if critical info is missing. Don't assume.

**WHEN CREATING THE PROTOCOL:**
- Use their EXACT language for goals (not your categories)
- Choose peptides that address THEIR specific situation
- For each peptide, explain WHY you chose it for THEM (the rationale field)
- Consider their constraints — if they hate needles, prioritize topical/oral/nasal options
- The "notes" field should contain personalized tips specific to their situation

**EXAMPLE:**
User: "Help me look better, I'm 40, skin is getting wrinkly and I'm losing hair"

DON'T just slot them into "anti_aging" and give a generic protocol.

DO capture: goal="improve appearance - skin and hair", secondary_goals=["reduce wrinkles", "prevent hair loss"], user_context="40 years old, noticing aging signs", then choose peptides specifically for skin (GHK-Cu) and hair (potentially GHK-Cu or others), with rationale explaining why each was picked for their situation.
```

---

### 4. Update the Tool Handler

**File: `supabase/functions/chat/index.ts`**

Save the new fields to the database:

```typescript
const { data, error } = await supabaseServiceRole
  .from("protocols")
  .insert({
    user_id: userId,
    goal: args.goal,
    secondary_goals: args.secondary_goals || [],
    user_context: args.user_context || null,
    experience_level: args.experience_level || "beginner",
    constraints: args.constraints || [],
    protocol_name: args.protocol_name,
    peptides: args.peptides,
    cycle_length_weeks: args.cycle_length_weeks,
    notes: args.notes || null,
    status: "not_started",
    current_day: 0,
    current_week: 1,
  })
  .select()
  .single();
```

---

### 5. Update the Protocols Display

**File: `src/pages/dashboard/Protocols.tsx`**

Show the richer context in the protocol cards:

- Display `secondary_goals` as tags
- Show `notes` in the expanded detail view
- Display `rationale` for each peptide (why it was chosen)
- Show any `constraints` that were considered

---

## Summary of Changes

| File | Change |
|------|--------|
| Database migration | Add `secondary_goals`, `user_context`, `experience_level`, `constraints`, `notes` columns |
| `supabase/functions/chat/index.ts` | Expand tool definition, update system prompt, update handler |
| `src/pages/dashboard/Protocols.tsx` | Display new fields in UI |
| `src/hooks/useProtocol.ts` | Update types to include new fields |

---

## Result

When a user says "I want to get jacked and look better for summer" — their protocol will:

1. **Capture their exact goal** — not just "muscle_recovery" but "get jacked and look better for summer"
2. **Include their context** — age, experience, how much time they have
3. **Respect their constraints** — budget, needle comfort, schedule
4. **Explain every choice** — each peptide has a rationale specific to them
5. **Feel truly personalized** — not a cookie-cutter template

