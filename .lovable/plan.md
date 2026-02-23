

# Add Peptide Dosing Calculator to AI Coach + Update Feature Copy

## Change 1: Add Dosing Calculator Instructions to AI System Prompts

The dosing calculator instructions need to be appended to **three** edge functions that handle AI conversations. All three share `CORE_IDENTITY` from `_shared/ai-engine.ts`, but each has its own additional prompt sections.

### Option A (Recommended): Add to `_shared/ai-engine.ts` CORE_IDENTITY

Append the dosing/reconstitution calculator block to the end of `CORE_IDENTITY` so it applies everywhere (chat, coach, peptide-coach). This is the cleanest approach since the shared engine already has a "RECONSTITUTION REFERENCE" section in the peptide database formatter -- but that section is just a static reference table. The new instructions tell the AI **how to interactively walk users through the math**.

**File:** `supabase/functions/_shared/ai-engine.ts`
- Append the full dosing calculator prompt block to the end of the `CORE_IDENTITY` string (after the APPROVED LANGUAGE section, before the closing backtick on line 74).

This automatically propagates to all three AI functions without touching them individually.

---

## Change 2: Update Feature Copy (4 locations)

### `src/pages/Checkout.tsx` (line 15)
Change:
```
"AI Research Coach — ask anything, get cited answers"
```
To:
```
"AI Research Coach — Ask any peptide question and get a cited answer in seconds. Includes a built-in dosing calculator: tell it your vial size and it does the reconstitution math for you."
```

### `src/pages/Sales.tsx` (line 51)
Change:
```
desc: "Ask anything about 41+ peptides. Get cited, evidence-rated answers.",
```
To:
```
desc: "Ask any peptide question and get a cited answer in seconds. Includes a built-in dosing calculator: tell it your vial size and it does the reconstitution math for you.",
```

### `src/components/landing/PricingCTA.tsx` (line 9)
Change:
```
"24/7 AI research coach",
```
To:
```
"24/7 AI research coach with dosing calculator",
```

### `src/pages/QuizResults.tsx` (line 108)
Change:
```
"24/7 AI coach for questions",
```
To:
```
"24/7 AI coach with built-in dosing calculator",
```

---

## Summary

| Area | Files Changed |
|------|--------------|
| AI system prompt | `supabase/functions/_shared/ai-engine.ts` (1 file, affects all 3 AI functions) |
| Feature copy | `Checkout.tsx`, `Sales.tsx`, `PricingCTA.tsx`, `QuizResults.tsx` (4 files) |
| Total files | 5 |

No layout, styling, UI, navigation, or routing changes. No new components.

