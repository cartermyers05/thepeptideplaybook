

# Update CTA Button Copy

## Overview

Update all CTA buttons to better reflect the core value proposition: an AI-powered chatbot and ongoing news/updates to stay informed about peptides — not just a static "guide."

---

## Current vs. New Button Text

| Location | Current | New |
|----------|---------|-----|
| Hero.tsx | "Get the Guide — $67" | "Start Learning — $67" |
| FinalCTA pricing card | "Get Instant Access" | "Get Started" |
| FinalCTA bottom | "Get the Guide — $67" | "Start Learning — $67" |
| Navbar desktop | "Get Access" | "Get Started" |
| Navbar mobile | "Get Access — $67" | "Get Started" |

## Alternative CTA Options

Depending on which angle resonates best:

**Option A: Learning-focused**
- "Start Learning — $67"
- "Get Started"

**Option B: Stay informed**
- "Stay Informed — $67"
- "Get Access"

**Option C: AI assistant-focused**
- "Try the Assistant — $67"
- "Get Started"

**Option D: Simple action**
- "Join Now — $67"
- "Get Started"

---

## Files to Update

| File | Changes |
|------|---------|
| `src/components/landing/Hero.tsx` | Line 29: Update button text |
| `src/components/landing/FinalCTA.tsx` | Line 40: Update pricing card button; Line 64: Update bottom CTA |
| `src/components/landing/Navbar.tsx` | Line 58: Update desktop button; Line 95: Update mobile button |

---

## Supporting Copy Updates (Optional)

If we're shifting the messaging away from "guide" toward chatbot + news, we may also want to update:

1. **Hero subheadline** (line 21-23): Currently says "A research-backed guide..." — could become something like "Your AI-powered research companion for peptide education."

2. **FinalCTA included list**: Already mentions "AI assistant access" and "Lifetime updates" — could be reordered to emphasize these first.

3. **Pricing card title**: "Peptide Playbook" could stay, or become "Peptide Playbook Access"

---

## Recommendation

Go with **Option A** ("Start Learning") as it:
- Implies ongoing engagement, not a one-time download
- Feels action-oriented without being pushy
- Works well with the AI assistant + updates value prop
- Maintains premium, confident tone

