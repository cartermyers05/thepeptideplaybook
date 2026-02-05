

# AI Chat Updates: System Prompt Rules + Legal Disclaimer Modal

## Summary

Three updates to the AI Chat system:
1. Add delivery method rule to system prompt
2. Add research-framing language rule to system prompt  
3. Create a first-time legal disclaimer modal for AI Chat & Protocol Builder (persisted to user profile)

---

## Change 1: Delivery Method Rule

**File:** `supabase/functions/chat/index.ts`

Add this rule to the RESPONSE STYLE section of the system prompt:

```text
DELIVERY METHOD GUIDANCE:
When a peptide has multiple delivery methods (topical, oral, subcutaneous, intranasal), ALWAYS present all available options and note which has the lowest barrier to entry. For example, GHK-Cu should always mention topical serums as an option alongside injectable. Default to recommending the least invasive option first.
```

---

## Change 2: Research-Framing Language Rule

**File:** `supabase/functions/chat/index.ts`

Update the APPROVED LANGUAGE section to enforce research-based framing:

```text
LANGUAGE FRAMING:
Never use direct instructional language like "Add 2mL" or "inject X." Always frame as:
- "Research protocols typically use..."
- "Published studies have examined doses of..."
- "A common reconstitution method described in literature involves..."
- "In clinical settings, researchers have administered..."
```

---

## Change 3: First-Time Legal Disclaimer Modal

### Database Migration

Add a new column to track AI-specific legal acknowledgment:

```sql
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS ai_disclaimer_accepted_at timestamptz;
```

This is separate from `terms_accepted_at` (general terms) to specifically track AI tool acknowledgment.

### New Component: `AIDisclaimerModal`

**File:** `src/components/chat/AIDisclaimerModal.tsx`

A reusable modal that:
- Shows on first visit to AI Chat OR Protocol Builder
- Contains the specified legal text with checkbox
- Saves `ai_disclaimer_accepted_at` to profile on acceptance
- Only shows once per user (persisted)

**Content:**
```text
Before you continue:

• This tool provides educational information based on published peptide research
• Nothing here constitutes medical advice, diagnosis, or treatment recommendations
• Always consult a licensed healthcare provider before making health decisions
• By continuing, you acknowledge you understand these terms

[ ] I understand
[Continue]
```

### Integration Points

| File | Change |
|------|--------|
| `src/components/dashboard/ChatInterface.tsx` | Import and render `AIDisclaimerModal`, check profile for `ai_disclaimer_accepted_at` |
| `src/pages/dashboard/Protocols.tsx` | Replace current inline disclaimer with `AIDisclaimerModal`, check profile before showing |
| `src/hooks/useProfile.ts` | Already handles profile data - no changes needed |

### Flow

```text
User opens AI Chat or Protocol Builder
         ↓
  Check profile.ai_disclaimer_accepted_at
         ↓
    ┌────┴────┐
    ↓         ↓
  Exists    Null
    ↓         ↓
  Show UI   Show Modal
              ↓
        User checks "I understand"
              ↓
        User clicks "Continue"
              ↓
        Save timestamp to profile
              ↓
        Show UI
```

---

## Files Modified Summary

| File | Changes |
|------|---------|
| `supabase/functions/chat/index.ts` | Add 2 new rules to system prompt |
| `src/components/chat/AIDisclaimerModal.tsx` | Create new modal component |
| `src/components/dashboard/ChatInterface.tsx` | Add disclaimer modal check |
| `src/pages/dashboard/Protocols.tsx` | Use shared disclaimer modal instead of inline |
| Database migration | Add `ai_disclaimer_accepted_at` column |

---

## Technical Notes

- The existing `ChatConsentModal` component has different content (more restrictive messaging). The new modal uses the exact text you specified.
- The existing Protocol Builder has an inline disclaimer that resets on each visit. This will be replaced with the persisted version.
- Both AI Chat and Protocol Builder will share the same disclaimer state - accept once, applies everywhere.

