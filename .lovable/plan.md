

# Replace Bland Hero Visual with Engaging Chat Preview

## Overview

The current right-side visual has abstract floating circles with just "AI-powered • Research-backed" text — it's too generic and doesn't communicate the product value. We'll replace it with a compelling chat preview mockup that immediately shows what users are getting.

---

## The Problem

Current visual:
- Abstract floating purple circles (meaningless)
- Small text card with "AI-powered • Research-backed" (bland)
- Doesn't show what the product actually is
- No personality or engagement

---

## The Solution: Interactive Chat Preview

Replace the abstract circles with a **mini chat mockup** that immediately demonstrates the AI assistant value proposition. This gives users a taste of what they're buying.

### Visual Design

```text
┌─────────────────────────────────────────┐
│  🤖 Peptide Assistant          Online   │
├─────────────────────────────────────────┤
│                                         │
│                     ┌─────────────────┐ │
│                     │ Is BPC-157      │ │
│                     │ legal to buy?   │ │
│                     └─────────────────┘ │
│                                         │
│  ┌────────────────────────────────────┐ │
│  │ It depends on your location and   │ │
│  │ intended use. In the US, BPC-157  │ │
│  │ is not FDA-approved and...        │ │
│  └────────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────┐      │
│  │ Ask anything about peptides...│ 🔍   │
│  └───────────────────────────────┘      │
└─────────────────────────────────────────┘
```

### Why This Works

1. **Immediate clarity** — Shows exactly what users get
2. **Real value demo** — Answers a common peptide question
3. **Premium look** — Uses the existing glass card styling
4. **Matches AIAssistant section** — Consistent design language
5. **More engaging** — Interactive-looking, not abstract

---

## Technical Implementation

### File: `src/components/landing/Hero.tsx`

**Replace lines 39-82** (the entire visual section) with:

1. **Chat container** using `glass-card-subtle` styling
2. **Header** with bot icon, "Peptide Assistant", and "Online" status
3. **Message bubbles**:
   - User question: "Is BPC-157 legal to buy?"
   - AI response: Brief, helpful preview of an answer
4. **Input field** (disabled, placeholder "Ask anything about peptides...")
5. **Subtle floating animation** on the entire card for polish

### Animation

- Gentle floating animation on the whole card (2-3px subtle movement)
- No bouncing circles — just the clean card

### Message Content Options

| User Question | AI Preview |
|---------------|------------|
| "Is BPC-157 legal to buy?" | "It depends on your location and intended use. In the US, BPC-157 is not FDA-approved and is sold only for research purposes..." |
| "What's the difference between BPC-157 and TB-500?" | "Both are peptides studied for tissue repair, but they work through different mechanisms..." |
| "Are peptides safe?" | "Safety depends on the specific peptide, source quality, and how it's used. Here's what the research shows..." |

**Recommendation:** Use the "Is BPC-157 legal?" question — it addresses a top concern and shows the AI gives nuanced, helpful answers.

---

## Styling Details

- Card: `glass-card-subtle` (already defined)
- User bubble: `bg-primary text-white rounded-2xl rounded-br-sm`
- AI bubble: `bg-muted rounded-2xl rounded-bl-sm`
- Header: Bot icon in `bg-primary/10` circle
- Input: `bg-muted/50 rounded-xl` with placeholder text

---

## Mobile Considerations

- Card shrinks gracefully on mobile
- Messages remain readable
- Maintains visual hierarchy

---

## File Changes Summary

| File | Action |
|------|--------|
| `src/components/landing/Hero.tsx` | UPDATE - Replace lines 39-82 with chat mockup component |

